
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, Target, TrendingUp, CheckCircle2, ThumbsUp, FileWarning } from 'lucide-react';

const rewards = [
  { name: 'First Report', points: 50, icon: Star, earned: true },
  { name: 'Active Citizen', points: 200, icon: Award, earned: true },
  { name: 'Community Hero', points: 500, icon: Trophy, earned: false },
  { name: 'City Champion', points: 1000, icon: Target, earned: false },
];

export default function Rewards() {
  const { user } = useAuth();
  const userPoints = user.points || 0;
  const nextBadge = rewards.find((r) => !r.earned);
  const progress = nextBadge ? (userPoints / nextBadge.points) * 100 : 100;

  return (
   
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rewards & Achievements</h1>
            <p className="text-muted-foreground">
              Track your civic contribution and earn rewards
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Points Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Points Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <p className="text-5xl font-bold text-primary">{userPoints}</p>
                <p className="text-muted-foreground mt-1">Total Civic Points</p>
              </div>

              {nextBadge && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress to {nextBadge.name}</span>
                    <span className="font-medium">{userPoints}/{nextBadge.points}</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-muted-foreground text-center">
                    {nextBadge.points - userPoints} more points to unlock
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-success">12</p>
                  <p className="text-sm text-muted-foreground">Issues Reported</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-success">8</p>
                  <p className="text-sm text-muted-foreground">Issues Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileWarning className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">12</p>
                  <p className="text-xs text-muted-foreground">Issues Reported</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">8</p>
                  <p className="text-xs text-muted-foreground">Issues Resolved</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                  <ThumbsUp className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">45</p>
                  <p className="text-xs text-muted-foreground">Upvotes Received</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-warning" />
              Badges & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rewards.map((reward) => (
                <div
                  key={reward.name}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    reward.earned
                      ? 'border-warning bg-warning/5'
                      : 'border-dashed border-muted-foreground/30 opacity-50'
                  }`}
                >
                  <div
                    className={`h-12 w-12 rounded-full mx-auto flex items-center justify-center ${
                      reward.earned ? 'bg-warning/20' : 'bg-muted'
                    }`}
                  >
                    <reward.icon
                      className={`h-6 w-6 ${reward.earned ? 'text-warning' : 'text-muted-foreground'}`}
                    />
                  </div>
                  <p className="mt-2 font-medium text-sm">{reward.name}</p>
                  <p className="text-xs text-muted-foreground">{reward.points} pts</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How to Earn Points */}
        <Card>
          <CardHeader>
            <CardTitle>How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-primary">+10 pts</p>
                <p className="text-sm text-muted-foreground">Report an issue</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-primary">+25 pts</p>
                <p className="text-sm text-muted-foreground">Issue gets resolved</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-primary">+5 pts</p>
                <p className="text-sm text-muted-foreground">Upvote other issues</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-primary">+50 pts</p>
                <p className="text-sm text-muted-foreground">Verified report bonus</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
   
  );
}
