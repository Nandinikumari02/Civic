import type { Issue } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye, MapPin, Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryBadge } from '@/components/shared/CategoryBadge';

interface IssueDetailsDialogProps {
  issue: Issue;
  trigger?: React.ReactNode;
}

export function IssueDetailsDialog({ issue, trigger }: IssueDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="pr-6">{issue.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {issue.beforePhoto && (
            <img
              src={issue.beforePhoto}
              alt={issue.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={issue.status} />
            <CategoryBadge category={issue.category} />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {issue.description}
          </p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{issue.location.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Reported {formatDistanceToNow(issue.reportedAt, { addSuffix: true })}</span>
            </div>
            {issue.assignedTo && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Assigned to {issue.assignedTo}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}