export interface AIResponse {
  response: string;
  songs: Array<{
    name: string;
    artist: string;
  }>;
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