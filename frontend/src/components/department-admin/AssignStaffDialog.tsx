import type { mockStaff } from '@/data/mockData';
import type { Issue } from '@/types';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
interface AssignStaffDialogProps {
  issue: Issue;
  staff: typeof mockStaff;
  onAssign: (issueId: string, staffName: string) => void;
}

export function AssignStaffDialog ({ issue, staff, onAssign }: AssignStaffDialogProps) {
    const [selectedStaff, setSelectedStaff] = useState('');
    const [open, setOpen] = useState(false);

    const handleAssign = () => {
        onAssign(issue.id, selectedStaff);
        setOpen(false);
        setSelectedStaff('');
    }

    return(
       <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                    <UserPlus className="h-3 w-3">
                        Assign
                    </UserPlus>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Assign Staff</DialogTitle>
                </DialogHeader>
                <div>
                    <div>
                        <p className="font-medium text-sm">{issue.title}</p>
                        <p className="text-xs text-muted-foreground">{issue.description}</p>
                    </div>
                </div>


                <div>
                    <label className='text-sm font-medium'>Select Staff:</label>
                    <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                         <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Choose Staff" />
              </SelectTrigger>
              <SelectContent>
                {staff.map((s) => (
                  <SelectItem key={s.id} value={s.name}>
                    <div className="flex items-center justify-between w-full">
                      <span>{s.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({s.activeTasks} tasks)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
                </div>


          <Button
            className="w-full"
            disabled={!selectedStaff}
            onClick={handleAssign}
          >
            Assign Task
          </Button>
            </DialogContent>
       </Dialog>
    )
}