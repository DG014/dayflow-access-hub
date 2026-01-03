import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { z } from "zod";

interface SignInFormProps {
  onSignIn: (data: SignInData) => Promise<void>;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
}

export interface SignInData {
  email: string;
  password: string;
}

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const SignInForm = ({ onSignIn, onSwitchToSignUp, onForgotPassword }: SignInFormProps) => {
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof SignInData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signInSchema.safeParse(formData);
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

    setIsLoading(true);
    try {
      await onSignIn(formData);
    } catch (error: any) {
      setErrors({ general: error.message || "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Welcome Back</h2>
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
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="signin-email"
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
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password" className="text-sm font-medium">
              Password
            </Label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-medium text-primary hover:underline underline-offset-2 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Switch to Sign Up */}
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-semibold text-primary hover:underline underline-offset-2 transition-colors"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
