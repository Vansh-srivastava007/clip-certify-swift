import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Upload, Play, Zap, Target, Timer, Trophy, AlertCircle, CheckCircle } from 'lucide-react';

interface PerformanceAnalysis {
  overallScore: number;
  speedTiming: {
    score: number;
    feedback: string;
  };
  bodyMovement: {
    score: number;
    feedback: string;
  };
  technique: {
    score: number;
    feedback: string;
  };
  areasForImprovement: string[];
  personalizedTips: string[];
}

export const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateAnalysis = (): PerformanceAnalysis => {
    const baseScore = Math.floor(Math.random() * 40) + 60;
    
    return {
      overallScore: baseScore,
      speedTiming: {
        score: Math.floor(Math.random() * 30) + 70,
        feedback: baseScore > 80 ? "Excellent timing and explosive power" : "Good rhythm, work on acceleration"
      },
      bodyMovement: {
        score: Math.floor(Math.random() * 25) + 75,
        feedback: baseScore > 85 ? "Exceptional form and coordination" : "Solid technique, focus on fluidity"
      },
      technique: {
        score: Math.floor(Math.random() * 35) + 65,
        feedback: baseScore > 75 ? "Outstanding technical execution" : "Good foundation, refine precision"
      },
      areasForImprovement: [
        "Enhance core stability during peak performance",
        "Optimize breathing patterns for sustained effort",
        "Improve consistency across repetitions"
      ],
      personalizedTips: [
        "Based on your movement analysis, focus on plyometric exercises",
        "Your unique biomechanics suggest strength training emphasis",
        "Personalized drill recommendation: Practice with varied intensity levels"
      ]
    };
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select a video file."
      });
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select a video file smaller than 100MB."
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    
    setAnalysis(null);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const result = generateAnalysis();
      setAnalysis(result);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: "Your personalized performance analysis is ready."
      });
    }, 4000);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setAnalysis(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Upload className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Video Analysis
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Upload your athletic performance video for personalized AI analysis and detailed feedback tailored just for you.
        </p>
      </div>

      {!selectedFile && (
        <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-12">
              <Upload className="mx-auto h-16 w-16 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Your Performance Video</h3>
              <p className="text-muted-foreground mb-4">
                Select a video file to get personalized AI analysis
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Choose Video File
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="text-center">
                <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
                <p>Supports all video formats</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
                <p>Max file size: 100MB</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
                <p>Instant AI analysis</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {selectedFile && !analysis && (
        <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Selected Video</h3>
                <p className="text-muted-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <Button onClick={resetUpload} variant="outline">
                Change Video
              </Button>
            </div>

            {previewUrl && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  src={previewUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="text-center">
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="mr-2 h-5 w-5 animate-pulse" />
                    Analyzing Your Performance...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Analyze My Performance
                  </>
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <Card className="p-6 border-primary/20 bg-gradient-primary/5">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Zap className="h-8 w-8 text-primary animate-pulse" />
                    <h3 className="text-xl font-semibold">AI Analysis in Progress</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our AI is analyzing your unique movement patterns and performance metrics...
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      )}

      {analysis && (
        <div className="space-y-6">
          <Card className="p-6 border-success/20 bg-gradient-success/5">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-success mb-2">Your Personalized Performance Report</h3>
                <p className="text-muted-foreground">AI analysis tailored specifically to your athletic profile</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{analysis.overallScore}</span>
                  <span className="text-xl text-muted-foreground">/100</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-card/50 rounded-lg border border-primary/20">
                  <Timer className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">Speed & Timing</h4>
                  <p className="text-3xl font-bold text-primary mb-2">{analysis.speedTiming.score}/100</p>
                  <p className="text-sm text-muted-foreground">{analysis.speedTiming.feedback}</p>
                </div>
                
                <div className="text-center p-6 bg-card/50 rounded-lg border border-secondary/20">
                  <Target className="h-10 w-10 text-secondary mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">Body Movement</h4>
                  <p className="text-3xl font-bold text-secondary mb-2">{analysis.bodyMovement.score}/100</p>
                  <p className="text-sm text-muted-foreground">{analysis.bodyMovement.feedback}</p>
                </div>
                
                <div className="text-center p-6 bg-card/50 rounded-lg border border-success/20">
                  <Trophy className="h-10 w-10 text-success mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">Technique</h4>
                  <p className="text-3xl font-bold text-success mb-2">{analysis.technique.score}/100</p>
                  <p className="text-sm text-muted-foreground">{analysis.technique.feedback}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-warning/20">
                  <h4 className="font-semibold text-lg text-warning mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-3">
                    {analysis.areasForImprovement.map((area, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-3">
                        <span className="text-warning font-bold">•</span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </Card>
                
                <Card className="p-6 border-primary/20">
                  <h4 className="font-semibold text-lg text-primary mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Personalized Tips for You
                  </h4>
                  <ul className="space-y-3">
                    {analysis.personalizedTips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-3">
                        <span className="text-primary">💡</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button 
              onClick={resetUpload}
              size="lg"
              variant="outline"
            >
              Analyze Another Video
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};