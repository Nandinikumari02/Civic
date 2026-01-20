import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
   Mail, Lock, Eye, EyeOff, User, Phone, Shield, Wrench, 
  Crown, Building2, ArrowRight, CheckCircle, Users, Zap 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { type UserRole, type IssueCategory, CATEGORY_LABELS } from '@/types';
import { toast } from 'sonner';

const roleOptions: { value: UserRole; label: string; description: string; icon: React.ElementType }[] = [
  { value: 'citizen', label: 'Citizen', description: 'Report issues and earn rewards', icon: User },
  { value: 'department_admin', label: 'Department Admin', description: 'Manage department operations', icon: Shield },
  { value: 'staff', label: 'Field Staff', description: 'Handle and resolve issues', icon: Wrench },
  { value: 'super_admin', label: 'Super Admin', description: 'Oversee all city operations', icon: Crown },
];

const departmentOptions: IssueCategory[] = ['water', 'electricity', 'roads', 'sanitation', 'streetlights', 'drainage'];

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'citizen' as UserRole,
    department: '' as IssueCategory | ''
  });

  const showDepartmentField = formData.role === 'department_admin' || formData.role === 'staff';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRoleChange = (value: UserRole) => {
    setFormData(prev => ({
      ...prev,
      role: value,
      department: (value === 'department_admin' || value === 'staff') ? prev.department : ''
    }));
  };

  const handleDepartmentChange = (value: IssueCategory) => {
    setFormData(prev => ({
      ...prev,
      department: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (showDepartmentField && !formData.department) {
      toast.error('Please select a department');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      switchRole(formData.role);
      toast.success('Account created successfully!');
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  const selectedRoleInfo = roleOptions.find(r => r.value === formData.role);
  const SelectedIcon = selectedRoleInfo?.icon || User;

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/90 via-primary/70 to-transparent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center  justify-center p-6 py-12">
        <div className="w-full max-w-7xl t rounded-3xl shadow-2xl p-8 lg:p-12">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side - Hero Content */}
          <div className="flex-1 text-white text-center lg:text-left">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold">Civic Sarthi</span>
            </div>

            {/* Hero Content */}
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Join the Movement
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-md mx-auto lg:mx-0">
              Be part of a community that's transforming how cities work.
            </p>

            {/* Stats - Hidden on mobile */}
            <div className="hidden lg:grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '50+', label: 'Cities' },
                { value: '100K+', label: 'Issues Resolved' },
                { value: '500K+', label: 'Active Users' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Features - Hidden on mobile */}
            <div className="hidden lg:block space-y-4">
              {[
                { icon: Zap, text: 'Instant issue reporting' },
                { icon: Users, text: 'Community-driven solutions' },
                { icon: CheckCircle, text: 'Transparent resolution tracking' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg text-white/90">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full max-w-md">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-3xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
                <CardDescription className="text-base">
                  Join the community and start making an impact
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-11 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-11 h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-11 h-11"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Register As</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {roleOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleRoleChange(option.value)}
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-left ${
                            formData.role === option.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <option.icon className={`h-5 w-5 ${
                            formData.role === option.value ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <p className={`text-sm font-medium ${
                              formData.role === option.value ? 'text-primary' : 'text-foreground'
                            }`}>
                              {option.label}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    {selectedRoleInfo && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <SelectedIcon className="h-3 w-3" />
                        {selectedRoleInfo.description}
                      </p>
                    )}
                  </div>

                  {showDepartmentField && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Department</Label>
                      <Select value={formData.department} onValueChange={handleDepartmentChange}>
                        <SelectTrigger className="h-11">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                            <SelectValue placeholder="Select your department" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {departmentOptions.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {CATEGORY_LABELS[dept]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-11 pr-11 h-11"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-11 h-11"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary" 
                      required 
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold gap-2 group" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Creating account...'
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link to="/login" className="text-primary hover:underline font-semibold">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-black/80 mt-6">
              <Link to="/" className="hover:text-white transition-colors inline-flex items-center gap-1">
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
