import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';
import CountdownDigit from './CountdownDigit';

const NEXT_EVENT_DATE = '2024-11-30T19:00:00Z';
const EVENT_NAME = 'Remix: The Finale';

function getTimeUntilEvent(eventDate: string) {
  const now = new Date();
  const event = new Date(eventDate);
  const diffTime = event.getTime() - now.getTime();
  
  if (diffTime <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

export default function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilEvent(NEXT_EVENT_DATE));
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeUntilEvent(NEXT_EVENT_DATE);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const digitColors = {
    days: 'from-blue-400 to-blue-600',
    hours: 'from-purple-400 to-purple-600',
    minutes: 'from-pink-400 to-pink-600',
    seconds: 'from-red-400 to-red-600',
  };

  if (timeLeft.days === 0 && timeLeft.hours === 0 && 
      timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md"
            >
              <Music2 className="w-5 h-5 text-purple-400" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  {EVENT_NAME}
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium text-purple-400/80 bg-purple-400/10 rounded-full border border-purple-400/20">
                  Live Event
                </span>
              </div>
              <p className="text-sm text-white/40">Don't miss the epic conclusion of Chapter 5 in Remix: The Finale an In-game Event.</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <CountdownDigit value={timeLeft.days} label="Days" color={digitColors.days} />
            <CountdownDigit value={timeLeft.hours} label="Hours" color={digitColors.hours} />
            <CountdownDigit value={timeLeft.minutes} label="Minutes" color={digitColors.minutes} />
            <CountdownDigit value={timeLeft.seconds} label="Seconds" color={digitColors.seconds} />
          </div>
        </div>
      </div>
      
      <div className="relative">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, #4F46E5 50%, rgba(0,0,0,0) 100%)',
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, #EC4899 50%, rgba(0,0,0,0) 100%)',
            backgroundSize: '200% 100%',
            opacity: 0.5
          }}
          animate={{
            backgroundPosition: ['200% 0%', '0% 0%'],
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
} 