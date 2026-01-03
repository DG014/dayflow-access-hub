import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface PasswordRule {
  label: string;
  test: (password: string) => boolean;
}

const passwordRules: PasswordRule[] = [
  { label: "Minimum 8 characters", test: (p) => p.length >= 8 },
  { label: "At least 1 uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "At least 1 number", test: (p) => /[0-9]/.test(p) },
  { label: "At least 1 special character", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

export const validatePassword = (password: string): boolean => {
  return passwordRules.every((rule) => rule.test(password));
};

export const getPasswordStrength = (password: string): number => {
  return passwordRules.filter((rule) => rule.test(password)).length;
};

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const strength = getPasswordStrength(password);
  const strengthPercent = (strength / passwordRules.length) * 100;

  const getStrengthColor = () => {
    if (strength <= 1) return "bg-destructive";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-yellow-500";
    return "bg-success";
  };

  const getStrengthLabel = () => {
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  if (!password) return null;

  return (
    <div className="space-y-3 mt-3 p-4 rounded-lg bg-muted/50 border border-border">
      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground">Password Strength</span>
          <span
            className={cn(
              "text-xs font-semibold",
              strength <= 1 && "text-destructive",
              strength === 2 && "text-orange-500",
              strength === 3 && "text-yellow-600",
              strength === 4 && "text-success"
            )}
          >
            {getStrengthLabel()}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-300", getStrengthColor())}
            style={{ width: `${strengthPercent}%` }}
          />
        </div>
      </div>

      {/* Rules List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {passwordRules.map((rule, index) => {
          const passed = rule.test(password);
          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors duration-200",
                passed ? "text-success" : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-200",
                  passed ? "bg-success" : "bg-muted"
                )}
              >
                {passed ? (
                  <Check className="w-3 h-3 text-success-foreground" />
                ) : (
                  <X className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
              {rule.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
