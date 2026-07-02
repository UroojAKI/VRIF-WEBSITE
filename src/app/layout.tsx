import type { Metadata } from "next";
import { Outfit, Rajdhani } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadataBase = new URL("https://vtuvrif.com");

export const metadata: Metadata = {
  title: {
    default: "VTU VRIF | Visvesvaraya Research & Innovation Foundation, Belagavi",
    template: "%s | VTU VRIF",
  },
  description:
    "Visvesvaraya Research & Innovation Foundation (VRIF) — the official Innovation & Entrepreneurship arm of VTU Belagavi. Empowering startups, research commercialization, and women innovators across 210+ Karnataka institutions.",
  keywords: [
    "VTU VRIF",
    "VRIF VTU",
    "Visvesvaraya Research Innovation Foundation",
    "VTU Belagavi innovation",
    "Karnataka startup incubation",
    "Technology Business Incubator Karnataka",
    "NAIN PMU VTU",
    "TBI Navodaya VTU",
    "She Innovates VTU",
    "VINYASA program VTU",
    "SAMSHODHANA VTU",
    "startup incubation Belagavi",
    "VTU entrepreneurship",
    "research commercialization Karnataka",
    "Dr. S. Vidyashankar VTU",
    "VTU affiliated college innovation",
    "Belagavi innovation hub",
    "Karnataka engineering startup ecosystem",
  ],
  authors: [{ name: "Visvesvaraya Research & Innovation Foundation (VRIF)" }],
  creator: "VRIF VTU",
  publisher: "Visvesvaraya Research & Innovation Foundation",
  category: "Education, Research, Innovation",
  openGraph: {
    title: "VTU VRIF | Visvesvaraya Research & Innovation Foundation, Belagavi",
    description:
      "Empowering innovators, researchers, entrepreneurs, and startups to build scalable solutions that create real-world impact across Karnataka's 210+ engineering institutions.",
    url: "https://vtuvrif.com",
    siteName: "VTU VRIF",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/vrif_og.webp",
        width: 1200,
        height: 630,
        alt: "VTU VRIF — Visvesvaraya Research & Innovation Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VTU VRIF | Visvesvaraya Research & Innovation Foundation",
    description:
      "The Innovation & Entrepreneurship Arm of VTU Belagavi, catalyzing startups, research commercialization, and the next generation of Karnataka innovators.",
    images: ["/images/vrif_og.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vtuvrif.com",
  },
  verification: {
    google: "vtuvrif-google-site-verify",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${rajdhani.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/vrif_logo.webp" type="image/webp" />
        <link rel="canonical" href="https://vtuvrif.com" />

        {/* Primary Structured Data — Organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["GovernmentOrganization", "EducationalOrganization"],
                  "@id": "https://vtuvrif.com/#organization",
                  name: "Visvesvaraya Research & Innovation Foundation (VRIF)",
                  alternateName: [
                    "VTU VRIF",
                    "VRIF VTU",
                    "VRIF Belagavi",
                    "VTU Innovation Foundation",
                  ],
                  url: "https://vtuvrif.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://vtuvrif.com/images/vrif_logo.webp",
                  },
                  image: "https://vtuvrif.com/images/vrif_og.webp",
                  description:
                    "The Innovation and Entrepreneurship arm of Visvesvaraya Technological University (VTU), Belagavi, catalyzing startup incubation, research commercialization, and women innovation across Karnataka.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Silver Jubilee Bhavan, VTU Campus, Jnana Sangama, Machhe",
                    addressLocality: "Belagavi",
                    addressRegion: "Karnataka",
                    postalCode: "590018",
                    addressCountry: "IN",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "15.392",
                    longitude: "74.987",
                  },
                  parentOrganization: {
                    "@type": "CollegeOrUniversity",
                    name: "Visvesvaraya Technological University (VTU)",
                    url: "https://vtu.ac.in",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+91-97394-44818",
                    contactType: "customer service",
                    email: "ops@vtuvrif.com",
                    areaServed: "IN",
                    availableLanguage: ["English", "Kannada"],
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/vtu-vrif/",
                    "https://www.instagram.com/vtu.vrif/",
                    "https://www.facebook.com/share/18RnGRPehh/",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://vtuvrif.com/#website",
                  url: "https://vtuvrif.com",
                  name: "VTU VRIF",
                  publisher: { "@id": "https://vtuvrif.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://vtuvrif.com/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://vtuvrif.com/#webpage",
                  url: "https://vtuvrif.com",
                  name: "VTU VRIF | Visvesvaraya Research & Innovation Foundation, Belagavi",
                  isPartOf: { "@id": "https://vtuvrif.com/#website" },
                  about: { "@id": "https://vtuvrif.com/#organization" },
                  description:
                    "Official website of Visvesvaraya Research & Innovation Foundation — startup incubation, innovation programs, and entrepreneurship development across Karnataka.",
                  breadcrumb: {
                    "@type": "BreadcrumbList",
                    itemListElement: [
                      {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://vtuvrif.com",
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col selection:bg-blue-900 selection:text-blue-200"
        style={{ background: "#020817", color: "#e2e8f0" }}
      >
        {children}
      </body>
    </html>
  );
}
