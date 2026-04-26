import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midgard Scout",
  description: "Test your Ragnarok Online map knowledge with Midgard Scout, a GeoGuesser inspired game.",
  keywords: "ragnarok geoguesser, midgard scout, ragnarok map quiz".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
