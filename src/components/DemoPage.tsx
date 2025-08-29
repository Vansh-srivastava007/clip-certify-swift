import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Download, ArrowLeft, Trophy, Users, Zap } from 'lucide-react';
import { generateCertificatePDF, generateScore } from '@/utils/pdfGenerator';
import { Certificate } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface DemoVideo {
  id: string;
  title: string;
  activity: 'Footballer' | 'Sprinter';
  description: string;
  videoSrc: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const demoVideos: DemoVideo[] = [
  {
    id: 'football-demo',
    title: 'Football Skills Demo',
    activity: 'Footballer',
    description: 'Professional football techniques and ball control demonstration',
    videoSrc: '/demo-videos/football-demo.mp4',
    icon: Users,
    gradient: 'bg-gradient-success'
  },
  {
    id: 'sprint-demo',
    title: 'Sprint Training Demo',
    activity: 'Sprinter',
    description: 'High-intensity sprinting and acceleration training showcase',
    videoSrc: '/demo-videos/sprint-demo.mp4',
    icon: Zap,
    gradient: 'bg-gradient-secondary'
  }
];

interface DemoPageProps {
  onBack: () => void;
}

export function DemoPage({ onBack }: DemoPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateDemoCertificate = async (video: DemoVideo) => {
    setIsGenerating(true);
    
    try {
      const certificate: Certificate = {
        id: uuidv4(),
        userName: 'Demo Athlete',
        activity: video.activity,
        score: generateScore(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      await generateCertificatePDF(certificate);
      
      toast({
        title: "Demo certificate downloaded!",
        description: `${video.activity} demo certificate has been saved to your downloads.`,
      });
    } catch (error) {
      console.error('Error generating demo certificate:', error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Unable to download demo certificate. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to App
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Demo Videos
            </h1>
            <p className="text-muted-foreground">
              Experience the platform with pre-recorded demonstration videos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Available Demos</h2>
            {demoVideos.map((video) => {
              const IconComponent = video.icon;
              const isSelected = selectedVideo?.id === video.id;
              
              return (
                <Card
                  key={video.id}
                  className={`p-4 cursor-pointer transition-all duration-300 border-primary/20 bg-card/50 backdrop-blur-sm ${
                    isSelected 
                      ? 'ring-2 ring-primary shadow-glow' 
                      : 'hover:border-primary/50 hover:shadow-card'
                  }`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${video.gradient}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {video.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {video.activity}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Video Player */}
          <div className="lg:col-span-2">
            {selectedVideo ? (
              <div className="space-y-6">
                <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${selectedVideo.gradient}`}>
                      <selectedVideo.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">{selectedVideo.title}</h2>
                      <p className="text-muted-foreground">{selectedVideo.description}</p>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    <video
                      key={selectedVideo.videoSrc}
                      controls
                      className="w-full h-full object-cover"
                      onError={() => {
                        toast({
                          variant: "destructive",
                          title: "Video not found",
                          description: "Demo video file is missing. Please add demo videos to public/demo-videos/",
                        });
                      }}
                    >
                      <source src={selectedVideo.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button
                      onClick={() => generateDemoCertificate(selectedVideo)}
                      disabled={isGenerating}
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {isGenerating ? 'Generating...' : 'Generate Demo Certificate'}
                    </Button>
                    
                    <Badge variant="secondary" className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Demo Mode
                    </Badge>
                  </div>
                </Card>

                {/* Demo Info */}
                <Card className="p-4 border-warning/20 bg-warning/5">
                  <div className="flex items-start gap-3">
                    <div className="bg-warning/20 p-2 rounded-full">
                      <Trophy className="h-4 w-4 text-warning" />
                    </div>
                    <div className="text-sm">
                      <h4 className="font-semibold text-warning mb-1">Demo Mode Active</h4>
                      <p className="text-muted-foreground">
                        This is a demonstration using pre-recorded videos. 
                        In live mode, you would record your own performance using your device's camera.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <Play className="mx-auto h-16 w-16 text-muted-foreground" />
                  <h3 className="text-xl font-semibold">Select a Demo Video</h3>
                  <p className="text-muted-foreground">
                    Choose a demonstration video from the list to see how the platform works
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8 p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Demo Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">What you can do:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Watch pre-recorded demonstration videos</li>
                <li>Generate sample certificates with random scores</li>
                <li>Download PDF certificates for demo purposes</li>
                <li>Experience the complete workflow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Note:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Demo videos should be placed in <code>public/demo-videos/</code></li>
                <li>Certificates will show "Demo Athlete" as the name</li>
                <li>Scores are randomly generated for demonstration</li>
                <li>No user data is stored in demo mode</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}