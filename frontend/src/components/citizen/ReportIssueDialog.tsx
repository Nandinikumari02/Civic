import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type IssueCategory, CATEGORY_LABELS } from '@/types';
import { Camera, MapPin, Upload, CheckCircle, ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';


const steps = ['Photo', 'Details', 'Location', 'Review'];

export function ReportIssueDialog() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    photo: null as File | null,
    photoPreview: '',
    title: '',
    description: '',
    category: '' as IssueCategory | '',
    address: 'MG Road, Sector 14, Delhi',
  });
 

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = () => {
    
    setOpen(false);
    setCurrentStep(0);
    setFormData({
      photo: null,
      photoPreview: '',
      title: '',
      description: '',
      category: '',
      address: 'MG Road, Sector 14, Delhi',
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true; // Photo is optional
      case 1:
        return formData.title && formData.category;
      case 2:
        return formData.address;
      default:
        return true;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Report Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report a Civic Issue</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  index < currentStep
                    ? 'bg-success text-success-foreground'
                    : index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-12 h-0.5 mx-1',
                    index < currentStep ? 'bg-success' : 'bg-muted'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[200px]">
          {currentStep === 0 && (
            <div className="space-y-4">
              <Label>Upload Photo (Optional)</Label>
              <div
                className={cn(
                  'border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer hover:border-primary/50',
                  formData.photoPreview ? 'border-success' : 'border-muted'
                )}
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                {formData.photoPreview ? (
                  <img
                    src={formData.photoPreview}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded-lg"
                  />
                ) : (
                  <>
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </>
                )}
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as IssueCategory })
                  }
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about the issue..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1.5 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Label>Location</Label>
              <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Current Location</p>
                  <p className="text-xs text-muted-foreground">{formData.address}</p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              <div className="h-40 bg-muted rounded-xl flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Map Preview</p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                {formData.photoPreview && (
                  <img
                    src={formData.photoPreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium">
                    {formData.category
                      ? CATEGORY_LABELS[formData.category]
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Title</p>
                  <p className="font-medium">{formData.title || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{formData.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2">
              <Upload className="h-4 w-4" />
              Submit Report
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
