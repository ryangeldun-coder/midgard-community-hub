import OCASimulator from "@/components/games/OCASimulator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Old Card Album Simulator | Ragnarok Zero Global Games",
  description: "Test your luck with the Old Card Album simulator. Open albums and see which cards you can get in Ragnarok Zero Global.",
};

export default function OCAPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "#1e293b", marginBottom: "1rem", letterSpacing: "-1.5px" }}>
          Old Card <span style={{ color: "var(--ro-red)" }}>Album Simulator</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
          Are you lucky today? Open the legendary album and discover the hidden power within. (No MVP cards included, just like in-game).
        </p>
      </div>

      <div style={{ background: "white", borderRadius: "32px", padding: "3rem", border: "1px solid #e2e8f0", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}>
        <OCASimulator />
      </div>

      <section style={{ marginTop: "5rem", padding: "3rem", background: "#f8fafc", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", marginBottom: "1.5rem" }}>About OCA Simulator</h2>
        <p style={{ color: "#64748b", lineHeight: 1.8, marginBottom: "1rem" }}>
          In <strong>Ragnarok Zero Global</strong>, the Old Card Album is one of the most sought-after items for gamblers and adventurers alike. 
          It contains almost every monster card available in the game, excluding the powerful MVP and Boss cards.
        </p>
        <p style={{ color: "#64748b", lineHeight: 1.8 }}>
          Our simulator uses the real <strong>Midgard Hub Database</strong> to pull cards, giving you a realistic taste of the RNG. 
          Use this tool to kill time while waiting for your party or simply to test if today is your lucky day to pull that expensive card you've been dreaming of!
        </p>
      </section>
    </main>
  );
}
