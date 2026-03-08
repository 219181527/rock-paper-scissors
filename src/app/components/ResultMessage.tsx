import { motion } from "motion/react";

interface ResultMessageProps {
  message: string;
  type: "win" | "lose" | "draw" | null;
}

export function ResultMessage({ message, type }: ResultMessageProps) {
  if (!type) return null;

  const bgColor =
    type === "win"
      ? "from-green-400 to-green-600"
      : type === "lose"
      ? "from-red-400 to-red-600"
      : "from-gray-400 to-gray-600";

  const emoji = type === "win" ? "🎉" : type === "lose" ? "😢" : "🤝";

  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className={`bg-gradient-to-r ${bgColor} text-white px-8 py-4 rounded-full shadow-xl mb-6`}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        {emoji} {message} {emoji}
      </h2>
    </motion.div>
  );
}
