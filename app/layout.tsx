import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import type { PropsWithChildren } from "react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
};

export const metadata: Metadata = siteConfig;

const AppLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "https://assets.cdn.filesafe.space/CIoDjNuoDah4NuMMfWMQ/media/643b5be449341f3eb47abe34.png",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorText: "#FFF",
            colorPrimary: "#A855F7", // Purple matching the theme
            colorBackground: "#0B0D10",
            colorInputBackground: "#12151B",
            colorInputText: "#FFF",
          },
        }}
      >
        <body className={cn("min-h-screen w-full bg-black", roboto.className)}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
};

export default AppLayout;
