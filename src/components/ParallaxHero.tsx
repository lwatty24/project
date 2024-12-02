import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxHero({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  
  return (
    <motion.div 
      ref={ref}
      style={{ y, opacity }}
      className="relative h-[calc(100vh-96px)] min-h-[600px]"
    >
      {children}
    </motion.div>
  );
} 