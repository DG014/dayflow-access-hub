import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Mail, Lock, BadgeCheck, AlertCircle } from "lucide-react";
import RoleSelector, { UserRole } from "./RoleSelector";
import PasswordStrengthIndicator, { validatePassword } from "./PasswordStrengthIndicator";
import { z } from "zod";

interface SignUpFormProps {
  onSignUp: (data: SignUpData) => Promise<void>;
  onSwitchToSignIn: () => void;
}

export interface SignUpData {
  employeeId: string;
  email: string;
  password: string;
  role: UserRole;
}

const signUpSchema = z.object({
  employeeId: z.string().trim().min(1, "Employee ID is required").max(50, "Employee ID must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignUpForm = ({ onSignUp, onSwitchToSignIn }: SignUpFormProps) => {
  const [formData, setFormData] = useState<SignUpData>({
    employeeId: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof SignUpData, value: string | UserRole) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate with zod
    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Additional password validation
    if (!validatePassword(formData.password)) {
      setErrors({ password: "Password does not meet security requirements" });
      return;
    }

    setIsLoading(true);
    try {
      await onSignUp(formData);
    } catch (error: any) {
      setErrors({ general: error.message || "An error occurred during sign up" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Create Your Account</h2>
        <p className="text-muted-foreground">Manage your workday efficiently</p>
      </div>

      {/* General Error */}
      {errors.general && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selector */}
        <RoleSelector
          value={formData.role}
          onChange={(role) => handleChange("role", role)}
          disabled={isLoading}
        />

        {/* Employee ID */}
        <div className="space-y-2">
          <Label htmlFor="employeeId" className="text-sm font-medium">
            Employee ID
          </Label>
          <div className="relative">
            <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="employeeId"
              type="text"
              placeholder="e.g. EMP-001"
              value={formData.employeeId}
              onChange={(e) => handleChange("employeeId", e.target.value)}
              className={`pl-10 h-12 ${errors.employeeId ? "border-destructive focus-visible:ring-destructive" : ""}`}
              disabled={isLoading}
            />
          </div>
          {errors.employeeId && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.employeeId}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`pl-10 h-12 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`pl-10 pr-12 h-12 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.password}
            </p>
          )}
          <PasswordStrengthIndicator password={formData.password} />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      {/* Switch to Sign In */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-semibold text-primary hover:underline underline-offset-2 transition-colors"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;
