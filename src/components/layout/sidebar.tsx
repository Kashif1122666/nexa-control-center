
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Overview", href: "/" },
  { label: "AI Agents", href: "/agents" },
  { label: "Tasks", href: "/tasks" },
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
  { label: "Knowledge Base", href: "/knowledge" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = (mobile = false) =>
    navigation.map((item) => {
      const isActive = pathname === item.href;

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => {
            if (mobile) setIsOpen(false);
          }}
          aria-current={isActive ? "page" : undefined}
          className={`block rounded-lg px-4 py-3 text-sm transition ${
            isActive
              ? "bg-blue-600/15 text-blue-400"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          }`}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-zinc-800 bg-[#0e0e11] p-6 md:sticky md:top-0 md:block md:h-screen">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Nexa<span className="text-blue-500">Labs</span>
        </Link>

        <p className="mt-2 text-xs text-zinc-500">
          AI COMPANY OPERATING SYSTEM
        </p>

        <nav className="mt-12 space-y-2">
          {navigationLinks()}
        </nav>

        <div className="absolute bottom-6">
          <p className="text-sm font-medium">Founder Account</p>
          <p className="mt-1 text-xs text-zinc-500">
            System Administrator
          </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-800 bg-[#0e0e11] px-5 py-4 md:hidden">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Nexa<span className="text-blue-500">Labs</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          className="flex size-10 items-center justify-center rounded-lg border border-zinc-700 text-xl text-zinc-300 hover:bg-zinc-800"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-zinc-800 bg-[#0e0e11] p-6 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold tracking-tight"
          >
            Nexa<span className="text-blue-500">Labs</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="flex size-9 items-center justify-center rounded-lg text-lg text-zinc-400 hover:bg-zinc-800"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-xs text-zinc-500">
          AI COMPANY OPERATING SYSTEM
        </p>

        <nav className="mt-12 space-y-2">
          {navigationLinks(true)}
        </nav>

        <div className="absolute bottom-6 left-6">
          <p className="text-sm font-medium">Founder Account</p>
          <p className="mt-1 text-xs text-zinc-500">
            System Administrator
          </p>
        </div>
      </aside>
    </>
  );
}
