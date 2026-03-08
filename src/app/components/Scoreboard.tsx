import { motion } from "motion/react";

interface ScoreboardProps {
  playerScore: number;
  computerScore: number;
  draws: number;
}

export function Scoreboard({ playerScore, computerScore, draws }: ScoreboardProps) {
  return (
    <motion.div
      className="flex gap-4 md:gap-8 justify-center items-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Player Score */}
      <div className="flex flex-col items-center bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-4 md:p-6 shadow-lg min-w-[100px] md:min-w-[120px]">
        <div className="text-sm md:text-base font-semibold mb-1">Player</div>
        <motion.div
          className="text-3xl md:text-4xl font-bold"
          key={playerScore}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {playerScore}
        </motion.div>
      </div>

      {/* Draws */}
      <div className="flex flex-col items-center bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-2xl p-4 md:p-6 shadow-lg min-w-[100px] md:min-w-[120px]">
        <div className="text-sm md:text-base font-semibold mb-1">Draws</div>
        <motion.div
          className="text-3xl md:text-4xl font-bold"
          key={draws}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {draws}
        </motion.div>
      </div>

      {/* Computer Score */}
      <div className="flex flex-col items-center bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-2xl p-4 md:p-6 shadow-lg min-w-[100px] md:min-w-[120px]">
        <div className="text-sm md:text-base font-semibold mb-1">Computer</div>
        <motion.div
          className="text-3xl md:text-4xl font-bold"
          key={computerScore}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {computerScore}
        </motion.div>
      </div>
    </motion.div>
  );
}
