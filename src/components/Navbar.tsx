import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, User, Brain, Newspaper, Flame, Upload, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  onProfileClick: () => void;
  onAIGuideClick: () => void;
  onSportsUpdateClick: () => void;
  onChallengesClick: () => void;
  onVideoUploadClick: () => void;
}

export const Navbar = ({ 
  onProfileClick, 
  onAIGuideClick, 
  onSportsUpdateClick, 
  onChallengesClick,
  onVideoUploadClick
}: NavbarProps) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };
  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Coach
            </h1>
            {user && (
              <div className="ml-4 text-sm text-muted-foreground">
                Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onProfileClick}
              className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
            
            <Button
              variant="ghost"
              onClick={onAIGuideClick}
              className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              <Brain className="h-4 w-4" />
              AI Guide
            </Button>
            
            <Button
              variant="ghost"
              onClick={onSportsUpdateClick}
              className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              <Newspaper className="h-4 w-4" />
              Sports Updates
            </Button>
            
            <Button
              variant="ghost"
              onClick={onChallengesClick}
              className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              <Flame className="h-4 w-4" />
              Challenges
            </Button>

            <Button 
              variant="ghost" 
              onClick={onVideoUploadClick}
              className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              <Upload className="h-4 w-4" />
              Video Analysis
            </Button>

            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2 border-primary/20 hover:bg-primary/10 text-primary"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};