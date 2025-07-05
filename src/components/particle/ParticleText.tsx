"use client";

import {
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTheme } from "next-themes";

import { textToParticles } from "@/lib/particleUtils";
import ParticleSystem from "./ParticleSystem";
import { useMouseContext } from "@/contexts/MouseContext";
import {
  ParticleSystemConfig,
  ParticleData,
  TextParticleOptions,
} from "@/types/particle/index";

// ParticleGroup 인터페이스 정의
interface ParticleGroup {
  particles: ParticleData[];
  config: Partial<TextParticleOptions>;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

interface ParticleTextProps {
  text: string;
  subText?: string;
  className?: string;
  config?: Partial<ParticleSystemConfig>;
}

export default function ParticleText({
  text,
  subText,
  className = "",
  config: userConfig,
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particleGroups, setParticleGroups] = useState<ParticleGroup[]>([]);
  const prevTextRef = useRef<string>(text);
  const { mouseData } = useMouseContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const initializationTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const { theme } = useTheme();

  // 테마별 색상 설정
  const themeColors = useMemo(() => {
    return theme === "dark"
      ? ["#a84578", "#6e4b8f", "#8b4b82"] // 다크 모드 색상
      : ["#2563eb", "#0ea5e9", "#0d9488"]; // 라이트 모드 색상
  }, [theme]);

  // 모든 파티클을 하나의 배열로 합침
  const allParticles = useMemo(
    () => particleGroups.flatMap((group) => group.particles),
    [particleGroups]
  );

  // 설정 병합
  const config: ParticleSystemConfig = useMemo(
    () => ({
      maxParticles: 12000,
      interactionRadius: 2.0,
      returnSpeed: 1.5,
      swirFactorBaselMultiplier: 2.0,
      dampingFactor: 0.92,
      noiseStrength: 0.02,
      gradientColors: themeColors,
      cameraPosition: { x: 0, y: 0, z: 15 },
      cameraFov: 75,
      particleSize: 0.2,
      ...userConfig,
    }),
    [userConfig, themeColors]
  );

  // 텍스트 크기 측정 함수
  const measureText = useCallback(
    (
      text: string,
      fontSize: number,
      fontFamily: string
    ): { width: number; height: number } => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return { width: 0, height: 0 };

      context.font = `${fontSize}px ${fontFamily}`;
      const metrics = context.measureText(text);

      return {
        width: metrics.width,
        height: fontSize,
      };
    },
    []
  );

  // 적절한 폰트 크기 계산 함수
  const calculateFontSize = useCallback(
    (
      text: string,
      fontFamily: string,
      containerWidth: number,
      targetWidthRatio: number = 0.8 // 컨테이너 너비의 80%를 목표로
    ): number => {
      let fontSize = 100; // 시작 크기
      const targetWidth = containerWidth * targetWidthRatio;

      // 이진 탐색으로 적절한 폰트 크기 찾기
      let min = 1;
      let max = 1000;

      while (min <= max) {
        fontSize = Math.floor((min + max) / 2);
        const { width } = measureText(text, fontSize, fontFamily);

        if (Math.abs(width - targetWidth) < 1) {
          break;
        } else if (width > targetWidth) {
          max = fontSize - 1;
        } else {
          min = fontSize + 1;
        }
      }

      return fontSize;
    },
    [measureText]
  );

