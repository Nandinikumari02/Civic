import { STATUS_LABELS, type IssueStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Clock, Loader2, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          className: 'status-badge-pending',
        };
      case 'in_progress':
        return {
          icon: Loader2,
          className: 'status-badge-in-progress',
        };
      case 'resolved':
        return {
          icon: CheckCircle2,
          className: 'status-badge-resolved',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={cn('status-badge', config.className, className)}>
      <Icon className={cn('h-3 w-3', status === 'in_progress' && 'animate-spin')} />
      {STATUS_LABELS[status]}
    </span>
  );
}
