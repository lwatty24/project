import { Calendar, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventTypeBadgeProps {
  type: string;
}

const EVENT_TYPES = {
  "Season Launch": {
    icon: Calendar,
    gradient: "from-blue-500 to-indigo-600",
    textColor: "text-blue-400"
  },
  "Live Event": {
    icon: Sparkles,
    gradient: "from-green-500 to-emerald-600",
    textColor: "text-green-400"
  },
  "Crucial Moment": {
    icon: Star,
    gradient: "from-yellow-500 to-amber-600",
    textColor: "text-yellow-400"
  }
};

export default function EventTypeBadge({ type }: EventTypeBadgeProps) {
  const eventType = EVENT_TYPES[type] || EVENT_TYPES["Crucial Moment"];
  const Icon = eventType.icon;

  return (
    <motion.div 
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl 
        bg-gradient-to-r ${eventType.gradient}
        border border-white/20
      `}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="w-4 h-4 text-white" />
      <span className="text-sm font-medium text-white">{type}</span>
    </motion.div>
  );
} 