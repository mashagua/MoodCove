export type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export type Job = {
  id: string;
  content: string;
  mood: string;
  aiResponse: string;
  createdAt: Date;
  isPrivate: boolean;
}; 