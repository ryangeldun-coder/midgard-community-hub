"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sword, Wand2, Heart, Coins, Users, User, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    icon: React.ReactNode;
    scores: Record<string, number>;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How do you prefer to approach a battle?",
    options: [
      { text: "Charge straight into the frontlines", icon: <Sword size={20} />, scores: { knight: 3, assassin: 1, blacksmith: 2, monk: 2, crusader: 2 } },
      { text: "Strike from a safe distance", icon: <ArrowRight size={20} />, scores: { wizard: 3, hunter: 3, sage: 1, bard: 1 } },
      { text: "Support and protect my allies", icon: <Heart size={20} />, scores: { priest: 3, crusader: 2, sage: 2, bard: 3, alchemist: 1 } },
    ]
  },
  {
    id: 2,
    text: "What is your main goal in Midgard?",
    options: [
      { text: "To become the richest merchant", icon: <Coins size={20} />, scores: { blacksmith: 3, rogue: 3, alchemist: 3 } },
      { text: "To master the most complex magic", icon: <Wand2 size={20} />, scores: { wizard: 3, sage: 3 } },
      { text: "To be an unkillable legend", icon: <Shield size={20} />, scores: { knight: 3, crusader: 3, monk: 1 } },
    ]
  },
  {
    id: 3,
    text: "Do you prefer playing solo or in a party?",
    options: [
      { text: "I'm a lone wolf, I work alone", icon: <User size={20} />, scores: { assassin: 3, hunter: 2, rogue: 3, monk: 2, knight: 1 } },
      { text: "I love being the heart of a group", icon: <Users size={20} />, scores: { priest: 3, bard: 3, dancer: 3, sage: 2, crusader: 2 } },
    ]
  },
  {
    id: 4,
    text: "What kind of gameplay mechanics do you enjoy?",
    options: [
      { text: "Simple and direct combat", icon: <Sword size={20} />, scores: { knight: 3, hunter: 2, blacksmith: 2 } },
      { text: "Complex combos and timing", icon: <Sparkles size={20} />, scores: { monk: 3, assassin: 3, rogue: 2 } },
      { text: "Strategic planning and utility", icon: <Shield size={20} />, scores: { alchemist: 3, sage: 3, wizard: 2 } },
    ]
  }
];

const JOB_DETAILS: Record<string, { name: string, description: string, href: string }> = {
  knight: { name: "Knight", description: "A high-HP frontline warrior. Great for players who want to tank and deal consistent physical damage.", href: "/guides/knight" },
  wizard: { name: "Wizard", description: "The master of elements. Best for those who want to destroy screens of enemies with powerful magic.", href: "/guides/wizard" },
  assassin: { name: "Assassin", description: "Fast, deadly, and stealthy. Perfect for solo players who love critical hits and burst damage.", href: "/guides/assassin" },
  priest: { name: "Priest", description: "The soul of every party. Essential for anyone who loves supporting others and fighting the undead.", href: "/guides/priest" },
  hunter: { name: "Hunter", description: "The ultimate marksman. Great for players who prefer kiting enemies and using tactical traps.", href: "/guides/hunter" },
  blacksmith: { name: "Blacksmith", description: "Master of the forge and maces. Ideal for those who want to dominate the market and hit hard.", href: "/guides/blacksmith" },
  crusader: { name: "Crusader", description: "The holy protector. Best for players who want to be the ultimate shield for their friends.", href: "/guides/crusader" },
  monk: { name: "Monk", description: "Master of spirit spheres. Perfect for players who love technical combos and massive one-shot potential.", href: "/guides/monk" },
  rogue: { name: "Rogue", description: "The master of utility. Great for farming and those who like a mix of melee and ranged skills.", href: "/guides/rogue" },
  sage: { name: "Sage", description: "The anti-mage. Best for strategic players who enjoy disrupting enemies and providing magic buffs.", href: "/guides/sage" },
  alchemist: { name: "Alchemist", description: "Master of science. Perfect for players who enjoy potion making and summoning loyal companions.", href: "/guides/alchemist" },
  bard: { name: "Bard/Dancer", description: "The ultimate performer. Best for players who want to provide massive buffs to the entire party.", href: "/guides/bard" },
};

export default function JobQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (answerScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(answerScores).forEach(([job, score]) => {
      newScores[job] = (newScores[job] || 0) + score;
    });
    setScores(newScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      const topJob = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      setResult(topJob);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({});
    setResult(null);
  };

  if (result) {
    const job = JOB_DETAILS[result];
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✨</div>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Recommended Class: {job.name}</h2>
        <p style={{ color: "#64748b", maxWidth: "500px", margin: "0 auto 2rem", fontSize: "1.1rem", lineHeight: 1.6 }}>{job.description}</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link href={job.href} style={{ padding: "12px 24px", background: "var(--ro-red)", color: "white", borderRadius: "10px", textDecoration: "none", fontWeight: 800 }}>Read {job.name} Guide</Link>
          <button onClick={resetQuiz} style={{ padding: "12px 24px", background: "#f1f5f9", color: "#64748b", borderRadius: "10px", border: "none", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
            <RotateCcw size={16} /> Retake Test
          </button>
        </div>
      </motion.div>
    );
  }

  const question = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem", background: "#f1f5f9", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: "100%", background: "var(--ro-red)" }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          style={{ padding: "1rem" }}
        >
          <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--ro-red)", textTransform: "uppercase", letterSpacing: "1px" }}>Question {currentStep + 1} of {QUESTIONS.length}</span>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0.5rem 0 2rem" }}>{question.text}</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.scores)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.25rem",
                  background: "white",
                  border: "2px solid #e2e8f0",
                  borderRadius: "16px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ro-red)"; e.currentTarget.style.background = "#fff1f2"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "white"; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: "10px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ro-red)" }}>
                  {option.icon}
                </div>
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
