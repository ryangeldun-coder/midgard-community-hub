"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sword, Wand2, Heart, Coins, Users, User, ArrowRight, RotateCcw, Sparkles, FlaskConical, TrendingUp, Globe, BookOpen, Zap, Target, Hammer } from "lucide-react";
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
    text: "You are ambushed by a swarm of monsters in a dark dungeon. What is your immediate reaction?",
    options: [
      { text: "Stand my ground and let them break against my steel", icon: <Shield size={20} />, scores: { knight: 3, crusader: 3, blacksmith: 1 } },
      { text: "Vanish into the shadows and wait for the perfect opening", icon: <User size={20} />, scores: { assassin: 3, rogue: 3 } },
      { text: "Unleash a devastating burst of energy to clear the area", icon: <Wand2 size={20} />, scores: { wizard: 3, monk: 2, sage: 1 } },
      { text: "Retreat slightly and set up tactical barriers/traps", icon: <Target size={20} />, scores: { hunter: 3, sage: 2, alchemist: 2 } },
    ]
  },
  {
    id: 2,
    text: "A legendary card drops. What is the first thing that comes to your mind?",
    options: [
      { text: "The immense profit I'll make in the market", icon: <Coins size={20} />, scores: { blacksmith: 3, rogue: 3, alchemist: 2 } },
      { text: "How this will finally unlock my ultimate build's power", icon: <Sparkles size={20} />, scores: { wizard: 2, knight: 2, assassin: 3, monk: 3 } },
      { text: "This belongs in the hands of my guild's strongest protector", icon: <Heart size={20} />, scores: { priest: 3, bard: 3, crusader: 2, sage: 2 } },
    ]
  },
  {
    id: 3,
    text: "How do you prepare for a long journey into the unknown?",
    options: [
      { text: "Checking my equipment durability and sharpening my blade", icon: <Sword size={20} />, scores: { knight: 3, blacksmith: 3, assassin: 2, monk: 2 } },
      { text: "Brewing a vast array of potions and preparing mechanical tools", icon: <FlaskConical size={20} />, scores: { alchemist: 3, rogue: 2, blacksmith: 2, hunter: 2 } },
      { text: "Ensuring my spiritual and mental focus is at its peak", icon: <Zap size={20} />, scores: { priest: 3, wizard: 3, sage: 3, monk: 1 } },
    ]
  },
  {
    id: 4,
    text: "During a massive Boss (MVP) fight, what is your most important contribution?",
    options: [
      { text: "Holding the beast's attention so no one else gets hurt", icon: <Shield size={20} />, scores: { knight: 3, crusader: 3 } },
      { text: "Stripping the enemy of its magical defenses and buffs", icon: <Sparkles size={20} />, scores: { sage: 3, rogue: 2, bard: 2 } },
      { text: "Delivering the crushing, final blow to claim the kill", icon: <Target size={20} />, scores: { monk: 3, wizard: 3, assassin: 2, hunter: 2 } },
      { text: "Keeping the party alive against all odds", icon: <Heart size={20} />, scores: { priest: 3, alchemist: 1, crusader: 1, bard: 2 } },
    ]
  },
  {
    id: 5,
    text: "What is your philosophy on 'Zeny' (Money)?",
    options: [
      { text: "Money is a tool to buy the best equipment", icon: <Coins size={20} />, scores: { knight: 2, wizard: 2, assassin: 3 } },
      { text: "Making money is a game in itself; I want to be the best merchant", icon: <TrendingUp size={20} />, scores: { blacksmith: 3, alchemist: 3, rogue: 2 } },
      { text: "I care little for wealth, as long as my needs are met", icon: <User size={20} />, scores: { priest: 3, monk: 2, hunter: 1 } },
    ]
  },
  {
    id: 6,
    text: "A teammate makes a critical mistake. How do you handle it?",
    options: [
      { text: "I immediately jump in to cover their weakness", icon: <Shield size={20} />, scores: { crusader: 3, knight: 2, monk: 2 } },
      { text: "I use my utility skills to fix the situation instantly", icon: <Zap size={20} />, scores: { sage: 3, priest: 3, bard: 2, alchemist: 2 } },
      { text: "I adapt my strategy to exploit the new chaos", icon: <Target size={20} />, scores: { rogue: 3, assassin: 3, hunter: 2 } },
    ]
  },
  {
    id: 7,
    text: "Which of these words resonates with you the most?",
    options: [
      { text: "Honor", icon: <Shield size={20} />, scores: { knight: 3, crusader: 3, monk: 1 } },
      { text: "Freedom", icon: <Globe size={20} />, scores: { assassin: 2, rogue: 3, hunter: 3, bard: 2 } },
      { text: "Knowledge", icon: <BookOpen size={20} />, scores: { wizard: 3, sage: 3, alchemist: 2, priest: 1 } },
      { text: "Mastery", icon: <Hammer size={20} />, scores: { blacksmith: 3, monk: 3, wizard: 1, knight: 1 } },
    ]
  },
  {
    id: 8,
    text: "Your party is struggling in a difficult Memorial Dungeon. What is your move?",
    options: [
      { text: "I step up as the leader and coordinate everyone's position", icon: <Shield size={20} />, scores: { knight: 2, crusader: 3, bard: 3, sage: 2 } },
      { text: "I focus on maximum DPS to burn down the threat quickly", icon: <Zap size={20} />, scores: { wizard: 3, hunter: 3, assassin: 2, monk: 2 } },
      { text: "I keep a cool head and provide essential buffs/heals", icon: <Heart size={20} />, scores: { priest: 3, alchemist: 2, bard: 2 } },
    ]
  },
  {
    id: 9,
    text: "You finally saved enough Zeny for your first major upgrade. You choose...",
    options: [
      { text: "A massive, high-refine weapon that hits like a truck", icon: <Sword size={20} />, scores: { knight: 3, blacksmith: 3, monk: 3, assassin: 2 } },
      { text: "Specialized gear that grants unique utility or spells", icon: <Wand2 size={20} />, scores: { wizard: 3, sage: 3, alchemist: 2, rogue: 2 } },
      { text: "Top-tier defensive items to become an immovable wall", icon: <Shield size={20} />, scores: { crusader: 3, knight: 2, priest: 2 } },
    ]
  },
  {
    id: 10,
    text: "A rival challenges you to a 1v1 duel in the arena. You accept because...",
    options: [
      { text: "I want to prove my skill and physical dominance", icon: <Sword size={20} />, scores: { knight: 3, monk: 3, assassin: 2, crusader: 2 } },
      { text: "I want to test my tactical traps and long-range precision", icon: <Target size={20} />, scores: { hunter: 3, rogue: 3, alchemist: 1 } },
      { text: "I enjoy outsmarting opponents with magic and debuffs", icon: <Wand2 size={20} />, scores: { sage: 3, wizard: 2, bard: 1 } },
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
