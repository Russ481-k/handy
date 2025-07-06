"use client";

import dynamic from "next/dynamic";
import styles from "@/styles/modules/hero.module.scss";

const ParticleText = dynamic(() => import("../particle/ParticleText"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[100vh] bg-transparent flex items-center justify-center">
      <div className="animate-pulse text-4xl font-bold text-gray-300">
        Loading...
      </div>
    </div>
  ),
});

interface HeroProps {
  title: string;
  description: string;
}

export function Hero({ title, description }: HeroProps) {
  const particleConfig = {
    maxParticles: 15000,
    interactionRadius: 1.5,
    returnSpeed: 1.8,
    swirFactorBaselMultiplier: 0.8,
    dampingFactor: 0.92,
    noiseStrength: 0.03,
    gradientColors: ["#6366f1", "#8b5cf6", "#d946ef"],
    cameraPosition: { x: 0, y: 0, z: 15 },
    cameraFov: 45,
    particleSize: 0.12,
  };

  return (
    <section className={styles.hero}>
      <div className={styles.particleContainer}>
        <ParticleText
          text={title}
          config={particleConfig}
          className={styles.titleParticles}
          showBackgroundParticles={true}
        />
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
}
