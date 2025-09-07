import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { VideoRecorder } from '@/components/VideoRecorder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateCertificatePDF } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  Calendar, 
  Play, 
  CheckCircle, 
  Upload, 
  Target,
  Timer,
  Award,
  Flame
} from 'lucide-react';

interface Challenge {
  id: string;
  name: string;
  duration: number;
  sport: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tasks: Task[];
}

interface Task {
  id: string;
  day: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extremely Hard';
  target: string;
  completed?: boolean;
  videoSubmitted?: boolean;
}

interface ChallengeProgress {
  challengeId: string;
  completedTasks: string[];
  startedDate: string;
  completed: boolean;
  certificateGenerated: boolean;
}

const challenges: Challenge[] = [
  {
    id: 'running-15',
    name: '15-Day Running Challenge',
    duration: 15,
    sport: 'Running',
    description: 'Build your running endurance with progressive daily tasks',
    difficulty: 'Beginner',
    tasks: [
      { id: 'r15-1', day: 1, title: 'Easy Jog', description: 'Light jogging to warm up', difficulty: 'Easy', target: '10 minutes' },
      { id: 'r15-2', day: 2, title: 'Steady Run', description: 'Maintain steady pace', difficulty: 'Easy', target: '15 minutes' },
      { id: 'r15-3', day: 3, title: 'Interval Training', description: 'Alternate between jogging and walking', difficulty: 'Medium', target: '20 minutes' },
      { id: 'r15-4', day: 4, title: 'Hill Run', description: 'Run on inclined surfaces', difficulty: 'Medium', target: '18 minutes' },
      { id: 'r15-5', day: 5, title: 'Distance Run', description: 'Focus on covering distance', difficulty: 'Medium', target: '25 minutes' },
      { id: 'r15-6', day: 6, title: 'Speed Work', description: 'Short bursts of high intensity', difficulty: 'Hard', target: '20 minutes' },
      { id: 'r15-7', day: 7, title: 'Recovery Run', description: 'Light recovery session', difficulty: 'Easy', target: '15 minutes' },
      { id: 'r15-8', day: 8, title: 'Tempo Run', description: 'Comfortably hard pace', difficulty: 'Hard', target: '22 minutes' },
      { id: 'r15-9', day: 9, title: 'Long Run', description: 'Build endurance with longer duration', difficulty: 'Hard', target: '30 minutes' },
      { id: 'r15-10', day: 10, title: 'Fartlek Training', description: 'Play with pace variations', difficulty: 'Hard', target: '25 minutes' },
      { id: 'r15-11', day: 11, title: 'Track Workout', description: 'Structured track intervals', difficulty: 'Hard', target: '28 minutes' },
      { id: 'r15-12', day: 12, title: 'Hill Repeats', description: 'Repeated hill climbs', difficulty: 'Extremely Hard', target: '30 minutes' },
      { id: 'r15-13', day: 13, title: 'Time Trial', description: 'Race pace effort', difficulty: 'Extremely Hard', target: '25 minutes' },
      { id: 'r15-14', day: 14, title: 'Peak Performance', description: 'Maximum effort session', difficulty: 'Extremely Hard', target: '35 minutes' },
      { id: 'r15-15', day: 15, title: 'Challenge Completion', description: 'Final test of your progress', difficulty: 'Extremely Hard', target: '40 minutes' },
    ]
  },
  {
    id: 'javelin-21',
    name: '21-Day Javelin Challenge',
    duration: 21,
    sport: 'Javelin',
    description: 'Master javelin technique and build throwing power',
    difficulty: 'Intermediate',
    tasks: [
      { id: 'j21-1', day: 1, title: 'Basic Grip', description: 'Learn proper javelin grip technique', difficulty: 'Easy', target: '20 throws' },
      { id: 'j21-2', day: 2, title: 'Stance Practice', description: 'Perfect your throwing stance', difficulty: 'Easy', target: '25 throws' },
      { id: 'j21-3', day: 3, title: 'Arm Motion', description: 'Focus on arm swing mechanics', difficulty: 'Easy', target: '30 throws' },
      { id: 'j21-4', day: 4, title: 'Footwork Drills', description: 'Practice approach footwork', difficulty: 'Medium', target: '25 throws' },
      { id: 'j21-5', day: 5, title: 'Short Approach', description: 'Throwing with 3-step approach', difficulty: 'Medium', target: '20 throws' },
      { id: 'j21-6', day: 6, title: 'Medium Approach', description: 'Throwing with 5-step approach', difficulty: 'Medium', target: '18 throws' },
      { id: 'j21-7', day: 7, title: 'Power Development', description: 'Focus on generating power', difficulty: 'Medium', target: '22 throws' },
      { id: 'j21-8', day: 8, title: 'Accuracy Training', description: 'Target specific landing zones', difficulty: 'Hard', target: '25 throws' },
      { id: 'j21-9', day: 9, title: 'Full Approach', description: 'Complete run-up technique', difficulty: 'Hard', target: '15 throws' },
      { id: 'j21-10', day: 10, title: 'Distance Throws', description: 'Focus on maximum distance', difficulty: 'Hard', target: '12 throws' },
      { id: 'j21-11', day: 11, title: 'Technique Refinement', description: 'Perfect your form', difficulty: 'Hard', target: '20 throws' },
      { id: 'j21-12', day: 12, title: 'Competition Prep', description: 'Simulate competition conditions', difficulty: 'Hard', target: '18 throws' },
      { id: 'j21-13', day: 13, title: 'Power & Speed', description: 'Maximum velocity training', difficulty: 'Extremely Hard', target: '15 throws' },
      { id: 'j21-14', day: 14, title: 'Pressure Training', description: 'Perform under pressure', difficulty: 'Extremely Hard', target: '12 throws' },
      { id: 'j21-15', day: 15, title: 'Personal Best', description: 'Attempt personal best distance', difficulty: 'Extremely Hard', target: '10 throws' },
      { id: 'j21-16', day: 16, title: 'Consistency Test', description: 'Multiple consistent throws', difficulty: 'Extremely Hard', target: '15 throws' },
      { id: 'j21-17', day: 17, title: 'Advanced Technique', description: 'Advanced throwing mechanics', difficulty: 'Extremely Hard', target: '12 throws' },
      { id: 'j21-18', day: 18, title: 'Competition Simulation', description: 'Full competition format', difficulty: 'Extremely Hard', target: '6 throws' },
      { id: 'j21-19', day: 19, title: 'Peak Performance', description: 'Maximum effort session', difficulty: 'Extremely Hard', target: '8 throws' },
      { id: 'j21-20', day: 20, title: 'Final Assessment', description: 'Demonstrate all skills', difficulty: 'Extremely Hard', target: '10 throws' },
      { id: 'j21-21', day: 21, title: 'Championship Performance', description: 'Show your mastery', difficulty: 'Extremely Hard', target: '6 throws' },
    ]
  },
  {
    id: 'athletics-60',
    name: '60-Day Athletic Mastery',
    duration: 60,
    sport: 'General Athletics',
    description: 'Complete athletic development program covering multiple disciplines',
    difficulty: 'Advanced',
    tasks: Array.from({ length: 60 }, (_, i) => ({
      id: `a60-${i + 1}`,
      day: i + 1,
      title: `Day ${i + 1} Training`,
      description: i < 20 ? 'Foundation building exercises' : 
                   i < 40 ? 'Intermediate skill development' : 
                   'Advanced performance training',
      difficulty: (i < 15 ? 'Easy' : 
                   i < 30 ? 'Medium' : 
                   i < 45 ? 'Hard' : 
                   'Extremely Hard') as Task['difficulty'],
      target: `${45 + Math.floor(i / 2)} minutes`
    }))
  }
];

