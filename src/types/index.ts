export type Activity = 'Athlete' | 'Footballer' | 'Sprinter' | 'Custom';

export interface Certificate {
  id: string;
  userName: string;
  activity: Activity;
  customActivity?: string;
  score: number;
  date: string;
  videoBlob?: Blob;
}

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  timeRemaining: number;
  videoBlob: Blob | null;
  error: string | null;
}