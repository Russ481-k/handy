"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/modules/custom-cursor.module.scss";
import { useCursor } from "@/contexts/CursorContext";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -300, y: -300 });
  const { cursorStyle } = useCursor();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <svg className={styles.svgFilters}>
        <defs>
          <filter id="custom-chromatic" color-interpolation-filters="sRGB">
            {/* Create a turbulence distortion map */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="2"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="15"
              result="distorted"
            />

            {/* Isolate and offset the R channel from the distorted image */}
            <feComponentTransfer in="distorted" result="R_channel">
              <feFuncG type="table" tableValues="0 0" />
              <feFuncB type="table" tableValues="0 0" />
            </feComponentTransfer>
            <feOffset in="R_channel" dx="4" dy="4" result="R_offset" />

            {/* Isolate and offset the B channel from the distorted image */}
            <feComponentTransfer in="distorted" result="B_channel">
              <feFuncR type="table" tableValues="0 0" />
              <feFuncG type="table" tableValues="0 0" />
            </feComponentTransfer>
            <feOffset in="B_channel" dx="-4" dy="-4" result="B_offset" />

            {/* Isolate the G channel from the distorted image (not offset) */}
            <feComponentTransfer in="distorted" result="G_channel">
              <feFuncR type="table" tableValues="0 0" />
              <feFuncB type="table" tableValues="0 0" />
            </feComponentTransfer>

            {/* Blend the channels back together */}
            <feBlend
              in="R_offset"
              in2="B_offset"
              mode="screen"
              result="RB_blend"
            />
            <feBlend in="RB_blend" in2="G_channel" mode="screen" />
          </filter>
        </defs>
      </svg>
      <div
        className={`${styles.cursor} ${styles[cursorStyle]}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
    </>
  );
}
