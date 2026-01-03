import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm, { SignUpData } from "@/components/auth/SignUpForm";
import SignInForm, { SignInData } from "@/components/auth/SignInForm";
import EmailVerification from "@/components/auth/EmailVerification";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthMode = "signin" | "signup" | "verify";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingRole, setPendingRole] = useState<"employee" | "hr_officer">("employee");

  const handleSignUp = async (data: SignUpData) => {
    // Simulate API call - In production, this would call your backend
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Store pending data for verification
    setPendingEmail(data.email);
    setPendingRole(data.role);
    
    // Show verification screen
    setMode("verify");
    toast.success("Verification code sent!", {
      description: "Please check your email for the 6-digit code.",
    });
  };

  const handleSignIn = async (data: SignInData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Demo: Check for demo credentials
    if (data.email === "demo@company.com" && data.password === "Demo@123") {
      toast.success("Welcome back!", {
        description: "Redirecting to your dashboard...",
      });
      // Demo redirect to employee dashboard
      setTimeout(() => navigate("/employee-dashboard"), 1000);
      return;
    }
    
    if (data.email === "admin@company.com" && data.password === "Admin@123") {
      toast.success("Welcome back, Admin!", {
        description: "Redirecting to admin dashboard...",
      });
      setTimeout(() => navigate("/admin-dashboard"), 1000);
      return;
    }
    
    // Simulate unverified email error for specific email
    if (data.email.includes("unverified")) {
      throw new Error("Please verify your email before signing in");
    }
    
    // Default error
    throw new Error("Invalid email or password");
  };

  const handleVerify = async (code: string) => {
    // Simulate verification API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Demo: Accept any 6-digit code
    if (code.length === 6) {
      toast.success("Email verified successfully!", {
        description: "Redirecting to your dashboard...",
      });
      
      // Redirect based on role
      setTimeout(() => {
        if (pendingRole === "hr_officer") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }, 1500);
      return;
    }
    
    throw new Error("Invalid verification code");
  };

  const handleResendCode = async () => {
    // Simulate resend API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("New code sent!", {
      description: "Please check your email.",
    });
  };

  const handleForgotPassword = () => {
    toast.info("Password reset", {
      description: "This feature will be available soon.",
    });
  };

  return (
    <AuthLayout>
      <div className="bg-card rounded-2xl border border-border shadow-lg p-6 sm:p-8">
        {mode === "signin" && (
          <SignInForm
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setMode("signup")}
            onForgotPassword={handleForgotPassword}
          />
        )}
        {mode === "signup" && (
          <SignUpForm
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setMode("signin")}
          />
        )}
        {mode === "verify" && (
          <EmailVerification
            email={pendingEmail}
            onVerify={handleVerify}
            onResendCode={handleResendCode}
            onBack={() => setMode("signup")}
          />
        )}
      </div>

      {/* Demo Credentials Info */}
      <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
        <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p><span className="font-medium">Employee:</span> demo@company.com / Demo@123</p>
          <p><span className="font-medium">Admin:</span> admin@company.com / Admin@123</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Auth;