  // 파티클 생성 함수
  const generateParticles = useCallback(
    async (textContent: string, options: Partial<TextParticleOptions>) => {
      if (!textContent) return [];

      const containerWidth =
        containerRef.current?.clientWidth || window.innerWidth;
      const fontFamily = "Pretendard, sans-serif";

      // 메인 텍스트와 서브 텍스트의 목표 너비 비율을 다르게 설정
      const widthRatio = options.fontSize === 800 ? 0.8 : 0.6; // 메인 텍스트는 80%, 서브 텍스트는 60%
      const calculatedFontSize = calculateFontSize(
        textContent,
        fontFamily,
        containerWidth,
        widthRatio
      );

      const defaultOptions: TextParticleOptions = {
        text: textContent,
        fontFamily,
        fontSize: calculatedFontSize,
        particleSize: (calculatedFontSize / 800) * 0.015, // 원래 폰트 크기 대비 비율 유지
        particleDensity: 35,
        colors: config.gradientColors,
        gradientStops: [0, 0.5, 1],
        depth: 0.5,
        position: { x: 0, y: 0, z: 0 },
      };

      // 서브텍스트 설정 적용
      if (options.fontSize !== 800 && config.subParticleConfig) {
        defaultOptions.particleSize = config.subParticleConfig.particleSize;
        defaultOptions.particleDensity =
          config.subParticleConfig.particleDensity;
        defaultOptions.colors = config.subParticleConfig.colors;
      }

      const mergedOptions = {
        ...defaultOptions,
        ...options,
        fontSize: calculatedFontSize,
      };

      try {
        await document.fonts.load(
          `${mergedOptions.fontSize}px ${mergedOptions.fontFamily}`
        );
        return await textToParticles(mergedOptions);
      } catch (error) {
        console.error("[ParticleText] Failed to generate particles:", error);
        return [];
      }
    },
    [config.gradientColors, calculateFontSize]
  );

  // 파티클 초기화
  useEffect(() => {
    if (text === prevTextRef.current && particleGroups.length > 0 && !theme)
      return;

    setIsLoading(true);

    const initParticles = async () => {
      try {
        if (initializationTimeout.current) {
          clearTimeout(initializationTimeout.current);
        }

        const groups: ParticleGroup[] = [];

        // 메인 텍스트 파티클
        const mainParticles = await generateParticles(text, {
          fontSize: 800,
          particleDensity: 35,
          position: { x: 0, y: 0.6, z: 0 },
          colors: themeColors,
        });
        groups.push({
          particles: mainParticles,
          config: { position: { x: 0, y: 0.6, z: 0 } },
        });

        // 서브 텍스트 파티클
        if (subText) {
          const subParticles = await generateParticles(subText, {
            fontSize: 600,
            particleDensity: 30,
            position: { x: 0, y: -0.6, z: 0 },
            colors: themeColors.map((color) => color + "99"), // 투명도 추가
          });
          groups.push({
            particles: subParticles,
            config: { position: { x: 0, y: -0.6, z: 0 } },
          });
        }

        // 전체 파티클 수 제한
        const totalParticles = groups.reduce(
          (sum, group) => sum + group.particles.length,
          0
        );
        if (totalParticles > config.maxParticles) {
          const scale = config.maxParticles / totalParticles;
          groups.forEach((group) => {
            group.particles = group.particles.slice(
              0,
              Math.floor(group.particles.length * scale)
            );
          });
        }

        setParticleGroups(groups);
        prevTextRef.current = text;
        setIsLoading(false);
      } catch (error) {
        console.error("[ParticleText] Initialization error:", error);
        setIsLoading(false);
      }
    };

    initParticles();
  }, [
    text,
    subText,
    generateParticles,
    config.maxParticles,
    theme, // 테마 변경 시에도 파티클 재생성
  ]);

  // 리사이즈 핸들러 추가
  useEffect(() => {
    const handleResize = () => {
      if (text === prevTextRef.current) {
        prevTextRef.current = ""; // 강제로 파티클 재생성 트리거
      }
    };

    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [text]);

  // 디바운스 유틸리티 함수
  function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  if (isLoading || particleGroups.length === 0) {
    return <div className={className}>Loading...</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        width: "100%",
        height: "100vh",
        minWidth: "1px",
        position: "relative",
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-lg font-medium">Loading...</div>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <ParticleSystem
          particles={allParticles}
          mouseData={mouseData}
          config={config}
        />
      </Suspense>
    </div>
  );
}
