import { Vector3 } from "three";

export type ParticleShape = "circle" | "pentagon";

export interface ParticleData {
  originalPosition: Vector3;
  currentPosition: Vector3;
  velocity: Vector3;
  color: string;
  id: string;
  size: number;
  opacity: number;
  mass: number;
  isActive: boolean;
  effectScale: number; // 파티클 크기에 따른 효과 스케일 (1이 기본값)
  shape: ParticleShape; // 파티클 모양
  isFixed: boolean; // 블랙홀 효과의 영향을 받지 않는 고정 파티클 여부
}
