import Image from "next/image";

export function MentorMeLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <span className="brand-mark">
        <Image src="/mentor-me-logo.png" alt="MentorME" width={70} height={70} priority />
      </span>
      {!compact && <span className="brand-word">MENTOR<span>ME</span></span>}
    </span>
  );
}
