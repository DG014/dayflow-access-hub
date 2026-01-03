import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const OTPInput = ({ length = 6, value, onChange, disabled, error }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const valueArray = value.split("").slice(0, length);
  while (valueArray.length < length) {
    valueArray.push("");
  }

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return;

    const newValue = valueArray.slice();
    newValue[index] = inputValue.slice(-1);
    onChange(newValue.join(""));

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !valueArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pastedData);

    // Focus last filled input or next empty one
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {valueArray.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          disabled={disabled}
          className={cn(
            "w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold rounded-xl border-2 bg-card transition-all duration-200 outline-none",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error && "border-destructive bg-destructive/5",
            !error && focusedIndex === index && "border-primary shadow-sm",
            !error && focusedIndex !== index && "border-border",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
};

export default OTPInput;
