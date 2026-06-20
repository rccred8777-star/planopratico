"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  Package,
  Wrench,
  Bot,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Visão Geral", icon: LayoutDashboard },
  { href: "/pesquisa", label: "Pesquisa", icon: Search },
  { href: "/produtos", label: "Produtos", icon: Package },
  { href: "/ferramentas", label: "Ferramentas", icon: Wrench },
  { href: "/agente", label: "Agente", icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col border-r"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 px-4 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
          PP
        </div>
        <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
          PlanoPratico
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                active
                  ? "text-white"
                  : "hover:text-white"
              )}
              style={{
                background: active ? "var(--primary)" : "transparent",
                color: active ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
        Painel de Controle v1.0
      </div>
    </aside>
  );
}
