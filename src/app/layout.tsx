import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarNav } from "@/components/ui/side-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aiko Digital - Equipamentos",
  description: "Gestão de Equipamentos",
};

const sidebarNavItems = [
  {
    title: "Listagem de Equipamentos",
    href: "/equipmentsList",
  },
  {
    title: "Histórico de Posições",
    href: "/equipmentsPosition",
  },
  {
    title: "Histórico de Estados",
    href: "/equipmentsState",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`}>
        <Header />
        <div className="">
          <Card className="mt-10 p-2 max-w-7xl mx-auto">
            <CardContent>
              <div className="space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Painel de Administração
                  </h2>
                  <p className="text-muted-foreground">
                    Verifique modelos, estados e posições dos equipamentos.
                  </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                  <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                  </aside>
                  <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}