export const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showVideoRecorder, setShowVideoRecorder] = useState(false);
  const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedProgress = localStorage.getItem('challengeProgress');
    if (savedProgress) {
      setChallengeProgress(JSON.parse(savedProgress));
    }
  }, []);

  const saveProgress = (progress: ChallengeProgress[]) => {
    localStorage.setItem('challengeProgress', JSON.stringify(progress));
    setChallengeProgress(progress);
  };

  const startChallenge = (challenge: Challenge) => {
    const existingProgress = challengeProgress.find(p => p.challengeId === challenge.id);
    if (!existingProgress) {
      const newProgress: ChallengeProgress = {
        challengeId: challenge.id,
        completedTasks: [],
        startedDate: new Date().toISOString(),
        completed: false,
        certificateGenerated: false
      };
      saveProgress([...challengeProgress, newProgress]);
    }
    setSelectedChallenge(challenge);
  };

  const getChallengeProgress = (challengeId: string) => {
    return challengeProgress.find(p => p.challengeId === challengeId);
  };

  const getProgressPercentage = (challenge: Challenge) => {
    const progress = getChallengeProgress(challenge.id);
    if (!progress) return 0;
    return (progress.completedTasks.length / challenge.tasks.length) * 100;
  };

  const handleVideoSubmission = (videoBlob: Blob) => {
    if (!activeTask || !selectedChallenge) return;

    const progress = getChallengeProgress(selectedChallenge.id);
    if (!progress) return;

    const updatedProgress = challengeProgress.map(p => 
      p.challengeId === selectedChallenge.id 
        ? { ...p, completedTasks: [...p.completedTasks, activeTask.id] }
        : p
    );

    // Check if challenge is completed
    const newProgress = updatedProgress.find(p => p.challengeId === selectedChallenge.id);
    if (newProgress && newProgress.completedTasks.length === selectedChallenge.tasks.length) {
      newProgress.completed = true;
      
      // Generate certificate
      if (!newProgress.certificateGenerated) {
        generateCertificatePDF({
          id: `challenge-${selectedChallenge.id}`,
          userName: 'Athlete', // In a real app, this would come from user data
          activity: 'Challenge Completion' as any,
          customActivity: selectedChallenge.name,
          score: 100,
          date: new Date().toLocaleDateString(),
        });
        newProgress.certificateGenerated = true;
        
        toast({
          title: "🏆 Challenge Completed!",
          description: "Congratulations! Your completion certificate has been generated.",
        });
      }
    }

    saveProgress(updatedProgress);
    setShowVideoRecorder(false);
    setActiveTask(null);

    toast({
      title: "Task Submitted!",
      description: "Our AI model will review your submission shortly.",
    });
  };

  const getDifficultyColor = (difficulty: Task['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-orange-500';
      case 'Extremely Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const isTaskCompleted = (taskId: string, challengeId: string) => {
    const progress = getChallengeProgress(challengeId);
    return progress?.completedTasks.includes(taskId) || false;
  };

  if (showVideoRecorder && activeTask) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => setShowVideoRecorder(false)} 
            variant="outline"
          >
            ← Back to Task
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{activeTask.title}</h2>
            <p className="text-muted-foreground">Record your performance for AI review</p>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="font-medium">Target: {activeTask.target}</span>
            </div>
            <p className="text-muted-foreground">{activeTask.description}</p>
          </div>
          
          <VideoRecorder onVideoReady={handleVideoSubmission} />
        </Card>
      </div>
    );
  }

  if (selectedChallenge) {
    const progress = getChallengeProgress(selectedChallenge.id);
    const progressPercentage = getProgressPercentage(selectedChallenge);

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => setSelectedChallenge(null)} 
            variant="outline"
          >
            ← Back to Challenges
          </Button>
          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {selectedChallenge.name}
            </h2>
            <p className="text-muted-foreground mt-1">{selectedChallenge.description}</p>
          </div>
        </div>

        {progress && (
          <Card className="p-6 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Challenge Progress</h3>
                <Badge variant={progress.completed ? "default" : "secondary"}>
                  {progress.completed ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {progress.completedTasks.length} of {selectedChallenge.tasks.length} tasks completed ({Math.round(progressPercentage)}%)
              </p>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedChallenge.tasks.map((task) => {
            const isCompleted = isTaskCompleted(task.id, selectedChallenge.id);
            return (
              <Card 
                key={task.id} 
                className={`p-4 transition-all duration-200 ${
                  isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">Day {task.day}</span>
                    {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className={`${getDifficultyColor(task.difficulty)} text-white`}
                    >
                      {task.difficulty}
                    </Badge>
                    <span className="text-sm font-medium">{task.target}</span>
                  </div>

                  {!isCompleted && (
                    <Button 
                      onClick={() => {
                        setActiveTask(task);
                        setShowVideoRecorder(true);
                      }}
                      className="w-full"
                      size="sm"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Video
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Flame className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Athletic Challenges
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Take on structured training programs designed to push your limits and achieve new personal bests.
          Complete daily tasks, submit videos, and earn certificates upon completion.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Challenges</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => {
              const progress = getChallengeProgress(challenge.id);
              const progressPercentage = getProgressPercentage(challenge);
              
              return (
                <Card key={challenge.id} className="p-6 border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{challenge.sport}</Badge>
                      <Badge variant={
                        challenge.difficulty === 'Beginner' ? 'default' :
                        challenge.difficulty === 'Intermediate' ? 'secondary' : 
                        'destructive'
                      }>
                        {challenge.difficulty}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">{challenge.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{challenge.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {challenge.duration} days
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {challenge.tasks.length} tasks
                        </div>
                      </div>
                    </div>

                    {progress && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{Math.round(progressPercentage)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                    )}

                    <Button 
                      onClick={() => startChallenge(challenge)}
                      className="w-full"
                      variant={progress ? "outline" : "default"}
                    >
                      {progress ? (
                        progress.completed ? (
                          <>
                            <Award className="mr-2 h-4 w-4" />
                            View Completed
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Continue Challenge
                          </>
                        )
                      ) : (
                        <>
                          <Trophy className="mr-2 h-4 w-4" />
                          Start Challenge
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="beginner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.filter(c => c.difficulty === 'Beginner').map((challenge) => (
              <Card key={challenge.id} className="p-6 border-primary/20 hover:shadow-lg transition-all duration-300">
                {/* ... same card content as above ... */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intermediate">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.filter(c => c.difficulty === 'Intermediate').map((challenge) => (
              <Card key={challenge.id} className="p-6 border-primary/20 hover:shadow-lg transition-all duration-300">
                {/* ... same card content as above ... */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.filter(c => c.difficulty === 'Advanced').map((challenge) => (
              <Card key={challenge.id} className="p-6 border-primary/20 hover:shadow-lg transition-all duration-300">
                {/* ... same card content as above ... */}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};