import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export function ViewTransition({ 
  children, 
  activeView, 
  direction 
}: { 
  children: React.ReactNode;
  activeView: string;
  direction: number;
}) {
  return (
    <AnimatePresence custom={direction} mode="popLayout">
      <motion.div
        key={activeView}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 