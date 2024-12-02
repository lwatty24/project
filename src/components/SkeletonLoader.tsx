import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <div className="relative overflow-hidden bg-white/5 w-full h-full rounded-xl">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      />
    </div>
  );
} 