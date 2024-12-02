import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVirtualizer } from '@tanstack/react-virtual';
import TimelineEvent from './TimelineEvent';
import TimelineControls from './TimelineControls';
import ScrollProgress from './ScrollProgress';
import DynamicBackground from './DynamicBackground';
import { events } from '../data/events';

interface TimelineProps {
  seasons: Season[];
  onEventClick: (event: any, type: 'season' | 'event') => void;
  activeChapter: number;
}

export default function Timeline({ seasons, onEventClick, activeChapter }: TimelineProps) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const timelineEvents = useMemo(() => 
    seasons
      .filter(season => season.chapter === activeChapter)
      .flatMap(season => [
        {
          date: new Date(season.startDate),
          type: 'season_start' as const,
          title: season.name,
          description: season.description,
          season,
          image: season.image,
          locations: season.keyLocations,
          skins: season.battlePassSkins
        },
        ...(season.liveEvents?.map(event => {
          const eventData = events[event.title];
          return {
            date: new Date(event.date),
            type: 'live_event' as const,
            title: event.title,
            description: eventData?.description,
            image: eventData?.image || season.image,
            season,
          };
        }) || []),
        ...(season.crucialMoments?.map(event => {
          const eventData = events[event.title];
          return {
            date: new Date(event.date),
            type: 'crucial_moment' as const,
            title: event.title,
            description: eventData?.description,
            image: eventData?.image || season.image,
            season,
          };
        }) || [])
      ])
      .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [seasons, activeChapter]
  );

  const virtualizer = useVirtualizer({
    count: timelineEvents.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 500,
    overscan: 5,
    horizontal: false,
    paddingStart: 120,
    paddingEnd: 120
  });

  return (
    <div className="absolute inset-0">
      <ScrollProgress />
      <DynamicBackground />
      
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto"
        style={{ 
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div
          className="relative w-full"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            transform: `scale(${zoom})`,
            transformOrigin: 'center top'
          }}
        >
          {/* Timeline line with gradient */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20" />
          
          {virtualizer.getVirtualItems().map(virtualRow => {
            const event = timelineEvents[virtualRow.index];
            return (
              <TimelineEvent
                key={`${event.type}-${virtualRow.index}`}
                event={event}
                position={virtualRow.index % 2 === 0 ? 'left' : 'right'}
                onClick={onEventClick}
                style={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: '100%',
                  padding: '0 12vw'
                }}
              />
            );
          })}
        </div>
      </div>

      <TimelineControls
        zoom={zoom}
        onZoomIn={() => setZoom(prev => Math.min(prev + 0.1, 1.5))}
        onZoomOut={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
        className="fixed bottom-8 right-8 z-50"
      />
    </div>
  );
} 