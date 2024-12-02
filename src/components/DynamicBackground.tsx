import { motion, useScroll, useTransform } from 'framer-motion';

export default function DynamicBackground() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgba(10, 10, 10, 1)', 'rgba(15, 15, 15, 1)', 'rgba(10, 10, 10, 1)']
  );
  
  const gradientOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.05, 0.1, 0.05]
  );
  
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      style={{ backgroundColor }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
        style={{ opacity: gradientOpacity }}
      />
    </motion.div>
  );
} 