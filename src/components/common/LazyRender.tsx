"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface LazyRenderProps {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  className?: string;
  height?: string | number;
}

export const LazyRender: React.FC<LazyRenderProps> = ({
  children,
  placeholder = null,
  rootMargin = "200px",
  className,
  height,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (targetRef.current) {
              observer.unobserve(targetRef.current);
            }
          }
        });
      },
      { rootMargin }
    );

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin]);

  return (
    <div
      ref={targetRef}
      className={className}
      style={{ height: height || "auto" }}
    >
      {isVisible ? children : placeholder}
    </div>
  );
};
