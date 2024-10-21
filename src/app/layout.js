"use client";
import localFont from "next/font/local";
import "./globals.css";
import { disable_navbar, disable_subbar } from "@/Constants";
import Navbar from "../Components/Navbar";
import { usePathname } from "next/navigation";
import Subbar from "../Components/Subbar";
import { Provider } from "react-redux";
import { Store } from "@/Services/Store";
import { ToastProvider } from "@/Hooks/Toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const path = usePathname(); // Extract pathname directly

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <style>
          {`
            @import url("https://rsms.me/inter/inter.css");
            :root {
              --tblr-font-sans-serif: "Inter Var", -apple-system, BlinkMacSystemFont,
                San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif;
            }
            body {
              font-feature-settings: "cv03", "cv04", "cv11";
            }
            .navbar-vertical.navbar-expand-lg {
              scrollbar-width: none !important;
            }
            .scrollbar-hide {
              display: flex;
              flex-direction: column;
            }
          `}
        </style>
        <script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={Store}>
          <HelmetProvider>
            <ToastProvider>
              {/* Conditional rendering of Navbar and Subbar */}
              {!disable_navbar.includes(path) && <Navbar />}
              <Subbar />
              {children}
     
            </ToastProvider>
          </HelmetProvider>
        </Provider>
      </body>
    </html>
  );
}
