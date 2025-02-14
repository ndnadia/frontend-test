"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/header/Header";
import { redirect, usePathname } from "next/navigation";
import Nav from "../components/nav/Nav";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect, useMemo } from "react";
import { COOKIE_KEY, getCookies } from "./store/useCookies";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLoginPage = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  useEffect(() => {
    const accessToken = getCookies(COOKIE_KEY.ACCESS_TOKEN);

    if (!accessToken && pathname !== "/") {
      redirect("/");
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {!isLoginPage && <Header />}
            <div className="main-container">{children}</div>
            <Nav />
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
