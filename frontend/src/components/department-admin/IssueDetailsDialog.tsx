import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { 
  Eye, 
  MapPin, 
  Calendar, 
  User, 
  Info, 
  Image as ImageIcon, 
  CheckCircle2,
  Fingerprint 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Badge } from '@/components/ui/badge';

interface IssueDetailsDialogProps {
  issue: any; // Real backend Issue object
  trigger?: React.ReactNode;
}

export function IssueDetailsDialog({ issue, trigger }: IssueDetailsDialogProps) {
  // Logic to handle category safely
  const categoryName = typeof issue?.category === 'object' 
    ? issue.category.name 
    : (issue?.category || "General");

  if (!issue) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors">
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="space-y-1">
            <DialogTitle className="text-xl font-bold leading-tight">
              {issue.title || "Untitled Issue"}
            </DialogTitle>
            <DialogDescription className="text-[10px] uppercase font-black tracking-widest text-primary flex items-center gap-1">
              <Fingerprint className="h-3 w-3" /> ID: {issue.id}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Images Section: Before & After */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Reported Image */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> Reported Image
              </span>
              {issue.imageUrl ? (
                <div className="overflow-hidden rounded-xl border shadow-sm">
                   <img
                    src={issue.imageUrl}
                    alt="Reported condition"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-muted/50 rounded-xl flex items-center justify-center text-xs text-muted-foreground border-2 border-dashed">
                  No Image Provided
                </div>
              )}
            </div>

            {/* Resolution Image (Conditional) */}
            {issue.status === 'RESOLVED' && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Resolution Proof
                </span>
                {issue.resolvedImageUrl ? (
                   <div className="overflow-hidden rounded-xl border-2 border-emerald-100 shadow-sm">
                    <img
                      src={issue.resolvedImageUrl}
                      alt="Resolved condition"
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 bg-emerald-50/30 rounded-xl flex items-center justify-center text-xs text-emerald-600 border-2 border-dashed border-emerald-100">
                    No proof uploaded
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Badges row */}
          <div className="flex items-center gap-2">
            <StatusBadge status={issue.status} />
            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px] uppercase font-bold">
              {categoryName}
            </Badge>
          </div>
          
          {/* Description Block */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase flex items-center gap-1.5 text-muted-foreground">
              <Info className="h-3.5 w-3.5" /> Description
            </h4>
            <div className="text-sm leading-relaxed bg-muted/30 p-3 rounded-lg border border-muted/50 text-foreground/90">
              {issue.description || "No detailed description provided."}
            </div>
          </div>
          
          {/* Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-muted/20 p-4 rounded-xl border border-muted/30">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Location</span>
                  <span className="text-xs font-medium line-clamp-2">{issue.address || "Captured via GPS"}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Time Reported</span>
                  <span className="text-xs font-medium">
                    {issue.createdAt ? formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true }) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:border-l sm:pl-4 border-muted-foreground/10">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Assigned Personnel</span>
                  <span className="text-xs font-bold">
                    {issue.staff?.user?.fullname || "Searching for Agent..."}
                  </span>
                </div>
              </div>

              {issue.citizen?.fullname && (
                <div className="flex items-start gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary shrink-0">C</div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Reported By</span>
                    <span className="text-xs font-medium">{issue.citizen.fullname}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}