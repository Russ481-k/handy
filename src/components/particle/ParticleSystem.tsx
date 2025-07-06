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
  CustomBlending,
  SrcAlphaFactor,
  OneFactor,
  AddEquation,
  Texture,
  OrthographicCamera,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
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
  const { setCamera, scrollY } = useMouseContext();
  const { theme } = useTheme();
  const scrollYRef = useRef(scrollY);

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
    }
    if (config !== prevPropsRef.current.config) {
      changes.push("config changed");
    }
    if (className !== prevPropsRef.current.className) {
      changes.push("className changed");
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
  const opacitiesRef = useRef<Float32Array>(new Float32Array(particles.length));
  const frameIdRef = useRef<number>(0);
  const isInitializedRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(performance.now());
  const mouseDataRef = useRef<MouseInteractionData>(mouseData);
  const initialCameraZ = useRef(config.cameraPosition?.z || 10);

  // 잔상 효과를 위한 오버레이
  const overlaySceneRef = useRef<Scene | null>(null);
  const overlayCameraRef = useRef<OrthographicCamera | null>(null);
  const overlayMaterialRef = useRef<MeshBasicMaterial | null>(null);

  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

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
  }, [mouseData]);

  // 애니메이션 함수
  const animate = useCallback(() => {
    try {
      if (
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current ||
        !overlaySceneRef.current ||
        !overlayCameraRef.current
      ) {
        console.warn("[ParticleSystem] Missing required references");
        return;
      }

      frameIdRef.current = requestAnimationFrame(animate);

      // 스크롤에 따른 카메라 Z 위치 업데이트 (원근 효과)
      const scrollEffectFactor = 0.01;
      cameraRef.current.position.z =
        initialCameraZ.current + scrollYRef.current * scrollEffectFactor;

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

      // 잔상 효과 렌더링
      rendererRef.current.render(
        overlaySceneRef.current,
        overlayCameraRef.current
      );
      // 메인 씬 렌더링
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

    if (overlaySceneRef.current) {
      overlaySceneRef.current.clear();
      overlaySceneRef.current = null;
    }
    if (overlayMaterialRef.current) {
      overlayMaterialRef.current.dispose();
      overlayMaterialRef.current = null;
    }

    cameraRef.current = null;
    overlayCameraRef.current = null;
    isInitializedRef.current = false;
  }, []);

  // 초기화 및 정리
  useEffect(() => {
    if (!containerRef.current || isInitializedRef.current) return;

    // Scene 설정
    const scene = new Scene();
    // scene.background는 이제 사용하지 않음
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
      preserveDrawingBuffer: true, // 잔상 효과를 위해 필요
    });
    renderer.autoClear = false; // 수동으로 화면을 제어
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 잔상 효과를 위한 오버레이 씬 설정
    const overlayScene = new Scene();
    const overlayCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const overlayMaterial = new MeshBasicMaterial({
      color: theme === "dark" ? 0x000000 : 0xffffff,
      transparent: true,
      opacity: theme === "dark" ? 0.4 : 0.1, // 다크모드에서 잔상 강도 조절
      depthTest: false,
      depthWrite: false,
    });
    const overlayQuad = new Mesh(new PlaneGeometry(2, 2), overlayMaterial);
    overlayScene.add(overlayQuad);
    overlaySceneRef.current = overlayScene;
    overlayCameraRef.current = overlayCamera;
    overlayMaterialRef.current = overlayMaterial;

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
      depthWrite: false,
    });

    if (theme === "dark") {
      material.blending = CustomBlending;
      material.blendEquation = AddEquation;
      material.blendSrc = SrcAlphaFactor;
      material.blendDst = OneFactor;
    } else {
      material.blending = NormalBlending;
    }

    material.onBeforeCompile = (shader) => {
      shader.vertexShader =
        "attribute float alpha;\nvarying float vAlpha;\n" + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "void main() {",
        "void main() {\nvAlpha = alpha;"
      );
      shader.fragmentShader = "varying float vAlpha;\n" + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
        "gl_FragColor = vec4( outgoingLight, diffuseColor.a * vAlpha );"
      );
    };

    // 파티클 데이터 설정
    const positions = positionsRef.current;
    const colors = colorsRef.current;
    const opacities = opacitiesRef.current;

    particles.forEach((particle, i) => {
      const i3 = i * 3;
      positions[i3] = particle.originalPosition.x;
      positions[i3 + 1] = particle.originalPosition.y;
      positions[i3 + 2] = particle.originalPosition.z;

      const color = new Color(particle.color);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      opacities[i] = particle.opacity || 1.0;
    });

    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    geometry.setAttribute("alpha", new BufferAttribute(opacities, 1));
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
    if (overlayMaterialRef.current) {
      overlayMaterialRef.current.color.set(
        theme === "dark" ? 0x000000 : 0xffffff
      );
      overlayMaterialRef.current.opacity = theme === "dark" ? 0.4 : 0.1;
    }
    if (materialRef.current) {
      if (theme === "dark") {
        materialRef.current.blending = CustomBlending;
        materialRef.current.blendEquation = AddEquation;
        materialRef.current.blendSrc = SrcAlphaFactor;
        materialRef.current.blendDst = OneFactor;
      } else {
        materialRef.current.blending = NormalBlending;
      }
      materialRef.current.needsUpdate = true;
    }

    if (sceneRef.current && rendererRef.current) {
      // 파티클 색상 업데이트
      const colors = colorsRef.current;
      const opacities = opacitiesRef.current;
      particles.forEach((particle, i) => {
        const i3 = i * 3;
        const color = new Color(particle.color);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        opacities[i] = particle.opacity || 1.0;
      });

      if (geometryRef.current) {
        const colorAttribute = geometryRef.current.getAttribute("color");
        if (colorAttribute) {
          colorAttribute.needsUpdate = true;
        }
        const alphaAttribute = geometryRef.current.getAttribute("alpha");
        if (alphaAttribute) {
          alphaAttribute.needsUpdate = true;
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
