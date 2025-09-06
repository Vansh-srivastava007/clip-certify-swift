import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Calendar, 
  Utensils, 
  Dumbbell, 
  Heart, 
  Target,
  Zap,
  Clock,
  TrendingUp,
  Users
} from 'lucide-react';

interface GuideOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  prompt: string;
}

export function AIGuide() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const guideOptions: GuideOption[] = [
    {
      id: 'activity-planner',
      title: 'Activity Planner',
      description: 'Get personalized workout routines and training schedules',
      icon: Dumbbell,
      color: 'bg-gradient-primary',
      prompt: 'Create a personalized activity plan based on: '
    },
    {
      id: 'diet-planner',
      title: 'Diet Planner',
      description: 'Receive nutrition advice and meal planning guidance',
      icon: Utensils,
      color: 'bg-gradient-success',
      prompt: 'Design a nutrition plan considering: '
    },
    {
      id: 'recovery-optimizer',
      title: 'Recovery Optimizer',
      description: 'Learn optimal recovery strategies and rest periods',
      icon: Heart,
      color: 'bg-gradient-secondary',
      prompt: 'Suggest recovery strategies for: '
    },
    {
      id: 'goal-tracker',
      title: 'Goal Tracker',
      description: 'Set and track your athletic performance goals',
      icon: Target,
      color: 'bg-gradient-primary',
      prompt: 'Help me set and track goals for: '
    },
    {
      id: 'performance-analyzer',
      title: 'Performance Analyzer',
      description: 'Analyze your performance data and identify improvements',
      icon: TrendingUp,
      color: 'bg-gradient-success',
      prompt: 'Analyze my performance in: '
    },
    {
      id: 'team-coordination',
      title: 'Team Coordination',
      description: 'Organize team activities and group training sessions',
      icon: Users,
      color: 'bg-gradient-secondary',
      prompt: 'Help coordinate team activities for: '
    }
  ];

  const handleGenerateRecommendations = () => {
    if (!selectedGuide || !userInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI recommendation generation
    setTimeout(() => {
      const selectedOption = guideOptions.find(option => option.id === selectedGuide);
      
      let mockRecommendations: string[] = [];
      
      switch (selectedGuide) {
        case 'activity-planner':
          mockRecommendations = [
            "Start with 3 days of cardio training per week (30-45 minutes each)",
            "Incorporate 2 strength training sessions focusing on compound movements",
            "Add 1 day of flexibility and mobility work",
            "Schedule rest days between intense training sessions",
            "Track your progress weekly and adjust intensity gradually"
          ];
          break;
        case 'diet-planner':
          mockRecommendations = [
            "Consume 1.6-2.2g of protein per kg of body weight daily",
            "Include complex carbohydrates before workouts for energy",
            "Stay hydrated with 8-10 glasses of water per day",
            "Eat a balanced meal within 2 hours post-workout",
            "Include antioxidant-rich fruits and vegetables in every meal"
          ];
          break;
        case 'recovery-optimizer':
          mockRecommendations = [
            "Aim for 7-9 hours of quality sleep each night",
            "Use active recovery methods like light walking or stretching",
            "Apply ice baths or cold therapy after intense sessions",
            "Practice deep breathing or meditation for mental recovery",
            "Schedule complete rest days to prevent overtraining"
          ];
          break;
        default:
          mockRecommendations = [
            "Set specific, measurable goals with clear timelines",
            "Break down large goals into smaller, achievable milestones",
            "Track your progress daily using performance metrics",
            "Regularly review and adjust your approach based on results",
            "Celebrate small wins to maintain motivation"
          ];
      }
      
      setRecommendations(mockRecommendations);
      setIsGenerating(false);
    }, 2000);
  };

  const resetGuide = () => {
    setSelectedGuide(null);
    setUserInput('');
    setRecommendations([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-primary p-3 rounded-full">
            <Brain className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Athletic Guide</h2>
            <p className="text-muted-foreground">Get personalized recommendations for your athletic journey</p>
          </div>
        </div>
      </Card>

      {!selectedGuide ? (
        /* Guide Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guideOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card 
                key={option.id}
                className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedGuide(option.id)}
              >
                <div className="text-center space-y-4">
                  <div className={`${option.color} p-3 rounded-full w-fit mx-auto`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{option.title}</h3>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                  <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    Get Started
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Selected Guide Interface */
        <div className="space-y-6">
          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {(() => {
                  const selectedOption = guideOptions.find(option => option.id === selectedGuide);
                  const Icon = selectedOption?.icon || Brain;
                  return (
                    <>
                      <div className={`${selectedOption?.color || 'bg-gradient-primary'} p-2 rounded-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">{selectedOption?.title}</h3>
                    </>
                  );
                })()}
              </div>
              <Button onClick={resetGuide} variant="outline">
                Change Guide
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Describe your specific needs, goals, or current situation:
                </label>
                <Textarea
                  placeholder={`${guideOptions.find(option => option.id === selectedGuide)?.prompt || ''}your current fitness level, available time, specific goals, dietary restrictions, etc.`}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[120px] border-primary/20 focus:border-primary"
                />
              </div>

              <Button 
                onClick={handleGenerateRecommendations}
                disabled={!userInput.trim() || isGenerating}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isGenerating ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Generating Recommendations...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Personalized Plan
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <Card className="p-6 border-success/20 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-success" />
                <h3 className="text-xl font-semibold text-success">Your Personalized Recommendations</h3>
              </div>
              
              <div className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-success/20">
                    <Badge variant="outline" className="mt-1 border-success text-success">
                      {index + 1}
                    </Badge>
                    <p className="text-sm leading-relaxed">{recommendation}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> These are general recommendations. Always consult with qualified professionals 
                  for personalized athletic training and nutrition advice.
                </p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}