import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CertificationApp } from '@/components/CertificationApp';
import { DemoPage } from '@/components/DemoPage';
import { ProfileDashboard } from '@/components/ProfileDashboard';
import { AIGuide } from '@/components/AIGuide';
import { SportsUpdate } from '@/components/SportsUpdate';
import { Challenges } from '@/components/Challenges';
import { Navbar } from '@/components/Navbar';
import { VideoUpload } from '@/components/VideoUpload';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Trophy, Video, Award, ArrowRight, Zap, Shield, Home } from 'lucide-react';

type ViewMode = 'landing' | 'app' | 'demo' | 'profile' | 'ai-guide' | 'sports-update' | 'challenges' | 'video-upload';

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  if (viewMode === 'app') {
    return <CertificationApp />;
  }

  if (viewMode === 'demo') {
    return <DemoPage onBack={() => setViewMode('landing')} />;
  }

  if (viewMode === 'profile') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => setViewMode('landing')} 
              variant="outline"
              size="sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <ProfileDashboard />
        </div>
      </div>
    );
  }

  if (viewMode === 'ai-guide') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => setViewMode('landing')} 
              variant="outline"
              size="sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <AIGuide />
        </div>
      </div>
    );
  }

  if (viewMode === 'sports-update') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => setViewMode('landing')} 
              variant="outline"
              size="sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <SportsUpdate />
        </div>
      </div>
    );
  }

  if (viewMode === 'challenges') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => setViewMode('landing')} 
              variant="outline"
              size="sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <Challenges />
        </div>
      </div>
    );
  }

  if (viewMode === 'video-upload') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => setViewMode('landing')} 
              variant="outline"
              size="sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <VideoUpload />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onProfileClick={() => setViewMode('profile')}
        onAIGuideClick={() => setViewMode('ai-guide')}
        onSportsUpdateClick={() => setViewMode('sports-update')}
        onChallengesClick={() => setViewMode('challenges')}
        onVideoUploadClick={() => setViewMode('video-upload')}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Coach
            </h1>
          </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get personalized AI coaching tailored specifically to your unique athletic journey. 
              Record, analyze, and earn certificates designed just for you.
            </p>
          
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={() => setViewMode('app')} 
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Video className="mr-2 h-5 w-5" />
              Start Recording
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setViewMode('demo')} 
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto">
                <Video className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Personalized Recording</h3>
              <p className="text-muted-foreground">
                Record your unique performance with detailed AI analysis tailored to your specific athletic profile
              </p>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="bg-gradient-success p-3 rounded-full w-fit mx-auto">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Your Personal AI Coach</h3>
              <p className="text-muted-foreground">
                Get personalized feedback on speed, timing, body movement, and technique - all customized for you
              </p>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="bg-gradient-secondary p-3 rounded-full w-fit mx-auto">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Government Certified Awards</h3>
              <p className="text-muted-foreground">
                Earn official Government of India certified certificates upon successful challenge completion
              </p>
            </div>
          </Card>
        </div>


        {/* CTA Section */}
        <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm text-center">
          <div className="space-y-4">
            <Shield className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-2xl font-semibold">Ready to Get Certified?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of athletes who have already earned their certifications. 
              Start your journey today and get recognized for your athletic excellence.
            </p>
            <Button 
              onClick={() => setViewMode('app')} 
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-primary/20 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Coach
                </h3>
              </div>
              <p className="text-muted-foreground">
                Personalized AI-powered athletic coaching and certification platform designed specifically for you.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Personalized Performance Analysis</li>
                <li>• Custom Training Programs</li>
                <li>• Government Certified Awards</li>
                <li>• Video Upload & Review</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Challenge Levels</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>🟢 Beginner Programs</li>
                <li>🟡 Intermediate Training</li>
                <li>🔴 Advanced Mastery</li>
                <li>🏆 Expert Certification</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Personalized for You</h4>
              <p className="text-muted-foreground">
                Our AI adapts to your unique style, tracks your progress, and provides tailored feedback just for you.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-primary/50 text-primary">Your Journey</Badge>
                <Badge variant="outline" className="border-success/50 text-success">Your Goals</Badge>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AI Coach. Certified by Government of India. Personalized athletic excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;