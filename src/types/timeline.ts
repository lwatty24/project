import { Season } from './season';

export interface TimelineEvent {
  date: Date;
  type: 'season_start' | 'live_event' | 'crucial_moment';
  title: string;
  description?: string;
  season: Season;
  image?: string;
  locations?: string[];
  skins?: string[];
} 