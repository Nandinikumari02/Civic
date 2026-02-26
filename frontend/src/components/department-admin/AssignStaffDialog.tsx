import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* ✅ REAL API SERVICE IMPORT */
import { issueService } from '@/services/issueService'; 

interface AssignStaffDialogProps {
  issue: any; // Using real issue object from backend
  staff: any[]; // Array of real staff objects
  onSuccess?: () => void; // Callback to refresh the parent list
}

export function AssignStaffDialog({ issue, staff, onSuccess }: AssignStaffDialogProps) {
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAssign = async () => {
    if (!selectedStaffId || !issue?.id) return;

    try {
      setIsSubmitting(true);
      
      // ✅ CALLING REAL API
      await issueService.assignIssue({
        issueId: issue.id,
        staffId: selectedStaffId,
        comment: `Task assigned via Department Management.`
      });

      toast({
        title: "Assignment Successful",
        description: `Task has been assigned to the selected personnel.`,
      });

      setOpen(false);
      setSelectedStaffId('');
      
      // Refresh the list in the parent component
      if (onSuccess) onSuccess();

    } catch (error: any) {
      console.error("Assignment error:", error);
      toast({
        variant: "destructive",
        title: "Assignment Failed",
        description: error.response?.data?.message || "Could not link staff to this issue.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <UserPlus className="h-3 w-3" />
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* ✅ Added Safety check for issue object */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="font-medium text-sm">{issue?.title || "No Title Available"}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {issue?.location && typeof issue.location === 'object' 
                ? issue.location.address 
                : issue?.location || 'No location provided'}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Select Staff Member</label>
            <Select value={selectedStaffId} onValueChange={setSelectedStaffId}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Choose staff" />
              </SelectTrigger>
              <SelectContent>
                {/* ✅ Added Array check to prevent crash if staff is undefined/null */}
                {Array.isArray(staff) && staff.length > 0 ? (
                  staff.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      <div className="flex items-center justify-between w-full gap-8">
                        <span>{s.user?.fullname || 'Unknown Agent'}</span>
                        <span className="text-xs text-muted-foreground">
                          ({s._count?.issues || 0} tasks)
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-muted-foreground italic">
                    No active staff found in your department.
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            disabled={!selectedStaffId || isSubmitting}
            onClick={handleAssign}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Assign Task'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}