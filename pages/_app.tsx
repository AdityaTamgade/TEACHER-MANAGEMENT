// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto h-screen bg-gray-100">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
