"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "rectangular" | "circular";
}

export function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-800/60",
        variant === "circular" ? "rounded-full" : "rounded-sm",
        className,
      )}
    />
  );
}

export function ImageSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Skeleton className="absolute inset-0 w-full h-full" />
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

export function VideoSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Skeleton className="absolute inset-0 w-full h-full" />
      {/* Play icon placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-neutral-700/40 flex items-center justify-center">
          <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-neutral-500/50 ml-1" />
        </div>
      </div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}
