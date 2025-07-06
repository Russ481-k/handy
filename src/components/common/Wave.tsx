import styles from "@/styles/modules/wave.module.scss";

export const Wave = () => {
  return (
    <div className={styles.waveContainer}>
      <svg
        className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={styles.waveGradientEdge} />
            <stop offset="50%" className={styles.waveGradientMiddle} />
            <stop offset="100%" className={styles.waveGradientEdge} />
          </linearGradient>

          <path
            id="gentle-wave"
            d="M-160 8c30 0, 58 -8, 88 -8s58 8, 88 8 58 -8, 88 -8 58 8, 88 8"
          />
        </defs>

        {/* 21개의 선 레이어 (y 위치 재조정) */}
        <g className={styles.parallax}>
          <use href="#gentle-wave" x="48" y="0" />
          <use href="#gentle-wave" x="48" y="1" />
          <use href="#gentle-wave" x="48" y="2" />
          <use href="#gentle-wave" x="48" y="3" />
          <use href="#gentle-wave" x="48" y="4" />
          <use href="#gentle-wave" x="48" y="5" />
          <use href="#gentle-wave" x="48" y="6" />
          <use href="#gentle-wave" x="48" y="7" />
          <use href="#gentle-wave" x="48" y="8" />
          <use href="#gentle-wave" x="48" y="9" />
          <use href="#gentle-wave" x="48" y="10" />
          <use href="#gentle-wave" x="48" y="11" />
          <use href="#gentle-wave" x="48" y="12" />
          <use href="#gentle-wave" x="48" y="13" />
          <use href="#gentle-wave" x="48" y="14" />
          <use href="#gentle-wave" x="48" y="15" />
          <use href="#gentle-wave" x="48" y="16" />
          <use href="#gentle-wave" x="48" y="17" />
          <use href="#gentle-wave" x="48" y="18" />
          <use href="#gentle-wave" x="48" y="19" />
          <use href="#gentle-wave" x="48" y="20" />
        </g>
      </svg>
    </div>
  );
};
