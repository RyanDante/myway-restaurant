"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { ImageSkeleton } from "@/components/ui/Skeleton";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  containerClassName?: string;
}

export function OptimizedImage({
  containerClassName = "",
  className = "",
  alt,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton shown while loading */}
      {!isLoaded && !hasError && (
        <ImageSkeleton className="absolute inset-0 z-10" />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center z-10">
          <span className="text-neutral-600 text-xs uppercase tracking-widest">
            Image unavailable
          </span>
        </div>
      )}

      {/* Actual image with fade-in */}
      <Image
        alt={alt}
        className={cn(
          "transition-opacity duration-700 ease-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...(!(props as any).priority && { loading: "lazy" })}
        {...props}
      />
    </div>
  );
}
