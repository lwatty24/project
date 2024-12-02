import { motion } from 'framer-motion';

interface ChapterButtonProps {
  chapter: number;
  isActive: boolean;
  onClick: () => void;
}

export default function ChapterButton({ chapter, isActive, onClick }: ChapterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-xl text-sm font-medium
        transition-colors duration-200
        ${isActive 
          ? 'text-white bg-white/10 border border-white/20' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
        }
      `}
    >
      Chapter {chapter}
    </button>
  );
} 