import type { Issue } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ResolveDialog } from './ResolveDialog';

interface TaskCardProps {
  task: Issue;
  onResolve: () => void;
  variant?: 'default' | 'compact';
  showTimestamp?: boolean;
}

export function TaskCard({ 
  task, 
  onResolve, 
  variant = 'default',
  showTimestamp = true 
}: TaskCardProps) {
  const handleNavigate = () => {
    window.open(
      `https://maps.google.com/?q=${task.location.lat},${task.location.lng}`,
      '_blank'
    );
  };

  if (variant === 'compact') {
    return (
      <Card className="overflow-hidden card-hover animate-fade-in">
        <CardContent className="p-0">
          <div className="flex">
            {task.beforePhoto && (
              <div className="w-24 h-auto flex-shrink-0">
                <img
                  src={task.beforePhoto}
                  alt={task.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CategoryBadge category={task.category} />
                <StatusBadge status={task.status} />
              </div>
              <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                <MapPin className="h-3 w-3" />
                {task.location.address}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={handleNavigate}
                >
                  <Navigation className="h-3 w-3" />
                  Navigate
                </Button>
                <ResolveDialog task={task} onResolve={onResolve} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden card-hover animate-fade-in border-l-4 border-l-primary">
      <CardContent className="p-0">
        <div className="flex">
          {task.beforePhoto && (
            <div className="w-28 h-auto flex-shrink-0">
              <img
                src={task.beforePhoto}
                alt={task.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CategoryBadge category={task.category} />
                <StatusBadge status={task.status} />
              </div>
              {showTimestamp && (
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(task.reportedAt), { addSuffix: true })}
                </span>
              )}
            </div>
            <h3 className="font-semibold mb-1">{task.title}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {task.description}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
              <MapPin className="h-3 w-3" />
              {task.location.address}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleNavigate}
              >
                <Navigation className="h-3 w-3" />
                Navigate
              </Button>
              <ResolveDialog task={task} onResolve={onResolve} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
