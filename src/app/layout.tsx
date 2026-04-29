import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "中国雪友成就测试",
  description: "看看你是雪场狠人，还是嘴硬型选手",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      style={{ WebkitTouchCallout: "none" }}
    >
      <body>{children}</body>
    </html>
  );
}
