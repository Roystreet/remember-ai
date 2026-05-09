"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Inicio" },
  { href: "/history", label: "Historial" },
  { href: "/profile", label: "Perfil" },
];

export default function BottomNav({ activeTab }) {
  const pathname = usePathname();
  const current = activeTab || pathname;

  return (
    <nav className="px-4 py-3 border-t border-[var(--color-border)] bg-white">
      <ul className="grid grid-cols-3 gap-2 text-center text-xs">
        {tabs.map((tab) => {
          const active = current === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`block rounded-xl px-2 py-2 transition ${
                  active
                    ? "bg-[var(--color-surface)] text-[var(--color-primary)] font-semibold"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

