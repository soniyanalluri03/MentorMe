import Image from "next/image";

export function MentorMeLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark">
        <Image
          src="/mentor-me-logo.png"
          alt="MentorME"
          width={96}
          height={96}
          priority
          unoptimized
        />
      </span>
      {!compact && <span className="brand-word">MENTOR<span>ME</span></span>}
    </span>
  );
}
