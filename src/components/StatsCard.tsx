import { LucideIcon } from 'lucide-react';
import EventsDisplay from './EventsDisplay';
import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  secondaryValue?: number;
}

export default function StatsCard({ icon: Icon, value, label, secondaryValue }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md p-6"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">{value}</span>
            {secondaryValue && (
              <>
                <span className="text-white/40">+</span>
                <span className="text-2xl font-bold text-white/60">{secondaryValue}</span>
              </>
            )}
          </div>
          <span className="text-sm text-white/40">{label}</span>
        </div>
      </div>
      
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
  );
} 