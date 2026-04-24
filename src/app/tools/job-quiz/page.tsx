import JobQuiz from "@/components/tools/JobQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ragnarok Zero Job Finder Quiz | Which Class Should You Play?",
  description: "Undecided which job to play in Ragnarok Zero Global? Take our 2-minute personality test to find the perfect class for your playstyle.",
};

export default function JobQuizPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "#1e293b", marginBottom: "1rem", letterSpacing: "-1.5px" }}>
          The Midgard <span style={{ color: "var(--ro-red)" }}>Path Finder</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
          Analyze your soul, discover your destiny. Find the perfect Ragnarok Zero job class that fits your unique playstyle.
        </p>
      </div>

      <div style={{ background: "white", borderRadius: "32px", padding: "3rem", border: "1px solid #e2e8f0", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}>
        <JobQuiz />
      </div>

      {/* SEO Content for the quiz page */}
      <section style={{ marginTop: "5rem", padding: "3rem", background: "#f8fafc", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", marginBottom: "1.5rem" }}>How the Quiz Works</h2>
        <p style={{ color: "#64748b", lineHeight: 1.8, marginBottom: "1rem" }}>
          Choosing a class in <strong>Ragnarok Zero Global</strong> is a major decision. Unlike other versions, Zero features unique mechanics like 
          <strong>Battle Dolls</strong>, specialized <strong>Refine Systems</strong>, and a completely different 2nd job meta. 
          Our <strong>Job Finder Quiz</strong> uses a weighted scoring system to match your personality—whether you are a strategic leader, 
          a profit-driven merchant, or a frontline tank—with the ideal TWRo Zero class.
        </p>
        <p style={{ color: "#64748b", lineHeight: 1.8 }}>
          Once you finish the test, we'll direct you to our <strong>Midgard Academy</strong> where you can learn the exact builds, 
          starting gear, and leveling spots for your recommended job.
        </p>
      </section>
    </main>
  );
}
