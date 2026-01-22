import { useState } from 'react';
import type { Issue } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Camera, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResolveDialogProps {
  task: Issue;
  onResolve: () => void;
  inputId?: string;
}

export function ResolveDialog({ task, onResolve, inputId }: ResolveDialogProps) {
  const [photo, setPhoto] = useState('');
  const [notes, setNotes] = useState('');
  const [open, setOpen] = useState(false);

  const uniqueId = inputId || `after-photo-${task.id}`;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onResolve();
    setOpen(false);
    setPhoto('');
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Resolve
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as Resolved</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="font-medium text-sm">{task.title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {task.location.address}
            </p>
          </div>

          <div>
            <Label>Upload "After" Photo *</Label>
            <div
              className={cn(
                'mt-1.5 border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer hover:border-primary/50',
                photo ? 'border-success' : 'border-muted'
              )}
              onClick={() => document.getElementById(uniqueId)?.click()}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="After"
                  className="max-h-32 mx-auto rounded-lg"
                />
              ) : (
                <>
                  <Camera className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload completion photo
                  </p>
                </>
              )}
              <input
                id={uniqueId}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`notes-${task.id}`}>Resolution Notes</Label>
            <Input
              id={`notes-${task.id}`}
              placeholder="Brief description of work done..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <Button
            className="w-full gap-2"
            disabled={!photo}
            onClick={handleSubmit}
          >
            <Upload className="h-4 w-4" />
            Submit Resolution
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
