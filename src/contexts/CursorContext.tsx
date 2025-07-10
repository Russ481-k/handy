"use client";

import React, { createContext, useState, useContext, useMemo } from "react";

type CursorStyle = "default" | "renewal";

interface CursorContextType {
  cursorStyle: CursorStyle;
  setCursorStyle: (style: CursorStyle) => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>("default");

  const value = useMemo(() => ({ cursorStyle, setCursorStyle }), [cursorStyle]);

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
