import { motion } from "motion/react";
import { Hand, FileText, Scissors, HelpCircle } from "lucide-react";

type Choice = "rock" | "paper" | "scissors" | null;

interface ChoiceDisplayProps {
  choice: Choice;
  label: string;
  isShaking?: boolean;
  isWinner?: boolean;
}

const choiceConfig = {
  rock: {
    icon: Hand,
    color: "from-red-400 to-red-600",
    name: "Rock",
  },
  paper: {
    icon: FileText,
    color: "from-blue-400 to-blue-600",
    name: "Paper",
  },
  scissors: {
    icon: Scissors,
    color: "from-green-400 to-green-600",
    name: "Scissors",
  },
};

export function ChoiceDisplay({ choice, label, isShaking, isWinner }: ChoiceDisplayProps) {
  const config = choice ? choiceConfig[choice] : null;
  const Icon = config?.icon || HelpCircle;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-700">{label}</h3>
      <motion.div
        className={`flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br ${
          config?.color || "from-gray-300 to-gray-400"
        } text-white shadow-lg`}
        animate={
          isShaking
            ? {
                rotate: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5, repeat: Infinity },
              }
            : isWinner
            ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, repeat: Infinity },
              }
            : {}
        }
      >
        <Icon className="w-14 h-14 md:w-20 md:h-20" strokeWidth={2} />
      </motion.div>
      {config && (
        <p className="mt-3 text-lg md:text-xl font-semibold text-gray-600">{config.name}</p>
      )}
    </div>
  );
}
