export interface Song {
  name: string;
  artist: string;
  url?: string;
}

export interface AIResponse {
  response: string;
  songs: Song[];
}

export interface Job {
  id: string;
  content: string;
  mood: string;
  aiResponse: string;
  songs?: Array<{
    name: string;
    artist: string;
  }>;
  createdAt: Date;
  isPrivate: boolean;
  isMoodHidden: boolean;
} 