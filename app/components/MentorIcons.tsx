import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

type IconProps = {
  size?: number;
  className?: string;
};

export function SparkIcon({
  size = 15,
  className = "",
}: IconProps) {
  return (
    <Sparkles
      size={size}
      className={`mm-shared-icon mm-spark-icon ${className}`}
    />
  );
}

export function ArrowIcon({
  size = 15,
  className = "",
}: IconProps) {
  return (
    <ArrowRight
      size={size}
      className={`mm-shared-icon mm-arrow-icon ${className}`}
    />
  );
}