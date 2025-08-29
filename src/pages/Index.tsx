import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CertificationApp } from '@/components/CertificationApp';
import { DemoPage } from '@/components/DemoPage';
import { Card } from '@/components/ui/card';
import { Play, Trophy, Video, Award, ArrowRight, Zap, Shield, Download } from 'lucide-react';

type ViewMode = 'landing' | 'app' | 'demo';

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  if (viewMode === 'app') {
    return <CertificationApp />;
  }

  if (viewMode === 'demo') {
    return <DemoPage onBack={() => setViewMode('landing')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Athletic
              </span>
              <br />
              <span className="text-foreground">Certification</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Record your performance, showcase your skills, and earn professional certificates 
              for your athletic achievements
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => setViewMode('app')}
              className="text-lg px-8 py-6 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Trophy className="mr-2 h-6 w-6" />
              Start Recording
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setViewMode('demo')}
              className="text-lg px-8 py-6 border-primary/20 hover:border-primary/50 hover:shadow-card transition-all duration-300"
            >
              <Play className="mr-2 h-6 w-6" />
              View Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Recording</h3>
              <p className="text-muted-foreground">
                Record up to 30 seconds of your performance using your device's camera. 
                No special equipment needed.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
              <div className="bg-gradient-secondary p-3 rounded-lg w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Analysis</h3>
              <p className="text-muted-foreground">
                Get immediate performance scores and feedback on your athletic skills 
                and techniques.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
              <div className="bg-gradient-success p-3 rounded-lg w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Certificates</h3>
              <p className="text-muted-foreground">
                Download beautifully designed PDF certificates to showcase your 
                athletic achievements.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-gradient-primary p-4 rounded-full">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">1. Choose Your Activity</h3>
                <p className="text-muted-foreground">
                  Select from pre-defined sports like Football, Sprinting, or create a custom activity 
                  that matches your athletic discipline.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-gradient-secondary p-4 rounded-full">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">2. Record Your Performance</h3>
                <p className="text-muted-foreground">
                  Use your device's camera to record up to 30 seconds of your athletic performance. 
                  Make sure you're in good lighting and clearly visible.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-gradient-success p-4 rounded-full">
                <Download className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">3. Get Your Certificate</h3>
                <p className="text-muted-foreground">
                  Receive an instant performance score and download your professional PDF certificate 
                  with your achievements and credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="bg-success/20 p-3 rounded-full">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
                <p className="text-muted-foreground mb-4">
                  Your recordings are processed locally in your browser and are not uploaded to any servers 
                  by default. All certificate generation happens client-side for maximum privacy and security.
                </p>
                <p className="text-sm text-muted-foreground">
                  When connected to Supabase, you have full control over what data is stored and can 
                  enable features like user accounts and progress tracking.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Certified?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start recording your athletic performance and earn your first certificate today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setViewMode('app')}
              className="text-lg px-8 py-6 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Trophy className="mr-2 h-6 w-6" />
              Get Started Now
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setViewMode('demo')}
              className="text-lg px-8 py-6 border-primary/20 hover:border-primary/50 hover:shadow-card transition-all duration-300"
            >
              <Play className="mr-2 h-6 w-6" />
              Watch Demo First
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;