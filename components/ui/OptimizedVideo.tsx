"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { VideoSkeleton } from "@/components/ui/Skeleton";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  containerClassName?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  poster?: string;
}

export function OptimizedVideo({
  src,
  className = "",
  containerClassName = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  poster,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy-load: only start loading video when it enters the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }, // Start loading 200px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Once loaded and in view, attempt autoplay
  useEffect(() => {
    if (isLoaded && autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked by browser — silently fail
      });
    }
  }, [isLoaded, autoPlay]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton shown while loading */}
      {!isLoaded && !hasError && (
        <VideoSkeleton className="absolute inset-0 z-10" />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center z-10">
          <span className="text-neutral-600 text-xs uppercase tracking-widest">
            Video unavailable
          </span>
        </div>
      )}

      {/* Actual video — only render source when in viewport */}
      {isInView && (
        <video
          ref={videoRef}
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          poster={poster}
          preload="metadata"
          className={cn(
            "transition-opacity duration-1000 ease-out",
            isLoaded ? "opacity-100" : "opacity-0",
            className,
          )}
          onCanPlayThrough={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
