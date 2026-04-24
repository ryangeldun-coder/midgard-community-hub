"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sword, Wand2, Heart, Coins, Users, User, ArrowRight, RotateCcw, Sparkles, FlaskConical, TrendingUp, Globe, BookOpen, Zap, Target, Hammer, Music, Ghost, Eye, Wrench } from "lucide-react";
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
    text: "A massive, unpredictable storm is approaching. How do you respond?",
    options: [
      { text: "I build a shelter and stand firm against the wind", icon: <Shield size={20} />, scores: { knight: 5, crusader: 5, blacksmith: 3, priest: 2 } },
      { text: "I run directly into the heart of it to feel its power", icon: <Zap size={20} />, scores: { wizard: 5, monk: 5, assassin: 3 } },
      { text: "I watch from a distance, calculating its path", icon: <Eye size={20} />, scores: { hunter: 5, sage: 5, rogue: 4, alchemist: 3 } },
      { text: "I gather everyone together to ensure no one is alone", icon: <Users size={20} />, scores: { bard: 5, priest: 5, crusader: 3, alchemist: 2 } },
    ]
  },
  {
    id: 2,
    text: "You find an ancient, dust-covered library. Which book do you reach for first?",
    options: [
      { text: "A legendary saga of heroes and their epic sacrifices", icon: <Sword size={20} />, scores: { knight: 5, crusader: 5, bard: 4, monk: 2 } },
      { text: "A map of hidden shortcuts and forgotten tunnels", icon: <Globe size={20} />, scores: { rogue: 5, assassin: 5, hunter: 4, blacksmith: 2 } },
      { text: "A complex manual on chemical reactions and life-creation", icon: <FlaskConical size={20} />, scores: { alchemist: 6, blacksmith: 3, sage: 3 } },
      { text: "A tome of forbidden stars and elemental laws", icon: <Wand2 size={20} />, scores: { wizard: 6, sage: 5, priest: 2 } },
    ]
  },
  {
    id: 3,
    text: "When faced with a total failure, what is your first thought?",
    options: [
      { text: "I wasn't strong enough; I must train my body more", icon: <Hammer size={20} />, scores: { knight: 5, blacksmith: 4, monk: 5, assassin: 2 } },
      { text: "I didn't have the right tools or information", icon: <BookOpen size={20} />, scores: { alchemist: 5, rogue: 5, sage: 5, hunter: 3 } },
      { text: "I lost my focus and allowed chaos to take over", icon: <Zap size={20} />, scores: { wizard: 5, hunter: 5, assassin: 4, priest: 2 } },
      { text: "I let my companions down; I need to be more reliable", icon: <Heart size={20} />, scores: { priest: 5, bard: 5, crusader: 5, sage: 2 } },
    ]
  },
  {
    id: 4,
    text: "If your personality was a weapon, what would it be?",
    options: [
      { text: "An immovable, heavy iron wall", icon: <Shield size={20} />, scores: { crusader: 6, knight: 4, blacksmith: 2 } },
      { text: "A sharp, invisible needle in the dark", icon: <Ghost size={20} />, scores: { assassin: 6, rogue: 4, hunter: 2 } },
      { text: "A sudden, blinding flash of lightning", icon: <Zap size={20} />, scores: { monk: 6, wizard: 5, sage: 3 } },
      { text: "A warm, glowing ember that never goes out", icon: <Heart size={20} />, scores: { priest: 6, bard: 5, alchemist: 2 } },
    ]
  },
  {
    id: 5,
    text: "Which of these environments makes you feel most 'at home'?",
    options: [
      { text: "A bustling, chaotic market full of opportunity", icon: <Coins size={20} />, scores: { blacksmith: 6, alchemist: 4, rogue: 5 } },
      { text: "A silent, snow-covered peak under the stars", icon: <Wand2 size={20} />, scores: { wizard: 5, sage: 6, monk: 4, priest: 2 } },
      { text: "The deep, tangled heart of a wild forest", icon: <Target size={20} />, scores: { hunter: 6, assassin: 4, rogue: 3, bard: 3 } },
      { text: "The frontlines of a glorious battle", icon: <Sword size={20} />, scores: { knight: 6, crusader: 5, blacksmith: 3, priest: 2 } },
    ]
  },
  {
    id: 6,
    text: "What do you value most in a friendship?",
    options: [
      { text: "Absolute, unquestioning loyalty", icon: <Shield size={20} />, scores: { knight: 5, crusader: 6, priest: 3 } },
      { text: "The freedom to go our separate ways and still be close", icon: <Globe size={20} />, scores: { assassin: 5, rogue: 5, hunter: 4, bard: 4 } },
      { text: "Shared intellectual growth and discovery", icon: <BookOpen size={20} />, scores: { wizard: 4, sage: 6, alchemist: 5, priest: 2 } },
      { text: "Competitive spirit that pushes me to be better", icon: <Zap size={20} />, scores: { monk: 6, blacksmith: 4, knight: 3, hunter: 3 } },
    ]
  },
  {
    id: 7,
    text: "How do you prefer to solve a conflict?",
    options: [
      { text: "I end it quickly with overwhelming force", icon: <Hammer size={20} />, scores: { knight: 4, wizard: 5, monk: 6, blacksmith: 3 } },
      { text: "I outsmart the opponent and make them defeat themselves", icon: <Eye size={20} />, scores: { sage: 6, rogue: 5, assassin: 4, hunter: 3 } },
      { text: "I absorb the impact and protect others until it's over", icon: <Shield size={20} />, scores: { crusader: 6, priest: 5, alchemist: 2 } },
      { text: "I use words, music, or charm to diffuse the tension", icon: <Music size={20} />, scores: { bard: 6, priest: 3, rogue: 3 } },
    ]
  },
  {
    id: 8,
    text: "If you were a color, which would describe you best?",
    options: [
      { text: "Deep Blue: Calm, deep, and methodical", icon: <Wand2 size={20} />, scores: { sage: 6, wizard: 4, priest: 4, alchemist: 3 } },
      { text: "Blood Red: Passionate, direct, and fierce", icon: <Sword size={20} />, scores: { knight: 5, blacksmith: 5, monk: 5, assassin: 3 } },
      { text: "Forest Green: Adaptable, resourceful, and wild", icon: <Target size={20} />, scores: { hunter: 6, rogue: 5, assassin: 4, bard: 3 } },
      { text: "Golden White: Noble, protective, and pure", icon: <Sparkles size={20} />, scores: { crusader: 6, priest: 5, knight: 3 } },
    ]
  },
  {
    id: 9,
    text: "What is your relationship with 'The Rules'?",
    options: [
      { text: "I am the one who enforces the law and order", icon: <Shield size={20} />, scores: { knight: 5, crusader: 6, priest: 3 } },
      { text: "Rules are just suggestions; I find the loopholes", icon: <Ghost size={20} />, scores: { rogue: 6, assassin: 5, alchemist: 4, sage: 3 } },
      { text: "I live by a strict, personal code no one else understands", icon: <Zap size={20} />, scores: { monk: 6, hunter: 4, wizard: 2 } },
      { text: "I follow my heart and the rhythm of the moment", icon: <Music size={20} />, scores: { bard: 6, priest: 4, hunter: 2 } },
    ]
  },
  {
    id: 10,
    text: "What scares you more?",
    options: [
      { text: "Losing my autonomy and freedom", icon: <Globe size={20} />, scores: { assassin: 6, rogue: 5, hunter: 5, bard: 4 } },
      { text: "Being powerless to protect those I love", icon: <Heart size={20} />, scores: { crusader: 6, priest: 5, knight: 4, alchemist: 3 } },
      { text: "Remaining ignorant and stagnant in life", icon: <BookOpen size={20} />, scores: { wizard: 5, sage: 6, blacksmith: 4, monk: 3 } },
      { text: "Being forgotten and leaving no legacy", icon: <Sparkles size={20} />, scores: { bard: 6, knight: 4, blacksmith: 5, monk: 2 } },
    ]
  },
  {
    id: 11,
    text: "If you could stop time for 10 seconds in a crisis, what would you do?",
    options: [
      { text: "Reposition everyone for maximum safety", icon: <Users size={20} />, scores: { priest: 5, crusader: 6, bard: 4 } },
      { text: "Set up a sequence of unavoidable strikes", icon: <Target size={20} />, scores: { hunter: 5, wizard: 5, sage: 4, assassin: 3 } },
      { text: "Seize the most valuable asset and vanish", icon: <Coins size={20} />, scores: { rogue: 6, assassin: 5, blacksmith: 2 } },
      { text: "Fix the fundamental flaw in the situation", icon: <Wrench size={20} />, scores: { alchemist: 6, sage: 4, blacksmith: 4, monk: 3 } },
    ]
  },
  {
    id: 12,
    text: "You are lost in a shifting labyrinth. Your strategy is...",
    options: [
      { text: "Trust my gut and move with speed", icon: <Zap size={20} />, scores: { knight: 5, assassin: 6, monk: 5 } },
      { text: "Map the logic and mark every wall", icon: <BookOpen size={20} />, scores: { sage: 6, wizard: 5, alchemist: 5 } },
      { text: "Follow the subtle sounds and vibrations", icon: <Music size={20} />, scores: { bard: 6, hunter: 5, rogue: 4 } },
      { text: "Believe that my path is guided from above", icon: <Sparkles size={20} />, scores: { priest: 6, crusader: 5, knight: 2 } },
    ]
  },
  {
    id: 13,
    text: "When people speak of your legacy in 100 years, what should they say?",
    options: [
      { text: "They were the strongest shield we ever had", icon: <Shield size={20} />, scores: { crusader: 6, knight: 5, priest: 2 } },
      { text: "They redefined how we see the world", icon: <Globe size={20} />, scores: { wizard: 5, sage: 6, alchemist: 6 } },
      { text: "They were the shadow that kept us free", icon: <Ghost size={20} />, scores: { assassin: 6, rogue: 5, hunter: 5 } },
      { text: "They were the light that never let us fade", icon: <Heart size={20} />, scores: { priest: 6, bard: 6, monk: 2 } },
    ]
  },
  {
    id: 14,
    text: "A magic mirror shows your true elemental nature. You see...",
    options: [
      { text: "A roaring, unquenchable flame", icon: <Zap size={20} />, scores: { wizard: 6, knight: 4, monk: 5, blacksmith: 4 } },
      { text: "A deep, silent, and endless ocean", icon: <Wand2 size={20} />, scores: { sage: 6, priest: 5, bard: 4 } },
      { text: "A cold, sharp, and invisible wind", icon: <Ghost size={20} />, scores: { assassin: 6, hunter: 6, rogue: 5 } },
      { text: "A mountain that the stars cannot move", icon: <Shield size={20} />, scores: { crusader: 6, knight: 4, alchemist: 3 } },
    ]
  },
  {
    id: 15,
    text: "To achieve ultimate power, what are you most willing to sacrifice?",
    options: [
      { text: "My physical comfort and safety", icon: <Shield size={20} />, scores: { knight: 5, crusader: 6, blacksmith: 5 } },
      { text: "My connection to other people", icon: <User size={20} />, scores: { assassin: 6, hunter: 5, monk: 5 } },
      { text: "My certainty and peace of mind", icon: <Eye size={20} />, scores: { wizard: 6, sage: 6, rogue: 5 } },
      { text: "My material wealth and status", icon: <Coins size={20} />, scores: { priest: 6, bard: 5, alchemist: 4 } },
    ]
  }
];

