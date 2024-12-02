import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ChapterNavigationProps {
  chapters: (string | number)[];
  activeChapter: string | number;
  onChapterSelect: (chapter: string | number) => void;
}

export default function ChapterNavigation({ chapters, activeChapter, onChapterSelect }: ChapterNavigationProps) {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center gap-4">
          <h2 className="text-white/60 text-sm font-medium">CHAPTER SELECT</h2>
          <div className="flex items-center gap-2">
            {chapters.map((chapter) => (
              <motion.button
                key={chapter}
                onClick={() => onChapterSelect(chapter)}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 hover:bg-white/5
                  ${activeChapter === chapter ? 'text-white' : 'text-white/40'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeChapter === chapter && (
                  <motion.div
                    layoutId="activeChapter"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {chapter === 'OG' ? 'OG' : `Chapter ${chapter}`}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 