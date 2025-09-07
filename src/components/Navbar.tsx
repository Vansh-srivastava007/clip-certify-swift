import { Button } from '@/components/ui/button';
import { User, Brain, Globe, Trophy } from 'lucide-react';

interface NavbarProps {
  onProfileClick: () => void;
  onAIGuideClick: () => void;
  onSportsUpdateClick: () => void;
  onChallengesClick: () => void;
}

export const Navbar = ({ onProfileClick, onAIGuideClick, onSportsUpdateClick, onChallengesClick }: NavbarProps) => {
  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Coach
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onProfileClick}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
            
            <Button
              variant="ghost"
              onClick={onAIGuideClick}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              AI Guide
            </Button>
            
            <Button
              variant="ghost"
              onClick={onSportsUpdateClick}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Sports Updates
            </Button>
            
            <Button
              variant="ghost"
              onClick={onChallengesClick}
              className="flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Challenges
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};