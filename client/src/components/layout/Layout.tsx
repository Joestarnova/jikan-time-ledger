import type { ReactNode } from "react";
import Navbar from "./Navbar";
import TabNav from "./TabNav";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <TabNav />
      <main className="px-8 py-8">{children}</main>
    </div>
  );
}
