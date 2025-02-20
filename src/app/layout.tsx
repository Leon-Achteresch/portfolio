import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import ToolbarDynamic from "@/components/toolbar-dynamic/toolbar-dynamic";

const CabinSans = Cabin({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leon Achteresch",
  description: "Portfolio von Leon Achteresch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${CabinSans.className} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToolbarDynamic />
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
