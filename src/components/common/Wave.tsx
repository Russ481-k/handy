import styles from "@/styles/modules/wave.module.scss";

export const Wave = () => {
  return (
    <div className={styles.waveContainer}>
      <svg
        className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -6 150 55"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={styles.waveGradientEdge} />
            <stop offset="40%" className={styles.waveGradientMiddle} />
            <stop offset="100%" className={styles.waveGradientEdge} />
          </linearGradient>

          <path
            id="gentle-wave"
            d="M-160 8c30 0, 58 -8, 88 -8s58 8, 88 8 58 -8, 88 -8 58 8, 88 8"
          />
        </defs>

        <g className={styles.parallax}>
          {Array.from({ length: 42 }).map((_, i) => (
            <g key={i}>
              <use href="#gentle-wave" x="48" y={i} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
