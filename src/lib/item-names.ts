/**
 * iRO-standard English item names keyed by item ID.
 * Source: iRO Wiki naming conventions (item IDs are identical across all RO versions).
 */
export const ITEM_ID_EN: Record<number, string> = {
  // Map cleared to avoid incorrect TWRoZ mappings. 
  // We now rely on src/data/items-translated.json for correct wiki-extracted names.
};

/**
 * Get the English name for an item by its numeric ID.
 * Falls back to the provided Chinese name if no mapping exists.
 */
export function getItemNameEN(id: number, fallbackZh: string): string {
  return ITEM_ID_EN[id] ?? fallbackZh;
}
