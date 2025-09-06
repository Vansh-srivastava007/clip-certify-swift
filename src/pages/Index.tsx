import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CertificationApp } from '@/components/CertificationApp';
import { DemoPage } from '@/components/DemoPage';
import { ProfileDashboard } from '@/components/ProfileDashboard';
import { AIGuide } from '@/components/AIGuide';
import { SportsUpdate } from '@/components/SportsUpdate';
import { Card } from '@/components/ui/card';
import { Play, Trophy, Video, Award, ArrowRight, Zap, Shield, Download, User, Brain, Globe, Home } from 'lucide-react';

type ViewMode = 'landing' | 'app' | 'demo' | 'profile' | 'ai-guide' | 'sports-update';

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Athletic Certification
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Record your athletic performance, get professional feedback, and earn verified certificates 
            to showcase your skills and achievements.
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
              <h3 className="text-xl font-semibold">Easy Recording</h3>
              <p className="text-muted-foreground">
                Simple one-click video recording with up to 30 seconds to showcase your skills
              </p>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="bg-gradient-success p-3 rounded-full w-fit mx-auto">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Instant Analysis</h3>
              <p className="text-muted-foreground">
                Get immediate performance scoring and detailed feedback on your athletic performance
              </p>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="bg-gradient-secondary p-3 rounded-full w-fit mx-auto">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Professional Certificates</h3>
              <p className="text-muted-foreground">
                Download beautifully designed PDF certificates to verify and showcase your achievements
              </p>
            </div>
          </Card>
        </div>

        {/* Main Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card 
            className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300 cursor-pointer"
            onClick={() => setViewMode('profile')}
          >
            <div className="text-center space-y-4">
              <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Profile Dashboard</h3>
              <p className="text-muted-foreground">
                Track your athletic journey, view past certifications, and monitor your progress over time
              </p>
              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                View Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card 
            className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300 cursor-pointer"
            onClick={() => setViewMode('ai-guide')}
          >
            <div className="text-center space-y-4">
              <div className="bg-gradient-success p-3 rounded-full w-fit mx-auto">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">AI Athletic Guide</h3>
              <p className="text-muted-foreground">
                Get personalized training plans, nutrition advice, and performance optimization recommendations
              </p>
              <Button className="w-full bg-gradient-success hover:shadow-glow transition-all duration-300">
                Get AI Guidance
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card 
            className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300 cursor-pointer"
            onClick={() => setViewMode('sports-update')}
          >
            <div className="text-center space-y-4">
              <div className="bg-gradient-secondary p-3 rounded-full w-fit mx-auto">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Sports Updates</h3>
              <p className="text-muted-foreground">
                Discover competitions, join tournaments, and connect with the athletic community
              </p>
              <Button className="w-full bg-gradient-secondary hover:shadow-glow transition-all duration-300">
                View Updates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
    </div>
  );
};

export default Index;