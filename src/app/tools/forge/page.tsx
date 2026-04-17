import ForgeSimulator from "@/components/tools/ForgeSimulator";

export const metadata = {
  title: "Blacksmith Forge Simulator | Midgard Community Hub",
  description: "TWRoZ Blacksmith and Whitesmith forging success rate calculator. Find optimal DEX/LUK stats, expected output, and quality breakdown.",
};

export default function ForgePage() {
  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem 0" }}>
          Blacksmith Forge
        </h1>
        <p style={{ color: "#64748b", margin: 0 }}>
          Calculate weapon forging success rates, expected output, and item quality for TWRoZ.
        </p>
      </div>
      <ForgeSimulator />
    </main>
  );
}
