import { User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserRole = "employee" | "hr_officer";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}

const RoleSelector = ({ value, onChange, disabled }: RoleSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Select Your Role</label>
      <div className="grid grid-cols-2 gap-3">
        <RoleButton
          role="employee"
          label="Employee"
          description="Staff member"
          icon={<User className="w-5 h-5" />}
          isSelected={value === "employee"}
          onClick={() => onChange("employee")}
          disabled={disabled}
        />
        <RoleButton
          role="hr_officer"
          label="Admin / HR"
          description="HR Officer"
          icon={<Shield className="w-5 h-5" />}
          isSelected={value === "hr_officer"}
          onClick={() => onChange("hr_officer")}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

interface RoleButtonProps {
  role: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const RoleButton = ({ label, description, icon, isSelected, onClick, disabled }: RoleButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isSelected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-primary/50 hover:bg-muted/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Selection indicator */}
      <div
        className={cn(
          "absolute top-2 right-2 w-4 h-4 rounded-full border-2 transition-all duration-200",
          isSelected
            ? "border-primary bg-primary"
            : "border-muted"
        )}
      >
        {isSelected && (
          <svg
            className="w-full h-full text-primary-foreground p-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </div>
      <div className="text-center">
        <p className={cn(
          "text-sm font-semibold transition-colors duration-200",
          isSelected ? "text-primary" : "text-foreground"
        )}>
          {label}
        </p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};

export default RoleSelector;
