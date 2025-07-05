import { Vector3, PerspectiveCamera } from "three";

interface DebugInfo {
  screenCoords: { x: number; y: number };
  normalizedCoords: { x: number; y: number };
  worldCoords: { x: number; y: number; z: number };
  elementRect: DOMRect;
  cameraInfo: {
    fov: number;
    aspect: number;
    position: { x: number; y: number; z: number };
  };
}

/**
 * 화면 좌표를 Three.js 좌표로 변환
 */
export function screenToWorld(
  clientX: number,
  clientY: number,
  camera: PerspectiveCamera,
  element: HTMLElement,
  debug: boolean = false
): Vector3 | { position: Vector3; debug: DebugInfo } {
  const rect = element.getBoundingClientRect();

  // 화면상의 요소 내 상대 좌표 계산
  const relativeX = clientX - rect.left;
  const relativeY = clientY - rect.top;

  // -1 ~ 1 범위로 정규화
  const normalizedX = (relativeX / rect.width) * 2 - 1;
  const normalizedY = -(relativeY / rect.height) * 2 + 1;

  // 카메라 기반 월드 좌표 변환
  const tanFov = Math.tan((camera.fov * Math.PI) / 360);
  const aspectRatio = element.clientWidth / element.clientHeight;
  const worldZ = 0;

  // Z 평면에서의 뷰 크기 계산
  const distanceToZ = camera.position.z - worldZ;
  const viewHeight = 2 * tanFov * distanceToZ;
  const viewWidth = viewHeight * aspectRatio;

  // 최종 월드 좌표 계산
  const worldX = (normalizedX * viewWidth) / 2;
  const worldY = (normalizedY * viewHeight) / 2;

  const position = new Vector3(worldX, worldY, worldZ);

  if (debug) {
    const debugInfo: DebugInfo = {
      screenCoords: { x: clientX, y: clientY },
      normalizedCoords: { x: normalizedX, y: normalizedY },
      worldCoords: { x: worldX, y: worldY, z: worldZ },
      elementRect: rect,
      cameraInfo: {
        fov: camera.fov,
        aspect: aspectRatio,
        position: {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        },
      },
    };
    return { position, debug: debugInfo };
  }

  return position;
}

/**
 * 마우스 속도 계산
 */
export function calculateVelocity(
  currentPos: Vector3,
  lastPos: Vector3,
  deltaTime: number
): Vector3 {
  return currentPos
    .clone()
    .sub(lastPos)
    .multiplyScalar(1 / Math.max(deltaTime, 0.016));
}

/**
 * 마우스 영향력 범위 계산
 */
export function calculateInfluenceRadius(
  camera: PerspectiveCamera,
  baseInfluence: number = 5.0
): number {
  const distanceToZ = camera.position.z;
  const tanFov = Math.tan((camera.fov * Math.PI) / 360);
  const viewHeight = 2 * tanFov * distanceToZ;
  return baseInfluence * (viewHeight / 20); // 뷰 크기에 비례하여 영향력 조정
}
