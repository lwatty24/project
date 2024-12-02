import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Sparkles, Star, ChevronRight } from 'lucide-react';
import { Season } from '../types/season';
import { memo, useState } from 'react';
import { TimelineEvent as ITimelineEvent } from '../types/timeline';
import { events } from '../data/events';
import EventTypeBadge from './EventTypeBadge';

interface TimelineEventProps {
  event: ITimelineEvent;
  position: 'left' | 'right';
  onClick: (event: ITimelineEvent, type: 'season' | 'event') => void;
  style?: React.CSSProperties;
}

// Get the event type from events.ts if it exists
const getEventType = (event: ITimelineEvent) => {
  if (event.type === 'season_start') return "Season Launch";
  
  const eventData = events[event.title];
  if (eventData) {
    return eventData.type;
  }
  
  // Fallback mapping for internal types
  return {
    'live_event': "Live Event",
    'crucial_moment': "Mini Event"
  }[event.type] || "Mini Event";
};

export default memo(function TimelineEvent({ event, position, onClick, style }: TimelineEventProps) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const displayType = getEventType(event);

  const handleClick = () => {
    if (event.type === 'season_start') {
      onClick(event, 'season');
    } else {
      onClick(event, 'event');
    }
  };

  const eventStyles = {
    'season_start': { 
      icon: Calendar, 
      color: 'blue',
      badge: 'Season Launch',
      gradient: 'from-blue-500 to-blue-600'
    },
    'live_event': { 
      icon: Sparkles, 
      color: 'green',
      badge: 'Live Event',
      gradient: 'from-green-500 to-emerald-600'
    },
    'crucial_moment': { 
      icon: Star, 
      color: 'yellow',
      badge: 'Crucial Moment',
      gradient: 'from-yellow-500 to-amber-600'
    }
  }[event.type];

  const Icon = eventStyles.icon;

  return (
    <div className="group relative" style={style}>
      <motion.div 
        className={`
          w-[calc(50%-160px)] 
          ${position === 'right' ? 'ml-[calc(50%+160px)]' : ''} 
          mb-24
        `}
        initial={{ opacity: 0, x: position === 'right' ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          onClick={handleClick}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="relative overflow-hidden rounded-3xl bg-black/40 hover:bg-black/60 transition-all cursor-pointer border border-white/10 backdrop-blur-xl"
          whileHover={{ scale: 1.02 }}
        >
          {/* Event content implementation */}
          <div className="relative h-48 overflow-hidden">
            {event.image && (
              <>
                <motion.div
                  className="absolute inset-0 bg-white/5"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: imageLoaded ? 0 : 1 }}
                />
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  animate={{ scale: hovered ? 1.05 : 1 }}
                  transition={{ duration: 0.4 }}
                />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="absolute top-4 right-4">
              <EventTypeBadge type={displayType} />
            </div>
          </div>

          <motion.div 
            className="p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.05]
              hover:bg-white/[0.04] transition-colors group"
          >
            <div className="flex items-center gap-2 text-sm mb-3">
              <Icon className={`w-4 h-4 text-${eventStyles.color}-400`} />
              <span className="text-white/60">
                {event.date.toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
            
            {event.description && (
              <p className="text-white/70 text-sm line-clamp-2 mb-4">
                {Array.isArray(event.description) ? event.description[0] : event.description}
              </p>
            )}

            {event.type === 'season_start' && (
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  {event.locations && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-white/60">{event.locations.length}</span>
                    </div>
                  )}
                  {event.skins && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                      <Users className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-white/60">{event.skins.length}</span>
                    </div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-white/40 transform group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        whileHover={{ scale: 1.2 }}
      >
        <motion.div 
          className={`w-4 h-4 rounded-full bg-gradient-to-r ${eventStyles.gradient} relative`}
        >
          <motion.div
            className={`absolute -inset-8 rounded-full opacity-20 bg-gradient-to-r ${eventStyles.gradient} blur-xl`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.1, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.event.title === nextProps.event.title &&
         prevProps.position === nextProps.position;
});
