import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity } from '@/types';
import { Trophy, Users, Zap, Settings } from 'lucide-react';

interface ActivitySelectorProps {
  selectedActivity: Activity;
  customActivity: string;
  onActivityChange: (activity: Activity, custom?: string) => void;
  disabled?: boolean;
}

const activities = [
  { 
    id: 'Athlete' as Activity, 
    name: 'General Athlete', 
    icon: Trophy, 
    description: 'All-round athletic performance',
    gradient: 'bg-gradient-primary'
  },
  { 
    id: 'Footballer' as Activity, 
    name: 'Footballer', 
    icon: Users, 
    description: 'Football skills and techniques',
    gradient: 'bg-gradient-success'
  },
  { 
    id: 'Sprinter' as Activity, 
    name: 'Sprinter', 
    icon: Zap, 
    description: 'Speed and acceleration',
    gradient: 'bg-gradient-secondary'
  },
  { 
    id: 'Custom' as Activity, 
    name: 'Custom Activity', 
    icon: Settings, 
    description: 'Define your own sport',
    gradient: 'bg-gradient-primary'
  }
];

export function ActivitySelector({ 
  selectedActivity, 
  customActivity, 
  onActivityChange, 
  disabled 
}: ActivitySelectorProps) {
  const [tempCustom, setTempCustom] = useState(customActivity);

  const handleActivitySelect = (activity: Activity) => {
    if (activity === 'Custom') {
      onActivityChange(activity, tempCustom);
    } else {
      onActivityChange(activity);
    }
  };

  const handleCustomChange = (value: string) => {
    setTempCustom(value);
    if (selectedActivity === 'Custom') {
      onActivityChange('Custom', value);
    }
  };

  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Select Your Activity</h3>
          <p className="text-muted-foreground">
            Choose the sport or activity you'll be performing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            const isSelected = selectedActivity === activity.id;
            
            return (
              <Button
                key={activity.id}
                onClick={() => handleActivitySelect(activity.id)}
                disabled={disabled}
                variant={isSelected ? "default" : "outline"}
                className={`h-auto p-6 flex-col gap-3 text-left transition-all duration-300 ${
                  isSelected 
                    ? `${activity.gradient} shadow-glow text-primary-foreground` 
                    : 'hover:border-primary/50 hover:shadow-card'
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <IconComponent className="h-6 w-6" />
                  <div className="flex-1">
                    <div className="font-semibold">{activity.name}</div>
                    <div className={`text-sm ${
                      isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {activity.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {selectedActivity === 'Custom' && (
          <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
            <Label htmlFor="custom-activity">Custom Activity Name</Label>
            <Input
              id="custom-activity"
              placeholder="e.g., Basketball, Tennis, Swimming..."
              value={tempCustom}
              onChange={(e) => handleCustomChange(e.target.value)}
              disabled={disabled}
              className="border-primary/20 focus:border-primary"
            />
          </div>
        )}
      </div>
    </Card>
  );
}