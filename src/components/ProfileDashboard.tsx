import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Trophy, 
  Calendar, 
  BarChart3, 
  Medal, 
  Activity,
  TrendingUp,
  Target
} from 'lucide-react';

interface AthleteRecord {
  id: string;
  activity: string;
  score: number;
  date: string;
  certificate?: boolean;
}

export function ProfileDashboard() {
  const [athleteRecords, setAthleteRecords] = useState<AthleteRecord[]>([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    averageScore: 0,
    certificates: 0,
    bestScore: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const savedRecords = localStorage.getItem('athleteRecords');
    if (savedRecords) {
      const records = JSON.parse(savedRecords);
      setAthleteRecords(records);
      
      // Calculate stats
      const totalActivities = records.length;
      const averageScore = records.length > 0 
        ? Math.round(records.reduce((sum: number, record: AthleteRecord) => sum + record.score, 0) / records.length)
        : 0;
      const certificates = records.filter((record: AthleteRecord) => record.certificate).length;
      const bestScore = records.length > 0 
        ? Math.max(...records.map((record: AthleteRecord) => record.score))
        : 0;
      
      setStats({
        totalActivities,
        averageScore,
        certificates,
        bestScore
      });
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('athleteRecords');
    setAthleteRecords([]);
    setStats({
      totalActivities: 0,
      averageScore: 0,
      certificates: 0,
      bestScore: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-primary p-3 rounded-full">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Athlete Dashboard</h2>
            <p className="text-muted-foreground">Track your athletic journey and achievements</p>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Activities</p>
              <p className="text-2xl font-bold">{stats.totalActivities}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-success p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-2xl font-bold">{stats.averageScore}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-secondary p-2 rounded-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Certificates</p>
              <p className="text-2xl font-bold">{stats.certificates}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Target className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Best Score</p>
              <p className="text-2xl font-bold">{stats.bestScore}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Recent Activities</h3>
          </div>
          {athleteRecords.length > 0 && (
            <Button onClick={clearHistory} variant="outline" size="sm">
              Clear History
            </Button>
          )}
        </div>

        {athleteRecords.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No activities recorded yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Complete your first certification to see your progress here!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {athleteRecords.slice().reverse().slice(0, 10).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-primary p-2 rounded-lg">
                    <Medal className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{record.activity}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-gradient-success text-white">
                    {record.score}/100
                  </Badge>
                  {record.certificate && (
                    <Badge variant="outline" className="border-primary text-primary">
                      <Trophy className="h-3 w-3 mr-1" />
                      Certified
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}