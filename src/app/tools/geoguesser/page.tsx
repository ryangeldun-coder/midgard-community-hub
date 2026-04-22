import { getMaps } from "@/lib/database";
import GeoguesserGame from "./GeoguesserGame";

export default async function GeoguesserPage() {
  // This runs on the server, so 'fs' works perfectly here
  const maps = await getMaps();
  const mapPool = maps.map(m => m.id);

  return <GeoguesserGame mapPool={mapPool} />;
}
