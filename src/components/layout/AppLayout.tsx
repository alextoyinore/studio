"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className={cn("flex flex-col min-h-screen", { 'bg-white': !isAdmin })}>
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <div className={cn({ "w-full lg:w-3/4 lg:mx-auto": !isAdmin })}>
            {children}
        </div>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}
