import { motion } from "motion/react";
import { Hand, FileText, Scissors } from "lucide-react";

type Choice = "rock" | "paper" | "scissors";

interface GameButtonProps {
  choice: Choice;
  onClick: () => void;
  isDisabled: boolean;
}

const choiceConfig = {
  rock: {
    icon: Hand,
    color: "from-red-400 to-red-600",
    hoverColor: "hover:from-red-500 hover:to-red-700",
    label: "Rock",
  },
  paper: {
    icon: FileText,
    color: "from-blue-400 to-blue-600",
    hoverColor: "hover:from-blue-500 hover:to-blue-700",
    label: "Paper",
  },
  scissors: {
    icon: Scissors,
    color: "from-green-400 to-green-600",
    hoverColor: "hover:from-green-500 hover:to-green-700",
    label: "Scissors",
  },
};

export function GameButton({ choice, onClick, isDisabled }: GameButtonProps) {
  const config = choiceConfig[choice];
  const Icon = config.icon;

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      className={`relative flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br ${config.color} ${config.hoverColor} text-white shadow-lg transition-all duration-200 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      whileHover={!isDisabled ? { scale: 1.05, rotate: 2 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="w-16 h-16 md:w-20 md:h-20 mb-2" strokeWidth={2} />
      <span className="font-bold text-lg md:text-xl">{config.label}</span>
    </motion.button>
  );
}
