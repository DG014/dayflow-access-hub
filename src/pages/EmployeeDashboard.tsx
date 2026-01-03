import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Calendar, 
  FileText, 
  Bell, 
  User, 
  LogOut,
  ChevronRight,
  CheckCircle2,
  Clock4,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Clock, label: "Clock In/Out", description: "Track your work hours" },
    { icon: Calendar, label: "Request Leave", description: "Apply for time off" },
    { icon: FileText, label: "View Payslips", description: "Access salary history" },
    { icon: Bell, label: "Announcements", description: "Company updates" },
  ];

  const recentActivity = [
    { type: "clock_in", time: "9:02 AM", date: "Today", status: "on_time" },
    { type: "leave_approved", time: "2:30 PM", date: "Yesterday", status: "approved" },
    { type: "clock_out", time: "6:15 PM", date: "Yesterday", status: "on_time" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Dayflow</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/auth")}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Good morning, John! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your workday today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Clock4}
            label="Hours This Week"
            value="32.5"
            change="+2.5 from last week"
            positive
          />
          <StatCard
            icon={Calendar}
            label="Leave Balance"
            value="12 days"
            change="Annual leave"
          />
          <StatCard
            icon={CheckCircle2}
            label="Attendance Rate"
            value="98%"
            change="This month"
            positive
          />
          <StatCard
            icon={TrendingUp}
            label="Performance Score"
            value="4.8"
            change="Out of 5.0"
            positive
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{action.label}</p>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border-b border-border last:border-b-0"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.status === "approved" ? "bg-success/10" : "bg-primary/10"
                }`}>
                  {activity.type === "clock_in" && <Clock className="w-5 h-5 text-primary" />}
                  {activity.type === "clock_out" && <LogOut className="w-5 h-5 text-primary" />}
                  {activity.type === "leave_approved" && <CheckCircle2 className="w-5 h-5 text-success" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {activity.type === "clock_in" && "Clocked In"}
                    {activity.type === "clock_out" && "Clocked Out"}
                    {activity.type === "leave_approved" && "Leave Request Approved"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time} · {activity.date}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  activity.status === "on_time" 
                    ? "bg-success/10 text-success" 
                    : "bg-primary/10 text-primary"
                }`}>
                  {activity.status === "on_time" ? "On Time" : "Approved"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}

const StatCard = ({ icon: Icon, label, value, change, positive }: StatCardProps) => (
  <div className="bg-card rounded-xl border border-border p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
    <p className={`text-xs ${positive ? "text-success" : "text-muted-foreground"}`}>
      {change}
    </p>
  </div>
);

export default EmployeeDashboard;
