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

/** Translate many short strings in one request using ||| separator */
async function translateBatch(texts: string[]): Promise<string[]> {
  const clean = texts.map((t) => t.replace(/\|\|\|/g, " "));
  const joined = clean.join(" ||| ");
  if (!joined.trim()) return texts;

  const url = `${TRANSLATE_URL}?client=gtx&sl=zh-TW&tl=en&dt=t&q=${encodeURIComponent(joined)}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const data = await res.json();
    const translated = (data[0] as any[][]).map((seg: any[]) => seg[0]).join("");
    const parts = translated.split("|||");
    // Pad with originals if split count doesn't match
    return texts.map((orig, i) => parts[i]?.trim() || orig);
  } catch {
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
