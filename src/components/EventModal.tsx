import { motion } from 'framer-motion';
import { X, Calendar, Sparkles, Link, MapPin, Star, ChevronRight, Clock, Users, Music } from 'lucide-react';
import { events } from '../data/events';
import { useState } from 'react';

interface EventModalProps {
  eventName: string;
  seasonName: string;
  seasonNumber: number;
  chapterNumber: number;
  onClose: () => void;
}

function getTimeUntilEvent(eventDate: string): string {
  const now = new Date();
  const event = new Date(eventDate);
  
  if (now > event) {
    return 'Event Completed';
  }
  
  const diffTime = Math.abs(event.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 30) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} away`;
  }
  
  return `${diffDays} day${diffDays > 1 ? 's' : ''} away`;
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm text-white/90 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function EventModal({ eventName, seasonName, chapterNumber, seasonNumber, onClose }: EventModalProps) {
  const normalizedEventName = eventName === "Collision Live Event" ? "Collision" 
    : eventName === "The Device Event" ? "Device Event"
    : eventName === "Galaxy Cup" ? "Galaxy Cup"
    : eventName;
    
  const event = events[normalizedEventName];
  const isSeasonLaunch = event?.type === 'Season Launch';
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const isRemixFinale = eventName === "Remix: The Finale";

  if (!event) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div className="h-screen w-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#0A0A0A]/95 w-full max-w-[1400px] rounded-3xl border border-white/10 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="grid grid-cols-[1fr_1.5fr] h-[850px] relative">
            {/* Full-width background image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, 
                    rgba(0,0,0,0.95) 0%,
                    rgba(0,0,0,0.60) 25%,
                    rgba(0,0,0,0.40) 50%,
                    rgba(0,0,0,0.60) 80%,
                    rgba(0,0,0,0.95) 100%
                  )`
                }}
              />
            </div>

            {/* Left column */}
            <div className="relative z-10">
              <div className="h-full p-10 flex flex-col">
                <button
                  onClick={onClose}
                  className="self-start p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors mb-6"
                >
                  <X className="w-6 h-6 text-white/80" />
                </button>

                <div className="flex flex-col h-[calc(100%-4rem)]">
                  <div className="flex items-center gap-2 mb-3 text-lg">
                    <span className="font-medium text-blue-400">Chapter {chapterNumber}</span>
                    <span className="text-white/40">•</span>
                    <span className="font-medium text-blue-400">Season {seasonNumber}</span>
                  </div>
                  
                  <h1 className="text-6xl font-bold text-white mb-6">{eventName}</h1>

                  <div className="overflow-y-auto custom-scrollbar pr-4">
                    <div className="space-y-6">
                      {Array.isArray(event.description) ? (
                        <div>
                          <p className="text-lg text-white/80 leading-relaxed max-w-xl mb-4">
                            {event.description[0]}
                          </p>
                          
                          <button
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                            className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors mb-4"
                          >
                            <ChevronRight 
                              className={`w-4 h-4 transition-transform ${isDescriptionExpanded ? 'rotate-90' : ''}`}
                            />
                            {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                          </button>

                          {isDescriptionExpanded && (
                            <div className="space-y-4 animate-in slide-in-from-top duration-300">
                              {event.description.slice(1).map((segment, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                      <Music className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-white">{segment.title}</h4>
                                      <p className="text-sm text-white/60">{segment.artist}</p>
                                    </div>
                                  </div>
                                  <p className="text-sm text-white/70 pl-12">
                                    {segment.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                          {event.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-4">
                        <InfoCard
                          icon={<Calendar className="w-5 h-5 text-blue-400" />}
                          label="Event Date"
                          value={new Date(event.date).toLocaleDateString()}
                        />
                        <InfoCard
                          icon={isSeasonLaunch ? 
                            <MapPin className="w-5 h-5 text-purple-400" /> : 
                            <Sparkles className="w-5 h-5 text-green-400" />
                          }
                          label="Event Type"
                          value={event.type}
                        />
                        {event.concurrentPlayers && (
                          <InfoCard
                            icon={<Users className="w-5 h-5 text-pink-400" />}
                            label="Peak Players"
                            value={`${event.concurrentPlayers}M`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="relative z-10 p-10 flex items-end justify-end">
              <a 
                href={event.source}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl transition-all hover:scale-105 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <Link className="w-5 h-5 text-white/60" />
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </div>
                <h4 className="text-lg font-medium text-white mb-1">Learn More</h4>
                <p className="text-sm text-white/60">Read about this event</p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-black/20 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <span className="text-lg text-white">{value}</span>
    </div>
  );
} 