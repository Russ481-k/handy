import { Vector3, Color } from "three";

export interface ParticleData {
  originalPosition: Vector3;
  currentPosition: Vector3;
  color?: number;
  size?: number;
  opacity?: number;
  id?: string;
  isFixed?: boolean;
  effectScale?: number;
  mass: number;
  velocity: Vector3;
  isActive: boolean;
  shape: string;
}

export interface MouseInteractionData {
  position: Vector3;
  velocity: Vector3;
  influence: number;
  swirl: boolean;
  swirlStrength: number;
  momentum: number;
  isActive: boolean;
}

export interface ParticleSystemConfig {
  maxParticles: number;
  interactionRadius: number;
  returnSpeed: number;
  swirFactorBaselMultiplier: number;
  dampingFactor: number;
  noiseStrength: number;
  gradientColors?: string[];
  cameraPosition?: {
    x: number;
    y: number;
    z: number;
  };
  cameraFov?: number;
  particleSize?: number;
  subParticleConfig?: {
    particleSize: number;
    particleDensity: number;
    colors: string[];
  };
}

export interface TextParticleOptions {
  text: string;
  fontFamily: string;
  fontSize: number;
  particleSize: number;
  particleDensity: number;
  colors?: string[];
  gradientStops?: number[];
  depth?: number;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface ParticleGroup {
  particles: ParticleData[];
  config: Partial<TextParticleOptions>;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface ParticleSystemResponse {
  particles: ParticleData[];
  bounds: {
    width: number;
    height: number;
  };
}

export * from "./particle";