const JOB_DETAILS: Record<string, { name: string; description: string; href: string; videoId?: string }> = {
  knight: { 
    name: "Knight", 
    description: "A high-HP frontline warrior. Great for players who want to tank and deal consistent physical damage with two-handed swords or spears.", 
    href: "/guides/knight",
    videoId: "wZ_vYmR4u-Y" // Example ID, replace with real one
  },
  wizard: { 
    name: "Wizard", 
    description: "The master of elements. Best for those who want to destroy screens of enemies with powerful AoE magic like Storm Gust and Meteor Storm.", 
    href: "/guides/wizard",
    videoId: "dQw4w9WgXcQ"
  },
  assassin: { 
    name: "Assassin", 
    description: "Fast, deadly, and stealthy. Perfect for solo players who love critical hits, katar mastery, and burst damage from the shadows.", 
    href: "/guides/assassin",
    videoId: "dQw4w9WgXcQ"
  },
  priest: { 
    name: "Priest", 
    description: "The soul of every party. Essential for anyone who loves supporting others, healing, and turning undead with holy power.", 
    href: "/guides/priest",
    videoId: "dQw4w9WgXcQ"
  },
  hunter: { 
    name: "Hunter", 
    description: "The ultimate marksman. Great for players who prefer kiting enemies from afar and using tactical traps to control the battlefield.", 
    href: "/guides/hunter",
    videoId: "dQw4w9WgXcQ"
  },
  blacksmith: { 
    name: "Blacksmith", 
    description: "Master of the forge and maces. Ideal for those who want to dominate the market through crafting and deliver heavy, buffed melee hits.", 
    href: "/guides/blacksmith",
    videoId: "dQw4w9WgXcQ"
  },
  crusader: { 
    name: "Crusader", 
    description: "The holy protector. Best for players who want to be the ultimate shield for their friends using Devotion and holy spear skills.", 
    href: "/guides/crusader",
    videoId: "dQw4w9WgXcQ"
  },
  monk: { 
    name: "Monk", 
    description: "Master of spirit spheres. Perfect for players who love technical combos and the legendary one-shot potential of Asura Strike.", 
    href: "/guides/monk",
    videoId: "dQw4w9WgXcQ"
  },
  rogue: { 
    name: "Rogue", 
    description: "The master of utility and farming. Great for those who like a mix of melee and ranged skills, along with the ability to copy others' moves.", 
    href: "/guides/rogue",
    videoId: "dQw4w9WgXcQ"
  },
  sage: { 
    name: "Sage", 
    description: "The strategic anti-mage. Best for players who enjoy disrupting enemy magic, providing elemental enchants, and controlling the field.", 
    href: "/guides/sage",
    videoId: "dQw4w9WgXcQ"
  },
  alchemist: { 
    name: "Alchemist", 
    description: "The scientific summoner. Perfect for players who enjoy potion making and fighting alongside a loyal, bio-engineered Homunculus.", 
    href: "/guides/alchemist",
    videoId: "dQw4w9WgXcQ"
  },
  bard: { 
    name: "Bard/Dancer", 
    description: "The ultimate performer. Best for players who want to provide massive, screen-wide buffs to the entire party through music and dance.", 
    href: "/guides/bard",
    videoId: "dQw4w9WgXcQ"
  },
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
    const topJob = result;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✨</div>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--ro-red)", marginBottom: "1rem" }}>
          You are a {JOB_DETAILS[topJob].name}!
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#64748b", lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
          {JOB_DETAILS[topJob].description}
        </p>

        {/* YouTube Embed */}
        {JOB_DETAILS[topJob].videoId && (
          <div style={{ marginBottom: "2.5rem", borderRadius: "20px", overflow: "hidden", aspectRatio: "16/9", background: "#000", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${JOB_DETAILS[topJob].videoId}`}
              title={`${JOB_DETAILS[topJob].name} Guide`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href={JOB_DETAILS[topJob].href} style={{ flex: 1, padding: "1rem", background: "var(--ro-red)", color: "white", borderRadius: "16px", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            View Full Guide <ArrowRight size={18} />
          </Link>
          <button onClick={resetQuiz} style={{ padding: "1rem", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: "16px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <RotateCcw size={18} /> Retake
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
