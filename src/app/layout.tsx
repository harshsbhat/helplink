import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider"
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/toaster"
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Helplink",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body className="dark">
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        <TRPCReactProvider>          
          {children}
          <Toaster />
          </TRPCReactProvider>
          </ThemeProvider>
      </body>
      
    </html>
  );
}
