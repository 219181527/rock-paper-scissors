import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RotateCcw, Play } from "lucide-react";
import { GameButton } from "./components/GameButton";
import { Scoreboard } from "./components/Scoreboard";
import { ChoiceDisplay } from "./components/ChoiceDisplay";
import { ResultMessage } from "./components/ResultMessage";

type Choice = "rock" | "paper" | "scissors";
type GameResult = "win" | "lose" | "draw" | null;

export default function App() {
  // Game state
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResult>(null);
  const [resultMessage, setResultMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Score tracking
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [draws, setDraws] = useState(0);

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);

  // Sound effects using Web Audio API
  const playSound = (frequency: number, duration: number) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio is not supported
      console.log("Audio not supported");
    }
  };

  // Determine winner based on Rock Paper Scissors rules
  const determineWinner = (player: Choice, computer: Choice): GameResult => {
    if (player === computer) return "draw";
    
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "win";
    }
    
    return "lose";
  };

  // Handle player choice
  const handlePlayerChoice = (choice: Choice) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);
    setResultMessage("");
    setShowCelebration(false);

    // Play selection sound
    playSound(400, 0.1);

    // Animate computer thinking (shake animation)
    setTimeout(() => {
      const choices: Choice[] = ["rock", "paper", "scissors"];
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(randomChoice);

      // Determine result
      const gameResult = determineWinner(choice, randomChoice);
      setResult(gameResult);

      // Update scores
      if (gameResult === "win") {
        setPlayerScore((prev) => prev + 1);
        setResultMessage("You Win!");
        setShowCelebration(true);
        playSound(800, 0.3); // Victory sound
      } else if (gameResult === "lose") {
        setComputerScore((prev) => prev + 1);
        setResultMessage("Computer Wins!");
        playSound(200, 0.3); // Defeat sound
      } else {
        setDraws((prev) => prev + 1);
        setResultMessage("It's a Draw!");
        playSound(500, 0.2); // Draw sound
      }

      setIsAnimating(false);
    }, 1500); // 1.5 second delay for computer reveal
  };

  // Reset the game
  const handleReset = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setDraws(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setResultMessage("");
    setShowCelebration(false);
    playSound(600, 0.15);
  };

  // Play again (reset current round)
  const handlePlayAgain = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setResultMessage("");
    setShowCelebration(false);
    playSound(600, 0.15);
  };

  // Celebration confetti effect
  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Celebration confetti */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: "linear",
              }}
            >
              {["🎉", "⭐", "✨", "🎊", "🏆"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Main game container */}
      <div className="w-full max-w-4xl">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Rock Paper Scissors
        </motion.h1>

        {/* Scoreboard */}
        <Scoreboard 
          playerScore={playerScore} 
          computerScore={computerScore} 
          draws={draws} 
        />

        {/* Result message */}
        {result && (
          <div className="flex justify-center mb-6">
            <ResultMessage message={resultMessage} type={result} />
          </div>
        )}

        {/* Choice displays */}
        {(playerChoice || computerChoice) && (
          <motion.div
            className="flex justify-around items-center mb-8 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ChoiceDisplay
              choice={playerChoice}
              label="Your Choice"
              isWinner={result === "win"}
            />
            
            <div className="text-4xl md:text-5xl font-bold text-gray-400">VS</div>
            
            <ChoiceDisplay
              choice={computerChoice}
              label="Computer"
              isShaking={!computerChoice}
              isWinner={result === "lose"}
            />
          </motion.div>
        )}

        {/* Game buttons */}
        <div className="flex justify-center gap-4 md:gap-8 mb-8">
          <GameButton
            choice="rock"
            onClick={() => handlePlayerChoice("rock")}
            isDisabled={isAnimating}
          />
          <GameButton
            choice="paper"
            onClick={() => handlePlayerChoice("paper")}
            isDisabled={isAnimating}
          />
          <GameButton
            choice="scissors"
            onClick={() => handlePlayerChoice("scissors")}
            isDisabled={isAnimating}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {result && (
            <motion.button
              onClick={handlePlayAgain}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              Play Again
            </motion.button>
          )}
          
          <motion.button
            onClick={handleReset}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            Reset Scores
          </motion.button>
        </div>

        {/* Instructions */}
        {!playerChoice && (
          <motion.div
            className="text-center mt-8 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg md:text-xl font-semibold">
              Choose your weapon to start the battle! ⚔️
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
