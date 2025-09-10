import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VideoRecorder } from './VideoRecorder';
import { ActivitySelector } from './ActivitySelector';
import { Activity, Certificate } from '@/types';
import { generateCertificatePDF, generateScore } from '@/utils/pdfGenerator';
import { v4 as uuidv4 } from 'uuid';
import { Download, User, Trophy, CheckCircle, AlertCircle, Zap, Target, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
type Step = 'info' | 'activity' | 'record' | 'complete';
export function CertificationApp() {
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [userName, setUserName] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity>('Athlete');
  const [customActivity, setCustomActivity] = useState('');
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [performanceAnalysis, setPerformanceAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const {
    toast
  } = useToast();
  const canProceedFromInfo = userName.trim().length >= 2;
  const canProceedFromActivity = selectedActivity !== 'Custom' || customActivity.trim().length >= 2;
  const canGenerateCertificate = videoBlob !== null && performanceAnalysis !== null;
  const handleNext = () => {
    switch (currentStep) {
      case 'info':
        if (canProceedFromInfo) {
          setCurrentStep('activity');
        }
        break;
      case 'activity':
        if (canProceedFromActivity) {
          setCurrentStep('record');
        }
        break;
      case 'record':
        if (canGenerateCertificate) {
          generateCertificate();
        }
        break;
    }
  };
  const handleBack = () => {
    switch (currentStep) {
      case 'activity':
        setCurrentStep('info');
        break;
      case 'record':
        setCurrentStep('activity');
        break;
      case 'complete':
        setCurrentStep('record');
        break;
    }
  };
  const generatePerformanceAnalysis = (): PerformanceAnalysis => {
    const baseScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
    
    return {
      overallScore: baseScore,
      speedTiming: {
        score: Math.floor(Math.random() * 30) + 70,
        feedback: baseScore > 80 ? "Excellent timing and rhythm" : "Good pace, focus on consistency"
      },
      bodyMovement: {
        score: Math.floor(Math.random() * 25) + 75,
        feedback: baseScore > 85 ? "Perfect form and coordination" : "Good technique, work on smoothness"
      },
      technique: {
        score: Math.floor(Math.random() * 35) + 65,
        feedback: baseScore > 75 ? "Strong technical execution" : "Solid basics, refine advanced moves"
      },
      areasForImprovement: [
        "Focus on breathing technique during high intensity",
        "Maintain consistent form throughout the movement",
        "Work on explosive power in the initial phase"
      ],
      personalizedTips: [
        `Based on your ${selectedActivity.toLowerCase()} performance, try incorporating interval training`,
        "Your unique movement pattern shows potential for advanced techniques",
        `Personalized recommendation: Focus on ${selectedActivity === 'Sprinter' ? 'start acceleration' : selectedActivity === 'Footballer' ? 'ball control' : 'endurance building'}`
      ]
    };
  };

  const handleVideoReady = async (blob: Blob) => {
    setVideoBlob(blob);
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const analysis = generatePerformanceAnalysis();
      setPerformanceAnalysis(analysis);
      setIsAnalyzing(false);
      
      toast({
        title: "AI Analysis Complete!",
        description: "Your personalized performance report is ready."
      });
    }, 3000);
  };
  const generateCertificate = async () => {
    if (!videoBlob || !userName || !performanceAnalysis) return;
    setIsGenerating(true);
    try {
      const newCertificate: Certificate = {
        id: uuidv4(),
        userName: userName.trim(),
        activity: selectedActivity,
        customActivity: selectedActivity === 'Custom' ? customActivity.trim() : undefined,
        score: performanceAnalysis.overallScore,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        videoBlob
      };
      setCertificate(newCertificate);
      
      // Save to localStorage for profile dashboard
      const existingRecords = JSON.parse(localStorage.getItem('athleteRecords') || '[]');
      const newRecord = {
        id: newCertificate.id,
        activity: newCertificate.customActivity || newCertificate.activity,
        score: newCertificate.score,
        date: newCertificate.date,
        certificate: true
      };
      localStorage.setItem('athleteRecords', JSON.stringify([...existingRecords, newRecord]));
      
      setCurrentStep('complete');
      toast({
        title: "Certificate generated!",
        description: `Your ${selectedActivity} certificate is ready for download.`
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate certificate. Please try again."
      });
    } finally {
      setIsGenerating(false);
    }
  };
  const downloadCertificate = async () => {
    if (!certificate) return;
    try {
      await generateCertificatePDF(certificate);
      toast({
        title: "Certificate downloaded!",
        description: "Your PDF certificate has been saved to your downloads."
      });
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Unable to download certificate. Please try again."
      });
    }
  };
  const resetApp = () => {
    setCurrentStep('info');
    setUserName('');
    setSelectedActivity('Athlete');
    setCustomActivity('');
    setVideoBlob(null);
    setCertificate(null);
    setIsGenerating(false);
  };
  const renderStepIndicator = () => {
    const steps = [{
      id: 'info',
      name: 'Info',
      icon: User
    }, {
      id: 'activity',
      name: 'Activity',
      icon: Trophy
    }, {
      id: 'record',
      name: 'Record',
      icon: VideoRecorder
    }, {
      id: 'complete',
      name: 'Complete',
      icon: CheckCircle
    }];
    return <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
          return <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                  ${isActive ? 'border-primary bg-primary text-primary-foreground shadow-glow' : isCompleted ? 'border-success bg-success text-success-foreground' : 'border-muted-foreground bg-background text-muted-foreground'}
                `}>
                  <span className="text-sm font-semibold">{index + 1}</span>
                </div>
                <span className={`ml-2 text-sm font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && <div className={`mx-4 h-0.5 w-8 transition-colors duration-300 ${isCompleted ? 'bg-success' : 'bg-muted'}`} />}
              </div>;
        })}
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Athletic Certification Platform
          </h1>
          <p className="text-muted-foreground text-lg">
            Record your performance and earn a professional certificate
          </p>
        </div>

        {renderStepIndicator()}

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 'info' && <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="text-center">
                  <User className="mx-auto h-16 w-16 text-primary mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
                  <p className="text-muted-foreground">
                    Enter your name to personalize your certificate
                  </p>
                </div>
                
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <Label htmlFor="userName">Full Name</Label>
                    <Input id="userName" placeholder="Enter your full name" value={userName} onChange={e => setUserName(e.target.value)} className="border-primary/20 focus:border-primary text-lg" />
                  </div>
                  
                  {userName.length > 0 && userName.length < 2 && <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Name must be at least 2 characters long
                      </AlertDescription>
                    </Alert>}
                </div>
              </div>
            </Card>}

          {currentStep === 'activity' && <ActivitySelector selectedActivity={selectedActivity} customActivity={customActivity} onActivityChange={(activity, custom) => {
          setSelectedActivity(activity);
          if (custom !== undefined) {
            setCustomActivity(custom);
          }
        }} />}

          {currentStep === 'record' && <div className="space-y-6">
              <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Record Your Personalized Performance</h2>
                  <p className="text-muted-foreground">
                    Show us your {selectedActivity === 'Custom' ? customActivity : selectedActivity.toLowerCase()} skills - our AI will provide personalized feedback just for you
                  </p>
                </div>
              </Card>
              
              <VideoRecorder onVideoReady={handleVideoReady} disabled={isGenerating || isAnalyzing} />
              
              {isAnalyzing && (
                <Card className="p-6 border-primary/20 bg-gradient-primary/5">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <Zap className="h-8 w-8 text-primary animate-pulse" />
                      <h3 className="text-xl font-semibold">AI Analysis in Progress</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Our AI is analyzing your unique performance patterns...
                    </p>
                    <div className="flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </Card>
              )}
              
              {performanceAnalysis && !isAnalyzing && (
                <Card className="p-6 border-success/20 bg-gradient-success/5">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-success mb-2">Personalized Performance Analysis</h3>
                      <p className="text-muted-foreground">Based on your unique athletic profile</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-card/50 rounded-lg">
                        <Timer className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold">Speed & Timing</h4>
                        <p className="text-2xl font-bold text-primary">{performanceAnalysis.speedTiming.score}/100</p>
                        <p className="text-sm text-muted-foreground mt-1">{performanceAnalysis.speedTiming.feedback}</p>
                      </div>
                      
                      <div className="text-center p-4 bg-card/50 rounded-lg">
                        <Target className="h-8 w-8 text-secondary mx-auto mb-2" />
                        <h4 className="font-semibold">Body Movement</h4>
                        <p className="text-2xl font-bold text-secondary">{performanceAnalysis.bodyMovement.score}/100</p>
                        <p className="text-sm text-muted-foreground mt-1">{performanceAnalysis.bodyMovement.feedback}</p>
                      </div>
                      
                      <div className="text-center p-4 bg-card/50 rounded-lg">
                        <Trophy className="h-8 w-8 text-success mx-auto mb-2" />
                        <h4 className="font-semibold">Technique</h4>
                        <p className="text-2xl font-bold text-success">{performanceAnalysis.technique.score}/100</p>
                        <p className="text-sm text-muted-foreground mt-1">{performanceAnalysis.technique.feedback}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-warning">Areas for Improvement</h4>
                        <ul className="space-y-2">
                          {performanceAnalysis.areasForImprovement.map((area, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-warning">•</span>
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-primary">Personalized Tips for You</h4>
                        <ul className="space-y-2">
                          {performanceAnalysis.personalizedTips.map((tip, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">💡</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>}

          {currentStep === 'complete' && certificate && <Card className="p-8 border-success/20 bg-card/50 backdrop-blur-sm">
              <div className="text-center space-y-6">
                <CheckCircle className="mx-auto h-16 w-16 text-success" />
                <h2 className="text-2xl font-semibold text-success">Certificate Generated!</h2>
                
                <div className="max-w-md mx-auto bg-muted/50 p-6 rounded-lg border border-primary/20">
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-semibold">{certificate.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Activity:</span>
                      <span className="font-semibold">
                        {certificate.customActivity || certificate.activity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Score:</span>
                      <span className="font-semibold text-success">{certificate.score}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-semibold">{certificate.date}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono">{certificate.id.slice(0, 8)}...</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button onClick={downloadCertificate} className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <Download className="mr-2 h-5 w-5" />
                    Download Certificate
                  </Button>
                  
                  <Button onClick={resetApp} variant="outline">
                    Create Another
                  </Button>
                </div>
              </div>
            </Card>}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            onClick={handleBack} 
            disabled={currentStep === 'info'}
            variant="outline"
            className="w-24"
          >
            Back
          </Button>
          
          <Button onClick={handleNext} disabled={currentStep === 'info' && !canProceedFromInfo || currentStep === 'activity' && !canProceedFromActivity || currentStep === 'record' && !canGenerateCertificate || currentStep === 'complete' || isGenerating} className="w-24 bg-gradient-primary hover:shadow-glow transition-all duration-300">
            {isGenerating ? 'Generating...' : currentStep === 'record' ? 'Generate' : 'Next'}
          </Button>
        </div>
      </div>
    </div>;
}