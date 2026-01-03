import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import OTPInput from "./OTPInput";
import { cn } from "@/lib/utils";

interface EmailVerificationProps {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onResendCode: () => Promise<void>;
  onBack: () => void;
}

const EmailVerification = ({ email, onVerify, onResendCode, onBack }: EmailVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Mask email
  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) return email;
    return `${localPart[0]}***@${domain}`;
  };

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !isLoading) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await onVerify(otp);
      setIsSuccess(true);
    } catch (error: any) {
      setError(error.message || "Invalid or expired verification code");
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");

    try {
      await onResendCode();
      setResendCooldown(30);
    } catch (error: any) {
      setError(error.message || "Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-success animate-in zoom-in-50 duration-300" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Email Verified!</h2>
          <p className="text-muted-foreground">Your account has been verified successfully. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Verify Your Email</h2>
          <p className="text-muted-foreground">
            We've sent a verification code to
            <br />
            <span className="font-medium text-foreground">{maskEmail(email)}</span>
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* OTP Input */}
      <div className="space-y-4">
        <OTPInput
          value={otp}
          onChange={setOtp}
          disabled={isLoading}
          error={!!error}
        />

        <p className="text-xs text-center text-muted-foreground">
          Enter the 6-digit code from your email
        </p>
      </div>

      {/* Verify Button */}
      <Button
        onClick={handleVerify}
        className="w-full h-12 text-base font-semibold"
        disabled={isLoading || otp.length !== 6}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify Email"
        )}
      </Button>

      {/* Resend Code */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || isResending}
            className={cn(
              "font-semibold transition-colors",
              resendCooldown > 0 || isResending
                ? "text-muted-foreground cursor-not-allowed"
                : "text-primary hover:underline underline-offset-2"
            )}
          >
            {isResending ? (
              "Sending..."
            ) : resendCooldown > 0 ? (
              `Resend in ${resendCooldown}s`
            ) : (
              "Resend Code"
            )}
          </button>
        </p>
      </div>

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center justify-center gap-2 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sign Up
      </button>
    </div>
  );
};

export default EmailVerification;
