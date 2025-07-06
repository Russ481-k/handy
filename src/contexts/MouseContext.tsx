"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Vector3, PerspectiveCamera } from "three";
import { MouseInteractionData } from "@/types/particle/index";
import { screenToWorld, calculateVelocity } from "@/lib/mouseUtils";

export type MouseContextType = {
  mouseData: MouseInteractionData;
  setMouseData: React.Dispatch<React.SetStateAction<MouseInteractionData>>;
  setCamera: (camera: PerspectiveCamera | null) => void;
  scrollY: number;
};

const MouseContext = createContext<MouseContextType>({
  mouseData: {
    position: new Vector3(0, 0, 0),
    velocity: new Vector3(0, 0, 0),
    isActive: false,
    influence: 5.0,
    swirlStrength: 3.0,
    swirl: true,
    momentum: 0.95,
  },
  setMouseData: () => {},
  setCamera: () => {},
  scrollY: 0,
});

export const useMouseContext = () => useContext(MouseContext);

export function MouseContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mouseData, setMouseData] = useState<MouseInteractionData>({
    position: new Vector3(0, 0, 0),
    velocity: new Vector3(0, 0, 0),
    isActive: false,
    influence: 5.0,
    swirlStrength: 3.0,
    swirl: true,
    momentum: 0.95,
  });
  const [scrollY, setScrollY] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const lastMousePosition = useRef<Vector3>(new Vector3(0, 0, 0));
  const lastUpdateTime = useRef<number>(performance.now());
  const isListeningRef = useRef(false);

  const setCamera = useCallback((camera: PerspectiveCamera | null) => {
    cameraRef.current = camera;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 마우스 이벤트 핸들러
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const element = containerRef.current;
    const camera = cameraRef.current;

    if (!element || !camera) {
      console.log("MouseContext: Missing required references");
      return;
    }

    const currentTime = performance.now();
    const deltaTime = (currentTime - lastUpdateTime.current) / 1000;
    lastUpdateTime.current = currentTime;

    // 화면 좌표를 Three.js 좌표로 변환
    const worldPositionResult = screenToWorld(
      event.clientX,
      event.clientY,
      camera,
      element,
      true // 디버그 정보 활성화
    );

    // worldPosition 추출
    const worldPosition =
      "position" in worldPositionResult
        ? worldPositionResult.position
        : worldPositionResult;

    // 디버그 정보 출력
    if ("debug" in worldPositionResult) {
      console.log("MouseContext: Debug Info:", worldPositionResult.debug);
    }

    // 속도 계산
    const velocity = calculateVelocity(
      worldPosition,
      lastMousePosition.current,
      deltaTime
    );

    lastMousePosition.current = worldPosition;

    console.log("MouseContext: Mouse move handler:", {
      position: worldPosition.toArray(),
      velocity: velocity.toArray(),
      deltaTime,
    });

    setMouseData((prev) => ({
      ...prev,
      position: worldPosition,
      velocity: velocity,
      isActive: true,
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    console.log("MouseContext: Mouse leave");
    setMouseData((prev) => ({
      ...prev,
      isActive: false,
      velocity: new Vector3(0, 0, 0),
    }));
  }, []);

  // 이벤트 리스너 설정
  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element || isListeningRef.current) return;

    console.log("MouseContext: Setting up event listeners on:", element);

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    isListeningRef.current = true;

    return () => {
      console.log("MouseContext: Cleaning up event listeners from:", element);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      isListeningRef.current = false;
    };
  }, [handleMouseMove, handleMouseLeave]);

  const value = useMemo(
    () => ({
      mouseData,
      setMouseData,
      setCamera,
      scrollY,
    }),
    [mouseData, setCamera, scrollY]
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <MouseContext.Provider value={value}>{children}</MouseContext.Provider>
    </div>
  );
}
