import Image from "next/image";

export function MentorMeLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark">
        <Image
          src="/mentor-me-logo-yellow.png"
          alt="MentorME logo"
          width={108}
          height={108}
          priority
          unoptimized
        />
      </span>
    </span>
  );
}
