import { useState } from 'react';
import { Season } from '../types/season';
import Timeline from './Timeline';
import ChapterNavigation from './ChapterNavigation';
import EventModal from './EventModal';

interface TimelineViewProps {
  seasons: Season[];
  onSeasonClick: (season: Season) => void;
}

export default function TimelineView({ seasons, onSeasonClick }: TimelineViewProps) {
  const [activeChapter, setActiveChapter] = useState(seasons[0].chapter);
  const [modalState, setModalState] = useState<{
    type: 'season' | 'event';
    eventName: string;
    season: Season;
  } | null>(null);

  const handleEventClick = (event: any, type: 'season' | 'event') => {
    if (type === 'season') {
      onSeasonClick(event.season);
    } else {
      setModalState({ type: 'event', eventName: event.title, season: event.season });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A] relative overflow-hidden">
      <div className="sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-8">
          <ChapterNavigation
            chapters={[...new Set(seasons.map(s => s.chapter))].sort((a, b) => b - a)}
            activeChapter={activeChapter}
            onChapterSelect={setActiveChapter}
          />
        </div>
      </div>

      <div className="flex-1 relative">
        <Timeline
          seasons={seasons}
          onEventClick={handleEventClick}
          activeChapter={activeChapter}
        />
      </div>

      {modalState && (
        <EventModal
          eventName={modalState.eventName}
          seasonName={modalState.season.name}
          seasonNumber={modalState.season.number}
          chapterNumber={modalState.season.chapter}
          onClose={() => setModalState(null)}
        />
      )}
    </div>
  );
}
