import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "外贸独立站导航 | 发现优质跨境独立站",
  description:
    "按品类精选跨境 DTC 与 B2B 独立站，覆盖服装、3C、家居、美妆等，帮你快速找到合适的出海站点、品牌与供货渠道。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" data-theme="emerald" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="emerald"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
