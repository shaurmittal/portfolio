import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const description =
  "Shaurya Mittal: Waterloo CS student building AI tools and software. Board the flight to see experience and projects.";

// Icons and the link-preview image come from files in app/ (icon.png, apple-icon.png,
// favicon.ico, opengraph-image.png, twitter-image.png); Next.js adds the tags for them.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.shauryamittal.net"),
  title: "Shaurya Mittal · SM Airways",
  description,
  openGraph: {
    title: "Shaurya Mittal · SM Airways",
    description,
    url: "/",
    siteName: "SM Airways",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaurya Mittal · SM Airways",
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: marks JS as available (so animation-only styles can't hide
            content without it) and skips the intro if the visitor already boarded this session */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var h=document.documentElement;h.classList.add('js');try{if(sessionStorage.getItem('boarded'))h.classList.add('boarded','skip-intro')}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
