import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Outfit({ variable: "--font-display", subsets: ["latin"] });
const sans = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin"] });
const brand = Cormorant_Garamond({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "MentorME — From Confusion to Confidence",
  description: "A 90-level gamified career journey that turns learning into visible progress.",
  icons: { icon: "/mentor-me-logo.png" },
  openGraph: {
    title: "MentorME — From Confusion to Confidence",
    description: "90 levels. One visible path.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MentorME — From Confusion to Confidence",
    description: "90 levels. One visible path.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} ${brand.variable}`}>{children}</body>
    </html>
  );
}
