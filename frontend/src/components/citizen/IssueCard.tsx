import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ThumbsUp, MapPin, Clock, MessageSquare, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IssueCardProps {
  // Yahan 'any' isliye taaki backend ke relations (category object) handle ho sakein
  issue: any; 
  onUpvote?: (issueId: string) => void;
}

export function IssueCard({ issue, onUpvote }: IssueCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  // Backend agar upvotes nahi bhej raha to default 0
  const [upvoteCount, setUpvoteCount] = useState(issue.upvotes || 0);

  const handleUpvote = () => {
    if (!isUpvoted) {
      setUpvoteCount((prev: number) => prev + 1);
      setIsUpvoted(true);
    } else {
      setUpvoteCount((prev: number) => prev - 1);
      setIsUpvoted(false);
    }
    onUpvote?.(issue.id);
  };

  return (
    <Card className="overflow-hidden border-border/50 hover:shadow-md transition-all duration-300 animate-fade-in">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          {issue.beforePhoto && (
            <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0 relative overflow-hidden">
              <img
                src={issue.beforePhoto}
                alt={issue.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1 p-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {/* BACKEND FIX: Category ab ek object hai jisme name field hai */}
              <CategoryBadge category={issue.category?.name || "General"} />
              <StatusBadge status={issue.status} />
            </div>

            <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
              {issue.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {issue.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {/* BACKEND FIX: Address seedha table mein hai */}
                {issue.address || "Location not provided"}
              </span>
              <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {/* BACKEND FIX: Prisma uses createdAt */}
                {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }) : "Just now"}
              </span>
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleUpvote}
                  className={cn(
                    'h-9 rounded-full px-3 gap-2 transition-colors',
                    isUpvoted ? 'text-primary bg-primary/10 hover:bg-primary/20' : 'hover:bg-muted'
                  )}
                >
                  <ThumbsUp className={cn('h-4 w-4', isUpvoted && 'fill-current')} />
                  <span className="font-semibold text-sm">{upvoteCount}</span>
                </Button>

                <Button variant="ghost" size="sm" className="h-9 rounded-full px-3 gap-2 hover:bg-muted">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-semibold text-sm">0</span>
                </Button>
              </div>

              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}