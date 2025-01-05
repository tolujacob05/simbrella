// components/SkeletonLoader.tsx
import React from "react";

interface SkeletonLoaderProps {
  count: number;
  itemHeight: string;
  itemWidth?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count,
  itemHeight,
  itemWidth = "100%",
}) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className={`rounded-xl`}
        style={{
          height: itemHeight,
          width: itemWidth,
          backgroundColor: "#E5E7EB", // Skeleton background color
        }}
      />
    ))}
  </div>
);

export default SkeletonLoader;
