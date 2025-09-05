import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CertificationApp } from '@/components/CertificationApp';
import { DemoPage } from '@/components/DemoPage';
import { Card } from '@/components/ui/card';
import { Play, Trophy, Video, Award, ArrowRight, Zap, Shield, Download } from 'lucide-react';

console.log('Index component loading...');

type ViewMode = 'landing' | 'app' | 'demo';

const Index = () => {
  console.log('Index component rendering...');
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  console.log('Current viewMode:', viewMode);

  try {
    if (viewMode === 'app') {
      console.log('Rendering CertificationApp...');
      return <CertificationApp />;
    }

    if (viewMode === 'demo') {
      console.log('Rendering DemoPage...');
      return <DemoPage onBack={() => setViewMode('landing')} />;
    }

    console.log('Rendering landing page...');
    
    return (
      <div className="min-h-screen bg-background">
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Athletic Certification</h1>
          <p className="text-muted-foreground mb-8">Test page is working!</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setViewMode('app')}>
              Start Recording
            </Button>
            <Button variant="outline" onClick={() => setViewMode('demo')}>
              View Demo
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Index component:', error);
    return <div>Error loading page: {String(error)}</div>;
  }
};

export default Index;