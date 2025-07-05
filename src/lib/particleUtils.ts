import { Vector3 } from "three";
import {
  ParticleData,
  TextParticleOptions,
  MouseInteractionData,
} from "@/types/particle/index";

/**
 * 텍스트를 파티클로 변환하는 함수
 */
export function textToParticles(options: TextParticleOptions): ParticleData[] {
  const {
    text,
    fontSize,
    fontFamily,
    colors,
    gradientStops,
    particleSize,
    particleDensity,
    depth = 0,
  } = options;

  // 캔버스 생성
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

  // 텍스트 크기 측정을 위한 임시 설정
  ctx.font = `${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);

  // 텍스트 높이 계산 (ascent + descent)
  const textHeight = Math.ceil(
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  );
  const textWidth = Math.ceil(metrics.width);

  // 캔버스 크기 설정 (여백 추가)
  const padding = fontSize * 0.1;
  canvas.width = Math.max(1, textWidth + padding * 2);
  canvas.height = Math.max(1, textHeight + padding * 2);

  // 캔버스 초기화 및 배경 설정
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 텍스트 렌더링 설정
  ctx.fillStyle = "#ffffff";
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  // 텍스트에 안티앨리어싱 적용
  ctx.globalAlpha = 1;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 텍스트 그리기 (정확한 중앙 정렬)
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  ctx.fillText(text, centerX, centerY);

  // 이미지 데이터 추출
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // 파티클 생성
  const particles: ParticleData[] = [];

  // 스케일 계산 - 화면 크기에 맞게 조정
  const aspectRatio = canvas.width / canvas.height;
  const baseScale = 42; // 기본 스케일 값 감소
  let scaleX: number;
  let scaleY: number;

  if (aspectRatio > 1) {
    // 가로가 더 긴 경우
    scaleX = baseScale;
    scaleY = scaleX / aspectRatio;
  } else {
    // 세로가 더 긴 경우
    scaleY = baseScale;
    scaleX = scaleY * aspectRatio;
  }

  // 텍스트 크기에 따른 스케일 조정
  const fontSizeScale = fontSize / 800; // 800px 기준으로 스케일 계산
  scaleX *= fontSizeScale;
  scaleY *= fontSizeScale;

  // 파티클 위치 계산을 위한 그리드 설정
  const gridStepX = Math.max(
    1,
    Math.floor(canvas.width / (100 * particleDensity))
  );
  const gridStepY = Math.max(
    1,
    Math.floor(canvas.height / (100 * particleDensity))
  );

  // 파티클 생성 전 유효한 위치 수집
  const validPositions: { x: number; y: number; alpha: number }[] = [];
  const threshold = 128;

  for (let y = 0; y < canvas.height; y += gridStepY) {
    for (let x = 0; x < canvas.width; x += gridStepX) {
      const i = (y * canvas.width + x) * 4;
      const alpha = pixels[i + 3];

      if (alpha > threshold) {
        validPositions.push({ x, y, alpha });
      }
    }
  }

  // 파티클 크기 분포 설정
  const sizeDistribution = {
    small: {
      size: particleSize * 0.4, // 더 작게
      ratio: 0.55,
      effectScale: 1.4,
      mass: 0.8,
    },
    medium: {
      size: particleSize * 1.6, // 더 크게
      ratio: 0.25,
      effectScale: 0.9,
      mass: 2.0,
    },
    large: {
      size: particleSize * 2.8, // 훨씬 더 크게
      ratio: 0.15,
      effectScale: 0.5,
      mass: 4.0,
    },
    fixed: {
      size: particleSize * 2.2,
      ratio: 0.05,
      effectScale: 0,
      mass: 5.0,
    },
  };

  // 목표 파티클 수 설정
  const targetParticleCount = Math.min(6000, validPositions.length);
  const step = Math.max(
    1,
    Math.floor(validPositions.length / targetParticleCount)
  );

  // 균일한 간격으로 파티클 생성
  for (let i = 0; i < validPositions.length; i += step) {
    const { x, y, alpha } = validPositions[i];

    // 정규화된 좌표 계산
    const normalizedX = ((x - canvas.width / 2) / canvas.width) * scaleX;
    const normalizedY = ((canvas.height / 2 - y) / canvas.height) * scaleY;
    const normalizedZ = (Math.random() - 0.5) * depth;

    // 그라디언트 색상 계산
    const progress = x / canvas.width;
    let color = colors?.[0] || "#ffffff";

    for (let i = 1; i < (colors?.length || 0); i++) {
      if (
        progress >= (gradientStops?.[i - 1] || 0) &&
        progress <= (gradientStops?.[i] || 0)
      ) {
        const t =
          (progress - (gradientStops?.[i - 1] || 0)) /
          ((gradientStops?.[i] || 0) - (gradientStops?.[i - 1] || 0));
        color = interpolateColors(
          colors?.[i - 1] || "#ffffff",
          colors?.[i] || "#ffffff",
          t
        );
        break;
      }
    }

    // 파티클 크기 결정
    const random = Math.random();
    let sizeCategory;
    let particleSizeInfo;

    if (random < sizeDistribution.small.ratio) {
      sizeCategory = "small";
      particleSizeInfo = sizeDistribution.small;
    } else if (
      random <
      sizeDistribution.small.ratio + sizeDistribution.medium.ratio
    ) {
      sizeCategory = "medium";
      particleSizeInfo = sizeDistribution.medium;
    } else if (
      random <
      sizeDistribution.small.ratio +
        sizeDistribution.medium.ratio +
        sizeDistribution.large.ratio
    ) {
      sizeCategory = "large";
      particleSizeInfo = sizeDistribution.large;
    } else {
      sizeCategory = "fixed";
      particleSizeInfo = sizeDistribution.fixed;
    }

    // 파티클 위치에 약간의 랜덤성 추가
    const jitter = (Math.random() - 0.5) * 0.1;
    const position = new Vector3(
      normalizedX + jitter,
      normalizedY + jitter,
      normalizedZ
    );

    // 알파값을 기반으로 파티클 크기 조정
    const sizeMultiplier = alpha / 255;
    const finalSize = particleSizeInfo.size * (0.8 + sizeMultiplier * 0.4);

    particles.push({
      originalPosition: position.clone(),
      currentPosition: position.clone(),
      color: color as unknown as number,
      id: `particle-${x}-${y}`,
      size: finalSize * (1 + particleSizeInfo.mass * 0.2), // 질량이 클수록 크기도 증가
      opacity: Math.min(1, sizeMultiplier * 1.2),
      mass: particleSizeInfo.mass,
      isActive: true,
      effectScale: particleSizeInfo.effectScale,
      shape: "pentagon",
      isFixed: sizeCategory === "fixed", // 고정 파티클 여부
      velocity: new Vector3(0, 0, 0),
    });
  }

  return particles;
}

/**
 * 그라데이션 색상을 계산하는 함수
 */
export function getGradientColor(
  t: number,
  colors: string[],
  stops: number[]
): string {
  t = Math.max(0, Math.min(1, t));

  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i] && t <= stops[i + 1]) {
      const localT = (t - stops[i]) / (stops[i + 1] - stops[i]);
      return interpolateColor(colors[i], colors[i + 1], localT);
    }
  }

  return colors[colors.length - 1];
}

/**
 * 두 색상 사이를 보간하는 함수
 */
export function interpolateColor(
  color1: string,
  color2: string,
  t: number
): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 헥스 색상을 RGB로 변환하는 함수
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * 우주 공간 부유 효과를 계산하는 함수
 */
export function calculateSpaceFloatingEffect(
  position: Vector3,
  time: number,
  strength: number = 0.001
): Vector3 {
  // 각 축별로 다른 주파수의 사인파를 사용하여 자연스러운 움직임 생성
  const xOffset =
    Math.sin(position.x * 0.5 + time * 0.0003) *
    Math.cos(position.y * 0.3 + time * 0.0004);
  const yOffset =
    Math.cos(position.x * 0.4 + time * 0.0004) *
    Math.sin(position.z * 0.3 + time * 0.0003);
  const zOffset =
    Math.sin(position.y * 0.4 + time * 0.0003) *
    Math.cos(position.z * 0.5 + time * 0.0004);

  return new Vector3(
    xOffset * strength,
    yOffset * strength,
    zOffset * strength * 0.2
  );
}

/**
 * 소용돌이 효과를 계산하는 함수
 */
export function calculateSwirlEffect(
  position: Vector3,
  mouseData: MouseInteractionData,
  time: number,
  effectScale: number = 1,
  mass: number = 1,
  isFixed: boolean = false
): Vector3 {
  // 고정 파티클은 우주 부유 효과만 적용
  if (isFixed) {
    return calculateSpaceFloatingEffect(position, time, 0.0005);
  }

  // 기본 우주 부유 효과 계산 (항상 적용)
  const baseFloatingEffect = calculateSpaceFloatingEffect(
    position,
    time,
    0.001 * effectScale
  );

  const distanceToMouse = position.distanceTo(mouseData.position);
  const maxInfluence = mouseData.influence * 0.8;

  // 질량에 따른 영향력 조정 (더 극적인 차이)
  const massEffect = Math.pow(1 / mass, 0.9); // 지수를 0.9로 증가하여 차이를 더 크게
  const adjustedEffectScale = effectScale * massEffect;

  // 마우스 영향 범위 밖일 때 우주 부유 효과만 적용
  if (distanceToMouse > maxInfluence) {
    return baseFloatingEffect;
  }

  // 중심 근처에서는 효과 강화
  const innerRadius = maxInfluence * 0.1;
  if (distanceToMouse < innerRadius) {
    const centralForce = mouseData.velocity
      .clone()
      .multiplyScalar(0.3 * adjustedEffectScale)
      .add(
        new Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.1
        ).multiplyScalar(adjustedEffectScale)
      );

    return centralForce.add(baseFloatingEffect);
  }

  // 벨 커브를 사용하여 거리에 따른 영향력 계산
  const normalizedDistance = distanceToMouse / maxInfluence;
  const bellCurve = Math.exp(-Math.pow(normalizedDistance * 2.5, 2));

  // 마우스 방향에 수직인 벡터 계산
  const directionToMouse = mouseData.position.clone().sub(position);
  const perpendicular = new Vector3(-directionToMouse.y, directionToMouse.x, 0);
  const swirlStrength =
    mouseData.swirlStrength * bellCurve * 2 * adjustedEffectScale;

  // 구심력과 마우스 속도의 영향 계산
  const centerForce = directionToMouse
    .normalize()
    .multiplyScalar(swirlStrength * 0.4 * adjustedEffectScale);
  const velocityForce = mouseData.velocity
    .clone()
    .multiplyScalar(0.4 * bellCurve * adjustedEffectScale);

  // 모든 힘 결합
  const force = perpendicular
    .normalize()
    .multiplyScalar(swirlStrength * adjustedEffectScale);
  force.add(centerForce);
  force.add(velocityForce);

  // 블랙홀 효과와 우주 부유 효과를 독립적으로 결합
  // bellCurve를 사용하여 블랙홀 중심에 가까울수록 부유 효과를 약하게 적용
  const floatingEffectStrength = 0.3 + 0.7 * (1 - bellCurve); // 최소 30%는 유지
  const scaledFloatingEffect = baseFloatingEffect.multiplyScalar(
    floatingEffectStrength
  );

  return force.add(scaledFloatingEffect);
}

/**
 * 파티클의 복귀 움직임을 계산하는 함수
 */
export function calculateReturnForce(
  particle: ParticleData,
  returnSpeed: number,
  time: number
): Vector3 {
  // 고정 파티클은 매우 빠르게 원위치로 복귀
  if (particle.isFixed) {
    const direction = particle.originalPosition
      .clone()
      .sub(particle.currentPosition);
    const returnForce = direction.multiplyScalar(returnSpeed * 2);
    // 고정 파티클도 미세한 우주 부유 효과 유지
    return returnForce.add(
      calculateSpaceFloatingEffect(particle.currentPosition, time, 0.0003)
    );
  }

  const direction = particle.originalPosition
    .clone()
    .sub(particle.currentPosition);
  const distance = direction.length();
  const effectScale = particle.effectScale || 1;

  // 기본 우주 부유 효과 계산 (항상 적용)
  const baseFloatingEffect = calculateSpaceFloatingEffect(
    particle.currentPosition,
    time,
    0.001 * effectScale
  );

  if (distance < 0.001) {
    return baseFloatingEffect;
  }

  // 거리에 따라 비선형적으로 증가하는 힘
  const forceMagnitude =
    Math.pow(distance, 1.5) * returnSpeed * 0.8 * effectScale;
  const returnForce = direction.normalize().multiplyScalar(forceMagnitude);

  // 복귀 힘과 우주 부유 효과를 독립적으로 결합
  // 거리가 멀수록 부유 효과를 강하게 적용
  const floatingEffectStrength = 0.3 + 0.7 * (distance / 2); // 거리에 따라 30%~100% 적용
  const scaledFloatingEffect = baseFloatingEffect.multiplyScalar(
    Math.min(1, floatingEffectStrength)
  );

  return returnForce.add(scaledFloatingEffect);
}

/**
 * 3D 노이즈 효과를 생성하는 함수
 */
export function generateNoise(
  x: number,
  y: number,
  z: number,
  time: number
): number {
  // 간단한 Perlin-like 노이즈 구현
  const t = time * 0.001;
  return (
    Math.sin(x * 10 + t) * Math.cos(y * 10 + t) * Math.sin(z * 10 + t) * 0.5
  );
}

/**
 * 카메라 회전각을 계산하는 함수
 */
export function calculateCameraRotation(
  mouseX: number,
  mouseY: number,
  maxRotation: number = 0.3
): { x: number; y: number; z: number } {
  const rotationX = (mouseY - 0.5) * maxRotation;
  const rotationY = (mouseX - 0.5) * maxRotation;
  const rotationZ = 0;

  return { x: rotationX, y: rotationY, z: rotationZ };
}

function interpolateColors(color1: string, color2: string, t: number): string {
  // RGB 색상값 추출
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  // 선형 보간
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  // RGB를 16진수로 변환
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/**
 * 비정형 파티클 텍스처를 생성하는 함수
 */
export function createParticleTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const size = 64;
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d")!;
  const centerX = size / 2;
  const centerY = size / 2;

  // 배경을 투명하게 설정
  context.clearRect(0, 0, size, size);

  // 3-5개의 랜덤한 원을 그려서 비정형 모양 생성
  const numCircles = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < numCircles; i++) {
    // 랜덤한 위치와 크기
    const offsetX = (Math.random() - 0.5) * size * 0.3;
    const offsetY = (Math.random() - 0.5) * size * 0.3;
    const radius = (Math.random() * 0.3 + 0.2) * size;

    // 랜덤한 투명도
    const alpha = Math.random() * 0.4 + 0.6;

    context.beginPath();
    context.arc(centerX + offsetX, centerY + offsetY, radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    context.fill();
  }

  return canvas;
}
