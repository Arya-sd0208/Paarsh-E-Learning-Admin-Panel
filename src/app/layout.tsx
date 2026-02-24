import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import "react-phone-input-2/lib/style.css";
import Providers from './providers';
import RouteWrapper from './RouteWrapper';

export const metadata: Metadata = {

  metadataBase: new URL("https://paarshelearning.com"),

  title: {
    default: "Paarsh E-Learning | Placement-Oriented Courses",
    template: "%s | Paarsh E-Learning",
  },

  description:
    "Paarsh E-Learning offers placement-focused IT courses with one-to-one mentorship, real-world projects, and structured interview preparation in Pune.",

  keywords: [
    "Paarsh E-Learning",
    "IT Training Institute Pune",
    "Data Science Course",
    "Full Stack Development",
    "AI & Machine Learning",
    "Placement Oriented Courses",
    "Software Training Pune",
  ],

  alternates: {
    canonical: "https://paarshelearning.com/",
  },

  robots: {
    index: true,
    follow: true,
  },


  openGraph: {
    title: "Paarsh E-Learning | Career-Focused IT Courses",
    description:
      "Join Paarsh E-Learning for industry-ready programs with 1:1 mentorship and placement support.",
    url: "https://paarshelearning.com/",
    siteName: "Paarsh E-Learning",
    locale: "en_IN",
    images: [
      {
        url: "/parshlearning.png",
        width: 1200,
        height: 320,
        alt: "Paarsh E-Learning",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Paarsh E-Learning | Placement-Oriented Courses",
    description:
      "Career-focused IT programs with mentorship and real-world projects.",
    images: ["/parshlearning.png"],
  },

  icons: {
    icon: "/app/favicon.ico",
    apple: "/logo-wide.webp",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn('min-h-screen bg-background font-body antialiased')}
        suppressHydrationWarning
      >
        {/* <div className="relative flex min-h-dvh flex-col bg-background"> */}
        <Providers>
          <RouteWrapper>{children}</RouteWrapper>
          <Toaster />
        </Providers>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Paarsh E-Learning",
              url: "https://paarshelearning.com",
              logo: "https://paarshelearning.com/parshlearning.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}




// import type { Metadata } from 'next';
// import './globals.css';
// import { cn } from '@/lib/utils';
// import { Toaster } from '@/components/ui/toaster';
// import { Header } from '@/components/common/Header';
// import { Footer } from '@/components/common/Footer';
// import "react-phone-input-2/lib/style.css";
// import Providers from './providers';
// import RouteWrapper from './RouteWrapper';

// export const metadata: Metadata = {
//   title: {
//     default: "Paarsh E-Learning | Placement-Oriented Courses",
//     template: "%s | Paarsh E-Learning",
//   },
//   description:
//     "Placement-oriented e-learning platform offering industry-ready courses, mentorship, and real-world projects.",
//   metadataBase: new URL("https://paarshelearning.com/"),
//   openGraph: {
//     title: "Paarsh E-Learning | Placement-Oriented Courses",
//     description:
//       "Placement-oriented e-learning platform offering industry-ready courses, mentorship, and real-world projects.",
//     url: "https://paarshelearning.com/",
//     siteName: "Paarsh E-Learning",
//     images: [
//       {
//         url: "/logo-wide.webp",
//         width: 1200,
//         height: 630,
//         alt: "Paarsh E-Learning",
//       },
//     ],
//     type: "website",
//   },
//   icons: {
//     icon: "/app/favicon.ico",
//     apple: "/logo-wide.webp",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap"
//           rel="stylesheet"
//         />
//       </head>

//     <body className={cn('min-h-screen bg-background font-body antialiased')}>
//   <Providers>
//     <RouteWrapper>{children}</RouteWrapper>
//     <Toaster />
//   </Providers>
// </body>

//     </html>
//   );
// }



// import type { Metadata } from 'next';
// import './globals.css';
// import { cn } from '@/lib/utils';
// import { Toaster } from '@/components/ui/toaster';
// import { Header } from '@/components/common/Header';
// import { Footer } from '@/components/common/Footer';
// import "react-phone-input-2/lib/style.css";

// export const metadata: Metadata = {
//   title: {
//     default: "Paarsh E-Learning | Placement-Oriented Courses",
//     template: "%s | Paarsh E-Learning",
//   },
//   description:
//     "Placement-oriented e-learning platform offering industry-ready courses, mentorship, and real-world projects.",

//   metadataBase: new URL("https://paarshelearning.com/"),

//   openGraph: {
//     title: "Paarsh E-Learning | Placement-Oriented Courses",
//     description:
//       "Placement-oriented e-learning platform offering industry-ready courses, mentorship, and real-world projects.",
//     url: "https://paarshelearning.com/",
//     siteName: "Paarsh E-Learning",
//     images: [
//       {
//         url: "/logo-wide.webp",
//         width: 1200,
//         height: 630,
//         alt: "Paarsh E-Learning",
//       },
//     ],
//     type: "website",
//   },

//   icons: {
//     icon: "/app/favicon.ico",
//     apple: "/logo-wide.webp",
//   },
// };


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body
//         className={cn('min-h-screen bg-background font-body antialiased')}
//       >
//         <div className="relative flex min-h-dvh flex-col bg-background">
//           <Header />
//           <main className="flex-1">{children}</main>
//           <Footer />
//         </div>
//         <Toaster />
//       </body>
//     </html>
//   );
// }
