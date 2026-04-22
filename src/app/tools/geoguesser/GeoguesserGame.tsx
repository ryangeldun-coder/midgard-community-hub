"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Globe, RefreshCw, ChevronRight, Sparkles, AlertCircle } from "lucide-react";

interface GeoguesserGameProps {
  mapPool: string[];
}

const QUIZ_DATA = [
  { id: "abbey02", hint: "Ragnarok location." },
  { id: "abyss_03", hint: "Ragnarok location." },
  { id: "alb2trea", hint: "Ragnarok location." },
  { id: "alberta", hint: "Ragnarok location." },
  { id: "alde_dun01", hint: "Ragnarok location." },
  { id: "aldebaran", hint: "Ragnarok location." },
  { id: "ama_dun01", hint: "Ragnarok location." },
  { id: "amatsu", hint: "Ragnarok location." },
  { id: "anthell02", hint: "Ragnarok location." },
  { id: "aru_gld", hint: "Ragnarok location." },
  { id: "ayo_dun01", hint: "Ragnarok location." },
  { id: "ayothaya", hint: "Ragnarok location." },
  { id: "beach_dun2", hint: "Ragnarok location." },
  { id: "c_tower3", hint: "Ragnarok location." },
  { id: "cmd_fild03", hint: "Ragnarok location." },
  { id: "cmd_fild04", hint: "Ragnarok location." },
  { id: "cmd_fild07", hint: "Ragnarok location." },
  { id: "comodo", hint: "Ragnarok location." },
  { id: "ein_dun02", hint: "Ragnarok location." },
  { id: "ein_fild04", hint: "Ragnarok location." },
  { id: "ein_fild05", hint: "Ragnarok location." },
  { id: "ein_fild06", hint: "Ragnarok location." },
  { id: "ein_fild09", hint: "Ragnarok location." },
  { id: "einbech", hint: "Ragnarok location." },
  { id: "einbroch", hint: "Ragnarok location." },
  { id: "gef_dun00", hint: "Ragnarok location." },
  { id: "gef_fild02", hint: "Ragnarok location." },
  { id: "gef_fild06", hint: "Ragnarok location." },
  { id: "gef_fild07", hint: "Ragnarok location." },
  { id: "gef_fild10", hint: "Ragnarok location." },
  { id: "gef_fild11", hint: "Ragnarok location." },
  { id: "gefenia02", hint: "Ragnarok location." },
  { id: "geffen", hint: "Ragnarok location." },
  { id: "geffen_in", hint: "Ragnarok location." },
  { id: "gl_dun01", hint: "Ragnarok location." },
  { id: "gl_prison", hint: "Ragnarok location." },
  { id: "glast_01", hint: "Ragnarok location." },
  { id: "gon_dun03", hint: "Ragnarok location." },
  { id: "gonryun", hint: "Ragnarok location." },
  { id: "hu_fild01", hint: "Ragnarok location." },
  { id: "hu_fild05", hint: "Ragnarok location." },
  { id: "hu_fild06", hint: "Ragnarok location." },
  { id: "hugel", hint: "Ragnarok location." },
  { id: "in_sphinx3", hint: "Ragnarok location." },
  { id: "iz_dun02", hint: "Ragnarok location." },
  { id: "iz_dun04", hint: "Ragnarok location." },
  { id: "izlu2dun", hint: "Ragnarok location." },
  { id: "izlude", hint: "Ragnarok location." },
  { id: "kh_dun02", hint: "Ragnarok location." },
  { id: "lhz_dun01", hint: "Ragnarok location." },
  { id: "lhz_dun02", hint: "Ragnarok location." },
  { id: "lhz_dun03", hint: "Ragnarok location." },
  { id: "lou_dun01", hint: "Ragnarok location." },
  { id: "louyang", hint: "Ragnarok location." },
  { id: "mag_dun01", hint: "Ragnarok location." },
  { id: "mjo_dun02", hint: "Ragnarok location." },
  { id: "mjolnir_02", hint: "Ragnarok location." },
  { id: "mjolnir_09", hint: "Ragnarok location." },
  { id: "mjolnir_10", hint: "Ragnarok location." },
  { id: "mjolnir_11", hint: "Ragnarok location." },
  { id: "mjolnir_12", hint: "Ragnarok location." },
  { id: "moc_fild01", hint: "Ragnarok location." },
  { id: "moc_fild07", hint: "Ragnarok location." },
  { id: "moc_fild12", hint: "Ragnarok location." },
  { id: "moc_fild16", hint: "Ragnarok location." },
  { id: "moc_fild17", hint: "Ragnarok location." },
  { id: "moc_fild19", hint: "Ragnarok location." },
  { id: "moc_pryd02", hint: "Ragnarok location." },
  { id: "moc_ruins", hint: "Ragnarok location." },
  { id: "morocc", hint: "Ragnarok location." },
  { id: "moskovia", hint: "Ragnarok location." },
  { id: "nameless_n", hint: "Ragnarok location." },
  { id: "nif_fild01", hint: "Ragnarok location." },
  { id: "niflheim", hint: "Ragnarok location." },
  { id: "odin_tem02", hint: "Ragnarok location." },
  { id: "odin_tem03", hint: "Ragnarok location." },
  { id: "pay_arche", hint: "Ragnarok location." },
  { id: "pay_dun04", hint: "Ragnarok location." },
  { id: "pay_fild02", hint: "Ragnarok location." },
  { id: "pay_fild03", hint: "Ragnarok location." },
  { id: "pay_fild04", hint: "Ragnarok location." },
  { id: "pay_fild06", hint: "Ragnarok location." },
  { id: "pay_fild10", hint: "Ragnarok location." },
  { id: "pay_gld", hint: "Ragnarok location." },
  { id: "payon", hint: "Ragnarok location." },
  { id: "prontera", hint: "Ragnarok location." },
  { id: "prt_fild03", hint: "Ragnarok location." },
  { id: "prt_fild04", hint: "Ragnarok location." },
  { id: "prt_fild06", hint: "Ragnarok location." },
  { id: "prt_fild07", hint: "Ragnarok location." },
  { id: "prt_fild08", hint: "Ragnarok location." },
  { id: "prt_fild09", hint: "Ragnarok location." },
  { id: "prt_fild10", hint: "Ragnarok location." },
  { id: "prt_in", hint: "Ragnarok location." },
  { id: "prt_maze01", hint: "Ragnarok location." },
  { id: "prt_maze02", hint: "Ragnarok location." },
  { id: "prt_maze03", hint: "Ragnarok location." },
  { id: "prt_monk", hint: "Ragnarok location." },
  { id: "prt_sewb1", hint: "Ragnarok location." },
  { id: "prt_sewb3", hint: "Ragnarok location." },
  { id: "ra_fild03", hint: "Ragnarok location." },
  { id: "ra_fild12", hint: "Ragnarok location." },
  { id: "ra_san01", hint: "Ragnarok location." },
  { id: "ra_temple", hint: "Ragnarok location." },
  { id: "rachel", hint: "Ragnarok location." },
  { id: "tha_t05", hint: "Ragnarok location." },
  { id: "treasure01", hint: "Ragnarok location." },
  { id: "tur_dun01", hint: "Ragnarok location." },
  { id: "tur_dun03", hint: "Ragnarok location." },
  { id: "um_fild04", hint: "Ragnarok location." },
  { id: "umbala", hint: "Ragnarok location." },
  { id: "ve_fild07", hint: "Ragnarok location." },
  { id: "yuno", hint: "Ragnarok location." },
  { id: "yuno_fild04", hint: "Ragnarok location." },
  { id: "yuno_fild08", hint: "Ragnarok location." },
  { id: "yuno_fild09", hint: "Ragnarok location." },
].filter(map => !map.id.startsWith("b_") && !map.id.endsWith("_b"));

