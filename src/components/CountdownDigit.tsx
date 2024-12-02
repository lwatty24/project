import { motion } from 'framer-motion';

interface CountdownDigitProps {
  value: number;
  label: string;
  color: string;
}

export default function CountdownDigit({ value, label, color }: CountdownDigitProps) {
  const formattedValue = value.toString().padStart(2, '0');
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          className={`px-6 py-4 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-xl
            ${value <= 5 ? 'animate-pulse' : ''}`}
        >
          <div 
            className={`text-5xl font-black tabular-nums bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          >
            {formattedValue}
          </div>
          
          {/* Reflection effect */}
          <div 
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-white/[0.02]"
          />
          
          {/* Shine animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </motion.div>
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/40">{label}</div>
    </div>
  );
} 