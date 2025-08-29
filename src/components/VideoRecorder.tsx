import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, Square, Camera, AlertCircle, CheckCircle } from 'lucide-react';
import { RecordingState } from '@/types';

interface VideoRecorderProps {
  onVideoReady: (blob: Blob) => void;
  disabled?: boolean;
}

const MAX_DURATION = 30; // 30 seconds

export function VideoRecorder({ onVideoReady, disabled }: VideoRecorderProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    timeRemaining: MAX_DURATION,
    videoBlob: null,
    error: null
  });
  
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingState(prev => {
        const newTime = prev.timeRemaining - 1;
        if (newTime <= 0) {
          stopRecording();
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: newTime };
      });
    }, 1000);
  };

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      setHasPermission(true);
      setRecordingState(prev => ({ ...prev, error: null }));
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      return stream;
    } catch (error) {
      console.error('Permission denied:', error);
      setHasPermission(false);
      setRecordingState(prev => ({
        ...prev,
        error: 'Camera permission denied. Please allow access and try again.'
      }));
      throw error;
    }
  };

  const startRecording = async () => {
    try {
      let stream = streamRef.current;
      
      if (!stream) {
        stream = await requestPermission();
      }

      if (!stream) return;

      chunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordingState(prev => ({ ...prev, videoBlob: blob }));
        onVideoReady(blob);
        
        // Create preview
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        const newPreviewUrl = URL.createObjectURL(blob);
        setPreviewUrl(newPreviewUrl);
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setRecordingState(prev => ({
        ...prev,
        isRecording: true,
        timeRemaining: MAX_DURATION,
        error: null
      }));
      
      startTimer();
    } catch (error) {
      console.error('Failed to start recording:', error);
      setRecordingState(prev => ({
        ...prev,
        error: 'Failed to start recording. Please check your camera and try again.'
      }));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setRecordingState(prev => ({
      ...prev,
      isRecording: false,
      isPaused: false
    }));
  };

  const resetRecording = () => {
    stopRecording();
    setRecordingState({
      isRecording: false,
      isPaused: false,
      timeRemaining: MAX_DURATION,
      videoBlob: null,
      error: null
    });
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    
    chunksRef.current = [];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasPermission === null) {
    return (
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="text-center space-y-4">
          <Camera className="mx-auto h-16 w-16 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Camera Access Required</h3>
            <p className="text-muted-foreground mb-4">
              We need access to your camera to record your performance
            </p>
            <Button 
              onClick={requestPermission}
              disabled={disabled}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Enable Camera
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (hasPermission === false) {
    return (
      <Card className="p-6 border-destructive/20 bg-card/50 backdrop-blur-sm">
        <Alert className="border-destructive/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Camera access denied. Please refresh the page and allow camera access to continue.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Video Preview */}
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          {!previewUrl ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={previewUrl}
              controls
              className="w-full h-full object-cover"
            />
          )}
          
          {recordingState.isRecording && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full">
              <div className="w-3 h-3 bg-current rounded-full animate-pulse" />
              <span className="text-sm font-mono">REC</span>
            </div>
          )}
          
          {recordingState.isRecording && (
            <div className="absolute bottom-4 left-4 bg-background/90 text-foreground px-3 py-1 rounded-full">
              <span className="text-sm font-mono">
                {formatTime(recordingState.timeRemaining)}
              </span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!recordingState.videoBlob ? (
            <>
              {!recordingState.isRecording ? (
                <Button
                  onClick={startRecording}
                  disabled={disabled}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  size="lg"
                  variant="destructive"
                  className="animate-pulse-glow"
                >
                  <Square className="mr-2 h-5 w-5" />
                  Stop Recording
                </Button>
              )}
            </>
          ) : (
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle className="h-5 w-5" />
                <span>Recording Complete!</span>
              </div>
              <Button
                onClick={resetRecording}
                variant="outline"
                disabled={disabled}
              >
                Record Again
              </Button>
            </div>
          )}
        </div>

        {/* Error Display */}
        {recordingState.error && (
          <Alert className="border-destructive/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{recordingState.error}</AlertDescription>
          </Alert>
        )}

        {/* Instructions */}
        {!recordingState.isRecording && !recordingState.videoBlob && (
          <div className="text-center text-muted-foreground text-sm">
            <p>Record up to 30 seconds of your athletic performance</p>
            <p>Make sure you're in good lighting and the camera can see you clearly</p>
          </div>
        )}
      </div>
    </Card>
  );
}