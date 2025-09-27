"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isLogin = pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {!isAdmin && !isLogin && <Header />}
      <main className="flex-grow">
        <div className={cn({ "w-full lg:w-3/4 lg:mx-auto": !isAdmin && !isLogin })}>
            {children}
        </div>
      </main>
      {!isAdmin && !isLogin && <Footer />}
    </div>
  );
}