export default function GeoguesserGame({ mapPool }: GeoguesserGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "correct" | "wrong" | "won">("playing");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Generate 4 options (1 correct + 3 random distractors from the pool)
  const generateOptions = (correctId: string, currentPool: string[]) => {
    const pool = currentPool.length > 0 ? currentPool : ["prt_fild01", "gef_fild01", "pay_fild01", "moc_fild01", "izl_fild01"];
    
    // Get the base name (e.g., 'mjolnir' from 'mjolnir_11' or 'prt' from 'prt_fild01')
    const basePrefix = correctId.split("_")[0];

    const distractors = pool
      .filter(m => m !== correctId && !m.startsWith(basePrefix)) // Filter out same-region maps
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    return [correctId, ...distractors].sort(() => 0.5 - Math.random());
  };

  const startNextRound = (index: number) => {
    setCurrentQuestion(index);
    setOptions(generateOptions(QUIZ_DATA[index].id, mapPool));
    setGameState("playing");
    setSelectedAnswer(null);
  };

  useEffect(() => {
    startNextRound(0);
  }, []);

  // Auto-next logic when correct
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "correct") {
      timer = setTimeout(() => {
        nextQuestion();
      }, 1200); // 1.2 second delay to see the "CORRECT!" feedback
    }
    return () => clearTimeout(timer);
  }, [gameState]);

  const handleAnswer = (answer: string) => {
    if (gameState !== "playing") return;
    
    setSelectedAnswer(answer);
    const correct = answer === QUIZ_DATA[currentQuestion].id;

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      
      if (newStreak >= 10) {
        setGameState("won");
      } else {
        setGameState("correct");
      }
    } else {
      setGameState("wrong");
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    const nextIndex = (currentQuestion + 1) % QUIZ_DATA.length;
    startNextRound(nextIndex);
  };

  const resetGame = () => {
    setStreak(0);
    startNextRound(Math.floor(Math.random() * QUIZ_DATA.length));
  };

  const currentImage = `/images/scout/${QUIZ_DATA[currentQuestion].id}.webp`;

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#1e293b", padding: "6rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Header / Stats */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ padding: "10px", background: "rgba(225, 29, 72, 0.1)", borderRadius: "12px", color: "var(--ro-red)" }}>
              <Globe size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 900, margin: 0, color: "#1e293b" }}>Midgard Scout</h1>
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>Ragnarok Geoguesser Challenge</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Current Streak</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--ro-red)" }}>{streak} / 10</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Best</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#3b82f6" }}>{bestStreak}</div>
            </div>
          </div>
        </div>

      {/* Main Game Area */}
      <div style={{ 
        position: "relative", 
        background: "white", 
        borderRadius: "32px", 
        overflow: "hidden", 
        border: "1px solid #e2e8f0", 
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
      }} className="game-container">
        
        <style jsx>{`
          .game-container {
            flex-direction: column;
          }
          @media (min-width: 768px) {
            .game-container {
              flex-direction: row !important;
              min-height: 500px;
            }
            .image-section {
              width: 55% !important;
            }
            .options-section {
              width: 45% !important;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 3rem !important;
            }
            .option-btn {
              padding: 1.25rem !important;
              font-size: 1rem !important;
            }
          }
        `}</style>
        
        {/* Image Display */}
        <div className="image-section" style={{ 
          position: "relative", 
          width: "100%", 
          aspectRatio: "1 / 1", 
          background: "#f1f5f9",
          overflow: "hidden"
        }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentQuestion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={currentImage}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AnimatePresence>

          {/* Overlay for feedback */}
          <AnimatePresence>
            {gameState !== "playing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: gameState === "correct" ? "rgba(22, 163, 74, 0.7)" : gameState === "won" ? "rgba(234, 179, 8, 0.7)" : "rgba(220, 38, 38, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  backdropFilter: "blur(8px)",
                  padding: "2rem"
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  style={{ textAlign: "center", width: "100%" }}
                >
                  {gameState === "correct" ? (
                    <>
                      <div style={{ background: "white", color: "#16a34a", padding: "1rem 2rem", borderRadius: "20px", fontWeight: 900, fontSize: "1.5rem", marginBottom: "1rem", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>CORRECT!</div>
                      <button onClick={nextQuestion} style={{ background: "white", color: "#0f172a", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", margin: "0 auto" }}>
                        Next Map <ChevronRight size={18} />
                      </button>
                    </>
                  ) : gameState === "won" ? (
                    <div style={{ padding: "2rem", color: "white" }}>
                      <Sparkles size={64} style={{ marginBottom: "1.5rem", margin: "0 auto" }} />
                      <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>LEGENDARY!</h2>
                      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>10-win streak achieved!</p>
                      <button onClick={resetGame} style={{ background: "white", color: "#eab308", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: 900, cursor: "pointer" }}>Play Again</button>
                    </div>
                  ) : (
                    <>
                      <div style={{ background: "white", color: "#dc2626", padding: "1rem 2rem", borderRadius: "20px", fontWeight: 900, fontSize: "1.5rem", marginBottom: "1rem", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>WRONG!</div>
                      <p style={{ marginBottom: "1.5rem", fontWeight: 700, color: "white", fontSize: "1.2rem", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>It was {QUIZ_DATA[currentQuestion].id}</p>
                      <button onClick={resetGame} style={{ background: "white", color: "#0f172a", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", margin: "0 auto" }}>
                        Try Again <RefreshCw size={18} />
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Options Grid */}
        <div className="options-section" style={{ padding: "2rem" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr", 
            gap: "1rem" 
          }}>
            {options.map((option) => (
              <button
                key={option}
                className="option-btn"
                disabled={gameState !== "playing"}
                onClick={() => handleAnswer(option)}
                style={{
                  padding: "1.1rem",
                  borderRadius: "16px",
                  border: "2px solid #e2e8f0",
                  background: selectedAnswer === option 
                    ? (option === QUIZ_DATA[currentQuestion].id ? "#16a34a" : "#dc2626")
                    : "white",
                  color: selectedAnswer === option ? "white" : "#475569",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: gameState === "playing" ? "pointer" : "default",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: selectedAnswer === option ? "none" : "0 1px 3px rgba(0,0,0,0.05)"
                }}
              >
                <MapPin size={18} style={{ opacity: selectedAnswer === option ? 1 : 0.3 }} />
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

        {/* Instructions & SEO */}
        <div style={{ marginTop: "3rem", textAlign: "center", color: "#64748b" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "0.5rem" }}>
            <AlertCircle size={16} />
            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>About Midgard Scout</span>
          </div>
          <p style={{ fontSize: "0.85rem", margin: "0 auto", maxWidth: "800px", lineHeight: "1.6" }}>
            Welcome to the ultimate **Ragnarok Online geoguesser** experience. Midgard Scout is a fan-made interactive challenge 
            designed to test your spatial memory of the world of Midgard. From the hidden paths of Mjolnir to the deepest 
            levels of Glast Heim, our **RO geoguesser** features over 100 high-quality screenshots. 
            Identify locations using their system map names and see if you have what it takes to earn the title of Legendary Scout.
          </p>
        </div>
      </div>
    </main>
  );
}
