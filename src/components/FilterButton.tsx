import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export interface FilterOptions {
  chapters: number[];
  hasEvents: boolean;
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

interface FilterButtonProps {
  options: FilterOptions;
  onChange: (options: FilterOptions) => void;
  availableChapters: number[];
}

export default function FilterButton({ options, onChange, availableChapters }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChapter = (chapter: number) => {
    const newChapters = options.chapters.includes(chapter)
      ? options.chapters.filter(c => c !== chapter)
      : [...options.chapters, chapter];
    onChange({ ...options, chapters: newChapters });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      >
        <Filter className="w-5 h-5 text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-2 top-[72px] w-80 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Filters</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Chapters</h4>
                    <div className="flex flex-wrap gap-2">
                      {availableChapters.map(chapter => (
                        <button
                          key={chapter}
                          onClick={() => toggleChapter(chapter)}
                          className={`px-3 py-1.5 rounded-lg border transition-colors ${
                            options.chapters.includes(chapter)
                              ? 'bg-white/10 border-white/20 text-white'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          Ch. {chapter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Events</h4>
                    <button
                      onClick={() => onChange({ ...options, hasEvents: !options.hasEvents })}
                      className={`px-3 py-1.5 rounded-lg border transition-colors ${
                        options.hasEvents
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      Has Live Events
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 