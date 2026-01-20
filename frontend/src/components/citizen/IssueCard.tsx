import { useState } from 'react';
import type { Issue } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ThumbsUp, MapPin, Clock, MessageSquare, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';


interface IssueCardProps {
  issue: Issue;
  onUpvote?: (issueId: string) => void;
}

export function IssueCard({ issue, onUpvote }: IssueCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(issue.upvotes);

  const handleUpvote = () => {
    if (!isUpvoted) {
      setUpvoteCount((prev) => prev + 1);
      setIsUpvoted(true);
    } else {
      setUpvoteCount((prev) => prev - 1);
      setIsUpvoted(false);
    }
    onUpvote?.(issue.id);
  };

  return (
    <Card className="overflow-hidden card-hover animate-fade-in">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          {issue.beforePhoto && (
            <div className="sm:w-40 h-32 sm:h-auto flex-shrink-0">
              <img
                src={issue.beforePhoto}
                alt={issue.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <CategoryBadge category={issue.category} />
              <StatusBadge status={issue.status} />
            </div>

            <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
              {issue.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {issue.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {issue.location.address}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(issue.reportedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUpvote}
                className={cn(
                  'h-8 gap-1.5',
                  isUpvoted && 'text-primary bg-primary/10'
                )}
              >
                <ThumbsUp className={cn('h-4 w-4', isUpvoted && 'fill-current')} />
                <span className="font-medium">{upvoteCount}</span>
              </Button>

              <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                <MessageSquare className="h-4 w-4" />
                <span>12</span>
              </Button>

              <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
