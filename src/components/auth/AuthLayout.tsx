import { ReactNode } from "react";
import { Clock, Users, Calendar, Shield } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
          
          {/* Geometric shapes */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="20" cy="30" r="15" fill="currentColor" className="text-primary-foreground" />
            <circle cx="80" cy="70" r="20" fill="currentColor" className="text-primary-foreground" />
            <path d="M0 80 Q 50 50 100 80 L 100 100 L 0 100 Z" fill="currentColor" className="text-primary-foreground/50" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <Clock className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground tracking-tight">Dayflow</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight">
                Every workday,<br />
                <span className="text-primary-foreground/80">perfectly aligned.</span>
              </h1>
              <p className="text-lg text-primary-foreground/70 max-w-md leading-relaxed">
                Streamline your HR operations with intelligent workforce management. Track time, manage teams, and stay compliant—all in one place.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <FeaturePill icon={<Users className="w-4 h-4" />} text="Team Management" />
              <FeaturePill icon={<Calendar className="w-4 h-4" />} text="Leave Tracking" />
              <FeaturePill icon={<Shield className="w-4 h-4" />} text="Secure & Compliant" />
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Dayflow. Built for modern workplaces.
          </p>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Dayflow</span>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

const FeaturePill = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground/90 text-sm font-medium">
    {icon}
    {text}
  </div>
);

export default AuthLayout;
