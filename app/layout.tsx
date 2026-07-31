import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Outfit({ variable: "--font-display", subsets: ["latin"] });
const sans = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin"] });
const brandSerif = Cinzel({
  variable: "--font-brand-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var storageKey = "mentor-me-theme";
                  var savedTheme = localStorage.getItem(storageKey);
                  var legacyTheme = localStorage.getItem("mentor-theme");

                  if (savedTheme !== "light" && savedTheme !== "dark") {
                    savedTheme = legacyTheme === "dark" ? "dark" : "light";
                    localStorage.setItem(storageKey, savedTheme);
                  }

                  var root = document.documentElement;
                  root.classList.remove("light", "dark");
                  root.classList.add(savedTheme);
                  root.style.colorScheme = savedTheme;
                  root.setAttribute("data-theme", savedTheme);
                } catch (error) {
                  var root = document.documentElement;
                  root.classList.remove("dark");
                  root.classList.add("light");
                  root.style.colorScheme = "light";
                  root.setAttribute("data-theme", "light");
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable} ${brandSerif.variable} ${brand.variable}`}>
        {children}
      </body>
    </html>
  );
}
