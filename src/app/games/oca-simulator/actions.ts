"use server";

import { getItems, getMonsters } from "@/lib/database";

export async function getRandomCard() {
  const allItems = await getItems();
  const allMonsters = await getMonsters();
  
  // Create a map of boss/mvp monster IDs
  const bossMonsterIds = new Set(
    allMonsters
      .filter(m => m.special_status.some(s => s === "Boss" || s === "MVP"))
      .map(m => m.id)
  );

  // Filter for cards that are NOT dropped by Bosses/MVPs
  const normalCards = allItems.filter(item => {
    if (item.category !== "卡片") return false;
    
    // Exclude cards dropped by Bosses/MVPs
    const isMvpCard = item.dropped_by.some(d => bossMonsterIds.has(d.monster_id));
    if (isMvpCard) return false;
    
    // Safety check: common MVP cards often have ID ranges or specific names
    if (item.name_en.toLowerCase().includes("mvp")) return false;
    
    return true;
  });

  if (normalCards.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * normalCards.length);
  return normalCards[randomIndex];
}
