"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Inicio", icon: "IN" },
  { href: "/history", label: "Historial", icon: "HI" },
  { href: "/profile", label: "Perfil", icon: "PF" },
];

export default function BottomNav({ activeTab }) {
  const pathname = usePathname();
  const current = activeTab || pathname;

  return (
    <nav className="px-4 py-3 border-t border-[var(--color-border)] bg-white">
      <ul className="grid grid-cols-3 gap-2 text-center">
        {tabs.map((tab) => {
          const active = current === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`block rounded-2xl px-2 py-2 transition ${
                  active
                    ? "bg-[var(--color-surface)] text-[var(--color-primary)]"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface)]"
                }`}
              >
                <span
                  className={`mx-auto mb-1 grid h-6 w-6 place-content-center rounded-full text-[9px] font-bold ${
                    active ? "bg-[var(--color-primary)] text-white" : "bg-white border border-[var(--color-border)]"
                  }`}
                >
                  {tab.icon}
                </span>
                <span className={`text-[11px] ${active ? "font-semibold" : "font-medium"}`}>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
