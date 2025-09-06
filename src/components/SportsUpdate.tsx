import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Star,
  Filter,
  Search,
  Medal,
  Target,
  Zap,
  Globe
} from 'lucide-react';

interface Competition {
  id: string;
  title: string;
  sport: string;
  date: string;
  location: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  participants: number;
  maxParticipants: number;
  prize: string;
  description: string;
  registrationOpen: boolean;
  featured: boolean;
}

export function SportsUpdate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  // Mock competition data
  const competitions: Competition[] = [
    {
      id: '1',
      title: 'Summer Athletic Championship',
      sport: 'Track & Field',
      date: '2024-07-15',
      location: 'Olympic Stadium, City Center',
      level: 'Advanced',
      participants: 156,
      maxParticipants: 200,
      prize: '$5,000 Prize Pool',
      description: 'Annual championship featuring multiple track and field events including sprints, hurdles, and field competitions.',
      registrationOpen: true,
      featured: true
    },
    {
      id: '2',
      title: 'Local Basketball Tournament',
      sport: 'Basketball',
      date: '2024-06-20',
      location: 'Community Sports Center',
      level: 'Intermediate',
      participants: 45,
      maxParticipants: 64,
      prize: 'Trophies & Medals',
      description: '3-on-3 basketball tournament open to teams of all skill levels. Great opportunity to showcase your skills.',
      registrationOpen: true,
      featured: false
    },
    {
      id: '3',
      title: 'Youth Swimming Championships',
      sport: 'Swimming',
      date: '2024-06-30',
      location: 'Aquatic Center',
      level: 'Beginner',
      participants: 89,
      maxParticipants: 120,
      prize: 'Participation Certificates',
      description: 'Swimming competition for young athletes aged 12-18. Multiple categories and stroke styles available.',
      registrationOpen: true,
      featured: false
    },
    {
      id: '4',
      title: 'Marathon Challenge',
      sport: 'Running',
      date: '2024-08-10',
      location: 'City Park Circuit',
      level: 'Professional',
      participants: 234,
      maxParticipants: 300,
      prize: '$10,000 First Place',
      description: 'Full marathon race through scenic city routes. Qualifying times required for professional category.',
      registrationOpen: true,
      featured: true
    },
    {
      id: '5',
      title: 'Beginner Tennis Open',
      sport: 'Tennis',
      date: '2024-07-05',
      location: 'Tennis Club Courts',
      level: 'Beginner',
      participants: 32,
      maxParticipants: 48,
      prize: 'Equipment Vouchers',
      description: 'Perfect for new tennis players to gain competitive experience in a supportive environment.',
      registrationOpen: true,
      featured: false
    }
  ];

  const handleRegister = (competitionId: string) => {
    setRegisteredEvents(prev => 
      prev.includes(competitionId) 
        ? prev.filter(id => id !== competitionId)
        : [...prev, competitionId]
    );
  };

  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || competition.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-gradient-success';
      case 'Intermediate': return 'bg-gradient-secondary';
      case 'Advanced': return 'bg-gradient-primary';
      case 'Professional': return 'bg-gradient-primary';
      default: return 'bg-gradient-primary';
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'Beginner': return 'default';
      case 'Intermediate': return 'secondary';
      case 'Advanced': return 'outline';
      case 'Professional': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-primary p-3 rounded-full">
            <Globe className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Sports Updates & Competitions</h2>
            <p className="text-muted-foreground">Discover and join athletic competitions near you</p>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search competitions, sports, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedLevel === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('all')}
              size="sm"
            >
              All Levels
            </Button>
            <Button
              variant={selectedLevel === 'beginner' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('beginner')}
              size="sm"
            >
              Beginner
            </Button>
            <Button
              variant={selectedLevel === 'intermediate' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('intermediate')}
              size="sm"
            >
              Intermediate
            </Button>
            <Button
              variant={selectedLevel === 'advanced' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('advanced')}
              size="sm"
            >
              Advanced
            </Button>
          </div>
        </div>
      </Card>

      {/* Featured Competitions */}
      {filteredCompetitions.some(comp => comp.featured) && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Featured Competitions
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredCompetitions.filter(comp => comp.featured).map((competition) => (
              <Card key={competition.id} className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">{competition.title}</h4>
                      <p className="text-primary font-medium">{competition.sport}</p>
                    </div>
                    <Badge className={`${getLevelColor(competition.level)} text-white`}>
                      <Medal className="h-3 w-3 mr-1" />
                      {competition.level}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(competition.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{competition.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{competition.participants}/{competition.maxParticipants} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-success">
                      <Trophy className="h-4 w-4" />
                      <span>{competition.prize}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{competition.description}</p>

                  <Button
                    onClick={() => handleRegister(competition.id)}
                    disabled={!competition.registrationOpen}
                    className={`w-full ${
                      registeredEvents.includes(competition.id)
                        ? 'bg-success hover:bg-success/90'
                        : 'bg-gradient-primary hover:shadow-glow'
                    } transition-all duration-300`}
                  >
                    {registeredEvents.includes(competition.id) ? (
                      <>
                        <Target className="mr-2 h-4 w-4" />
                        Registered
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Register Now
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Competitions */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          All Competitions ({filteredCompetitions.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCompetitions.map((competition) => (
            <Card key={competition.id} className="p-4 border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{competition.title}</h4>
                    <p className="text-sm text-primary">{competition.sport}</p>
                  </div>
                  {competition.featured && (
                    <Star className="h-4 w-4 text-warning" />
                  )}
                </div>

                <Badge variant={getLevelBadgeVariant(competition.level)} className="w-fit">
                  {competition.level}
                </Badge>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(competition.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{competition.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{competition.participants}/{competition.maxParticipants}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleRegister(competition.id)}
                  disabled={!competition.registrationOpen}
                  size="sm"
                  className={`w-full ${
                    registeredEvents.includes(competition.id)
                      ? 'bg-success hover:bg-success/90'
                      : 'bg-gradient-primary hover:shadow-glow'
                  } transition-all duration-300`}
                >
                  {registeredEvents.includes(competition.id) ? 'Registered' : 'Register'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm text-center">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No competitions found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or filters.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}