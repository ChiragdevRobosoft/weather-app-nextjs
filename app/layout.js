import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import { Roboto } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--my-roboto-font",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <StoreProvider>
          <div className="app-wrapper">
            <Header />
            <Navbar />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
