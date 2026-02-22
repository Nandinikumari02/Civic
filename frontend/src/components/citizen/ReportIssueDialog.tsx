import { useState, useEffect } from 'react';
import { toast } from 'sonner';
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
import { 
  Camera, MapPin, Upload, CheckCircle, 
  ChevronRight, ChevronLeft, Plus, Loader2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { issueService } from '@/services/issueService';
import { departmentService } from '@/services/departmentService';

const steps = ['Photo', 'Details', 'Location', 'Review'];

export function ReportIssueDialog({ onRefresh }: { onRefresh?: () => void }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // DATA STATES
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState<string>("");

  const [formData, setFormData] = useState({
    photo: null as File | null,
    photoPreview: '',
    title: '',
    description: '',
    categoryId: '',
    address: '',
    lat: 0,
    lng: 0
  });

  // 1. Fetch Departments from Backend
  useEffect(() => {
    if (open) {
      const fetchDepts = async () => {
        try {
          const res = await departmentService.getAllDepartments(); 
          setDepartments(res.data);
        } catch (error: any) {
          console.error("Dept Fetch Error:", error);
          toast.error("Could not load departments from server");
        }
      };
      fetchDepts();
    }
  }, [open]);

  // 2. Real-time Location Detection
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setFormData(prev => ({
            ...prev,
            lat: latitude,
            lng: longitude,
            address: data.display_name || `${latitude}, ${longitude}`
          }));
          toast.success("Location detected!");
        } catch (error) {
          setFormData(prev => ({ ...prev, lat: latitude, lng: longitude }));
          toast.error("Coordinates captured, please type address manually.");
        } finally {
          setIsDetecting(false);
        }
      },
      () => {
        setIsDetecting(false);
        toast.error("Location access denied. Please type manually.");
      }
    );
  };

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

  const handleSubmit = async () => {
    if (!selectedDeptId || !formData.categoryId || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        latitude: formData.lat,
        longitude: formData.lng,
        departmentId: selectedDeptId,
        categoryId: formData.categoryId,
        address: formData.address // Ensure backend accepts address field
      };

      await issueService.createIssue(payload);
      toast.success("Issue Reported Successfully!");
      setOpen(false);
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to submit report");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setSelectedDeptId("");
    setFormData({
      photo: null,
      photoPreview: '',
      title: '',
      description: '',
      categoryId: '',
      address: '',
      lat: 0,
      lng: 0
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Photo optional for now
      case 1: return formData.title && selectedDeptId && formData.categoryId;
      case 2: return formData.address.length > 5;
      default: return true;
    }
  };

  const availableCategories = departments.find(d => d.id === selectedDeptId)?.categories || [];

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) resetForm(); }}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-md">
          <Plus className="h-4 w-4" /> Report Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Report a Civic Issue</DialogTitle>
        </DialogHeader>

        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-8 mt-2 px-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                  index < currentStep ? 'bg-green-500 border-green-500 text-white' : 
                  index === currentStep ? 'bg-primary border-primary text-white' : 
                  'bg-background border-muted text-muted-foreground'
                )}>
                {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={cn('w-12 sm:w-20 h-0.5 mx-1', index < currentStep ? 'bg-green-500' : 'bg-muted')} />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">
          {/* STEP 0: PHOTO */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <Label className="text-sm font-semibold">Step 1: Photo Evidence</Label>
              <div
                className={cn(
                  'border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer hover:bg-muted/50 transition-all',
                  formData.photoPreview ? 'border-green-500 bg-green-50/10' : 'border-muted'
                )}
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                {formData.photoPreview ? (
                  <img src={formData.photoPreview} alt="Preview" className="max-h-48 mx-auto rounded-xl shadow-sm" />
                ) : (
                  <div className="space-y-2 text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto opacity-50" />
                    <p className="text-sm font-medium">Click to upload photo</p>
                  </div>
                )}
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </div>
            </div>
          )}

          {/* STEP 1: DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department *</Label>
                  <Select onValueChange={(val) => { setSelectedDeptId(val); setFormData({...formData, categoryId: ""}) }}>
                    <SelectTrigger><SelectValue placeholder="Select Dept" /></SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select 
                    disabled={!selectedDeptId} 
                    value={formData.categoryId}
                    onValueChange={(val) => setFormData({...formData, categoryId: val})}
                  >
                    <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" className="min-h-[80px]" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Step 3: Confirm Location</Label>
                <Button variant="outline" size="sm" onClick={getLocation} disabled={isDetecting} className="h-8 gap-1">
                  {isDetecting ? <Loader2 className="h-3 w-3 animate-spin" /> : <MapPin className="h-3 w-3" />}
                  Auto-Detect
                </Button>
              </div>
              <Textarea 
                placeholder="Enter address manually or use Auto-Detect..." 
                className="min-h-[80px]" 
                value={formData.address} 
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <div className="h-40 bg-muted rounded-xl overflow-hidden border">
                {formData.lat !== 0 ? (
                  <iframe width="100%" height="100%" src={`https://maps.google.com/maps?q=${formData.lat},${formData.lng}&z=15&output=embed`} className="grayscale opacity-80" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-xs italic">Detect location to see map preview</div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="rounded-2xl border bg-card overflow-hidden">
                <div className="p-3 bg-muted/30 border-b font-bold text-xs text-center uppercase tracking-wider">Review Details</div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Title:</span> <strong>{formData.title}</strong></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Category:</span> <strong>{availableCategories.find((c: any) => c.id === formData.categoryId)?.name || "N/A"}</strong></div>
                  <div className="flex flex-col gap-1 text-sm"><span className="text-muted-foreground">Location:</span> <strong className="text-xs leading-relaxed">{formData.address}</strong></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t mt-4">
          <Button variant="ghost" onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))} disabled={currentStep === 0 || isLoading}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={() => setCurrentStep((prev) => prev + 1)} disabled={!canProceed()} className="px-8">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="px-8 bg-green-600 hover:bg-green-700">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />} Submit Report
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}