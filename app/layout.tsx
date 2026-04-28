import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heroSerif = Instrument_Serif({
  variable: "--font-hero-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "NEETCODE | Tech interview prep",
  description:
    "Tech interview roadmaps trusted by engineers at Google, Meta, OpenAI, and other top tech companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark scroll-smooth bg-black ${geistSans.variable} ${geistMono.variable} ${heroSerif.variable} ${GeistPixelSquare.variable}`}
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        suppressHydrationWarning
        className="font-sans text-textmain antialiased overflow-x-hidden selection:bg-white selection:text-black"
      >
        <Script id="promotekit-referral" strategy="beforeInteractive">
          {`
try{if(window.parent&&window.parent!==window){window.parent.promotekit_referral="1fd2949a-d22c-431b-92bf-02d4ad04ee24";window.parent.document.cookie="promotekit_referral=1fd2949a-d22c-431b-92bf-02d4ad04ee24;path=/;domain=.aura.build;max-age=31536000"}}catch(e){}
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2M6V79H761"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2M6V79H761');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
