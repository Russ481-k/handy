"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
  Color,
  Vector3,
  Points,
  PointsMaterial,
  AdditiveBlending,
  NormalBlending,
  Texture,
} from "three";
import {
  ParticleData,
  MouseInteractionData,
  ParticleSystemConfig,
} from "@/types/particle/index";
import {
  calculateSwirlEffect,
  calculateReturnForce,
  createParticleTexture,
  calculateSpaceFloatingEffect,
} from "@/lib/particleUtils";
import { calculateInfluenceRadius } from "@/lib/mouseUtils";
import { useMouseContext } from "@/contexts/MouseContext";
import { useTheme } from "next-themes";

interface ParticleSystemProps {
  particles: ParticleData[];
  mouseData: MouseInteractionData;
  config: ParticleSystemConfig;
  className?: string;
}

const ParticleSystem = ({
  particles,
  mouseData,
  config,
  className = "",
}: ParticleSystemProps): React.ReactElement => {
  const { setCamera } = useMouseContext();
  const { theme } = useTheme();

  // 이전 props 값을 저장하기 위한 ref
  const prevPropsRef = useRef({
    particles,
    mouseData,
    config,
    className,
  });

  // 렌더링 원인 추적을 위한 useEffect
  useEffect(() => {
    const changes = [];
    if (particles !== prevPropsRef.current.particles) {
      changes.push("particles changed");
    }
    if (mouseData !== prevPropsRef.current.mouseData) {
      changes.push("mouseData changed");
      console.log("Previous mouseData:", prevPropsRef.current.mouseData);
      console.log("New mouseData:", mouseData);
    }
    if (config !== prevPropsRef.current.config) {
      changes.push("config changed");
    }
    if (className !== prevPropsRef.current.className) {
      changes.push("className changed");
    }

    if (changes.length > 0) {
      console.log("ParticleSystem 렌더링 발생 - 원인:", changes.join(", "));
    }

    // 현재 값을 이전 값으로 업데이트
    prevPropsRef.current = {
      particles,
      mouseData,
      config,
      className,
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const geometryRef = useRef<BufferGeometry | null>(null);
  const pointsRef = useRef<Points | null>(null);
  const materialRef = useRef<PointsMaterial | null>(null);
  const positionsRef = useRef<Float32Array>(
    new Float32Array(particles.length * 3)
  );
  const colorsRef = useRef<Float32Array>(
    new Float32Array(particles.length * 3)
  );
  const frameIdRef = useRef<number>(0);
  const isInitializedRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(performance.now());
  const mouseDataRef = useRef<MouseInteractionData>(mouseData);

  // mouseData를 ref로 업데이트
  useEffect(() => {
    if (!cameraRef.current) return;

    // 마우스 영향력 범위 동적 조정
    const influence = calculateInfluenceRadius(
      cameraRef.current,
      mouseData.influence
    );

    mouseDataRef.current = {
      ...mouseData,
      influence,
    };

    console.log("Mouse data received in ParticleSystem:", {
      position: mouseData.position.toArray(),
      velocity: mouseData.velocity.toArray(),
      isActive: mouseData.isActive,
      influence,
    });
  }, [mouseData]);

  // 애니메이션 함수
  const animate = useCallback(() => {
    try {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
        console.warn("[ParticleSystem] Missing required references");
        return;
      }

      frameIdRef.current = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const deltaTime = Math.min(
        (currentTime - lastTimeRef.current) / 1000,
        0.1
      );
      lastTimeRef.current = currentTime;

      const positions = positionsRef.current;
      const positionAttribute = geometryRef.current?.attributes.position;
      if (!positionAttribute) return;

      const currentMouseData = mouseDataRef.current;

      particles.forEach((particle, i) => {
        const i3 = i * 3;
        const currentPos = new Vector3(
          positions[i3],
          positions[i3 + 1],
          positions[i3 + 2]
        );

        const totalForce = new Vector3();

        // 마우스가 활성화된 경우에만 소용돌이 효과 적용
        if (currentMouseData.isActive) {
          const swirlForce = calculateSwirlEffect(
            currentPos,
            currentMouseData,
            currentTime
          ).multiplyScalar(1.0);

          totalForce.add(swirlForce);
        } else {
          // 마우스가 비활성화된 경우 우주 부유 효과만 적용
          totalForce.add(
            calculateSpaceFloatingEffect(currentPos, currentTime, 0.3)
          );
        }

        // 원래 위치로 돌아가는 힘 계산
        const returnForce = calculateReturnForce(
          {
            ...particle,
            currentPosition: currentPos,
          },
          config.returnSpeed,
          currentTime
        ).multiplyScalar(currentMouseData.isActive ? 0.5 : 1.0);

        totalForce.add(returnForce);

        // 속도 제한
        const maxSpeed = currentMouseData.isActive ? 4.0 : 2.0;
        if (totalForce.length() > maxSpeed) {
          totalForce.normalize().multiplyScalar(maxSpeed);
        }

        // 위치 업데이트
        positions[i3] += totalForce.x * deltaTime;
        positions[i3 + 1] += totalForce.y * deltaTime;
        positions[i3 + 2] += totalForce.z * deltaTime;

        // 파티클 데이터 업데이트
        particle.currentPosition.set(
          positions[i3],
          positions[i3 + 1],
          positions[i3 + 2]
        );
      });

      positionAttribute.needsUpdate = true;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    } catch (error) {
      console.error("[ParticleSystem] Animation error:", error);
      cancelAnimationFrame(frameIdRef.current);
    }
  }, [particles, config]);

  // cleanup 함수
  const cleanup = useCallback(() => {
    cancelAnimationFrame(frameIdRef.current);

    if (containerRef.current && rendererRef.current?.domElement) {
      containerRef.current.removeChild(rendererRef.current.domElement);
    }

    if (geometryRef.current) {
      geometryRef.current.dispose();
      geometryRef.current = null;
    }

    if (materialRef.current) {
      materialRef.current.dispose();
      materialRef.current = null;
    }

    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current.forceContextLoss();
      rendererRef.current = null;
    }

    if (pointsRef.current) {
      pointsRef.current.clear();
      pointsRef.current = null;
    }

    if (sceneRef.current) {
      sceneRef.current.clear();
      sceneRef.current = null;
    }

    cameraRef.current = null;
    isInitializedRef.current = false;
  }, []);

  // 초기화 및 정리
  useEffect(() => {
    if (!containerRef.current || isInitializedRef.current) return;

    // Scene 설정
    const scene = new Scene();
    scene.background = new Color(theme === "dark" ? "#000000" : "#ffffff");
    sceneRef.current = scene;

    // Camera 설정
    const camera = new PerspectiveCamera(
      config.cameraFov || 75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(
      config.cameraPosition?.x || 0,
      config.cameraPosition?.y || 0,
      config.cameraPosition?.z || 10
    );
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    setCamera(camera);

    // Renderer 설정
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(theme === "dark" ? "#000000" : "#ffffff");
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 파티클 텍스처 생성
    const particleTexture = new Texture(createParticleTexture());
    particleTexture.needsUpdate = true;

    // 파티클 시스템 초기화
    const geometry = new BufferGeometry();
    const material = new PointsMaterial({
      vertexColors: true,
      size: config.particleSize || 0.05,
      sizeAttenuation: true,
      map: particleTexture,
      transparent: true,
      blending: theme === "dark" ? AdditiveBlending : NormalBlending,
      depthWrite: false,
      opacity: theme === "dark" ? 1 : 0.8,
    });

    // 파티클 데이터 설정
    const positions = positionsRef.current;
    const colors = colorsRef.current;

    particles.forEach((particle, i) => {
      const i3 = i * 3;
      positions[i3] = particle.originalPosition.x;
      positions[i3 + 1] = particle.originalPosition.y;
      positions[i3 + 2] = particle.originalPosition.z;

      const color = new Color(particle.color);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    });

    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();

    const points = new Points(geometry, material);
    scene.add(points);

    geometryRef.current = geometry;
    pointsRef.current = points;
    materialRef.current = material;

    // 애니메이션 시작
    isInitializedRef.current = true;
    animate();

    // 리사이즈 핸들러
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      setCamera(null);
      cleanup();
    };
  }, [particles, config, animate, cleanup, setCamera, theme]);

  // 테마 변경 시 배경색 업데이트
  useEffect(() => {
    if (sceneRef.current && rendererRef.current && materialRef.current) {
      const bgColor = theme === "dark" ? "#000000" : "#ffffff";
      sceneRef.current.background = new Color(bgColor);
      rendererRef.current.setClearColor(bgColor);

      // 블렌딩 모드와 투명도 업데이트
      materialRef.current.blending =
        theme === "dark" ? AdditiveBlending : NormalBlending;
      materialRef.current.opacity = theme === "dark" ? 1 : 0.8;
      materialRef.current.needsUpdate = true;

      // 파티클 색상 업데이트
      const colors = colorsRef.current;
      particles.forEach((particle, i) => {
        const i3 = i * 3;
        const color = new Color(particle.color);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      });

      if (geometryRef.current) {
        const colorAttribute = geometryRef.current.getAttribute("color");
        if (colorAttribute) {
          colorAttribute.needsUpdate = true;
        }
      }
    }
  }, [theme, particles]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    />
  );
};

export default ParticleSystem;
