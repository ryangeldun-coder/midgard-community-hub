/**
 * Google Translate public endpoint (no API key required).
 * Batches texts together to minimize requests.
 */

const TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single";

/** Translate a single string from zh-TW to en */
async function translateOne(text: string): Promise<string> {
  if (!text || text.trim() === "") return "";
  const url = `${TRANSLATE_URL}?client=gtx&sl=zh-TW&tl=en&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const data = await res.json();
    // Response: [ [ ["translated", "original", ...], ...], null, ... ]
    const translated = (data[0] as any[][]).map((seg: any[]) => seg[0]).join("");
    return translated.trim();
  } catch {
    return text;
  }
}

/** Translate many short strings in one request using a stable separator */
async function translateBatch(texts: string[]): Promise<string[]> {
  if (texts.length === 0) return [];
  if (texts.length === 1) return [await translateOne(texts[0])];

  // Use a separator that Google is unlikely to mangle
  const separator = " ___ ";
  const joined = texts.map(t => t.replace(/___/g, " ")).join(separator);
  
  const url = `${TRANSLATE_URL}?client=gtx&sl=zh-TW&tl=en&dt=t&q=${encodeURIComponent(joined)}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const data = await res.json();
    const translated = (data[0] as any[][]).map((seg: any[]) => seg[0]).join("");
    
    // Split by the separator, being flexible with whitespace
    const parts = translated.split(/___/i).map(p => p.trim());
    
    if (parts.length === texts.length) {
      return parts;
    }
    
    console.warn(`[translate] Batch mismatch: expected ${texts.length}, got ${parts.length}. Falling back to individual translation.`);
    // Fallback: translate one by one for this batch
    const fallbacks: string[] = [];
    for (const text of texts) {
      fallbacks.push(await translateOne(text));
    }
    return fallbacks;
  } catch (err) {
    console.error("[translate] Batch failed:", err);
    return texts;
  }
}

/** Translate an array of strings in chunks of `chunkSize`, with a short delay between batches */
export async function translateAll(
  texts: string[],
  chunkSize = 20,
  delayMs = 120
): Promise<string[]> {
  const results: string[] = [];
  for (let i = 0; i < texts.length; i += chunkSize) {
    const chunk = texts.slice(i, i + chunkSize);
    const translated = await translateBatch(chunk);
    results.push(...translated);
    if (i + chunkSize < texts.length) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return results;
}

export { translateOne };
