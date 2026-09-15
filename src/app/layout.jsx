import '../index.css';
import Navbar from '../components/Navbar';
import Preloader from '../components/Preloader';

export const metadata = {
  title: 'TEDxIntegralUniversity – TESSELLATION',
  description: 'TEDxIntegralUniversity event page',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.body.classList.add('loading-preloader');" }} />
        <Preloader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
