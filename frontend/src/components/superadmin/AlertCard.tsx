import { cn } from '@/lib/utils';

interface Alert {
  id: string | number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
}

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <div
      className={cn(
        'p-3 rounded-lg border-l-4',
        alert.type === 'critical' && 'border-l-destructive bg-destructive/5',
        alert.type === 'warning' && 'border-l-warning bg-warning/5',
        alert.type === 'info' && 'border-l-success bg-success/5'
      )}
    >
      <p className="text-sm font-medium">{alert.message}</p>
      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
    </div>
  );
}

interface AlertsListProps {
  alerts: Alert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}
