import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Painel de Controle — PlanoPratico",
  description: "Painel central de operações PlanoPratico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 ml-60 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
