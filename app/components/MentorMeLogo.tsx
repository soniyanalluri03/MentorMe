import Image from "next/image";

export function MentorMeLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`brand ${compact ? "brand-compact" : ""}`}
      role="img"
      aria-label="MentorME"
    >
      <span className="brand-mark">
        <Image
          className="brand-logo brand-logo--light"
          src="/logo_light.png"
          alt=""
          width={1054}
          height={504}
          sizes={compact ? "72px" : "(max-width: 700px) 112px, (max-width: 1200px) 132px, 154px"}
          priority
          unoptimized
        />
        <Image
          className="brand-logo brand-logo--dark"
          src="/logo_dark.png"
          alt=""
          width={934}
          height={410}
          sizes={compact ? "110px" : "(max-width: 700px) 120px, 184px"}
          priority
          unoptimized
        />
      </span>
    </span>
  );
}
