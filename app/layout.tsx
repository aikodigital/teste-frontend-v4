import "./global.css";
import { Orbitron, Edu_NSW_ACT_Foundation } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aiko",
    icons: {
        icon: "/favicon.ico",
    },
};

const orbitron = Orbitron({
    subsets: ["latin"],
    variable: "--font-orbitron",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const eduNSW = Edu_NSW_ACT_Foundation({
    subsets: ["latin"],
    variable: "--font-edu-nsw",
    weight: ["400"],
    display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${orbitron.variable} ${eduNSW.variable} transition-all duration-300`}>
                {children}
            </body>
        </html>
    );
}