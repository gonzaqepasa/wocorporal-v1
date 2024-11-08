import { NextUIProvider } from "@nextui-org/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <NextUIProvider>
          <Main />
          <NextScript />
        </NextUIProvider>
      </body>
    </Html>
  );
}
