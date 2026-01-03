import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users, 
  Calendar, 
  FileText, 
  Bell, 
  Settings,
  LogOut,
  TrendingUp,
  UserCheck,
  AlertCircle,
  ChevronRight,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: "Total Employees", value: "248", change: "+12 this month", positive: true },
    { icon: UserCheck, label: "Present Today", value: "231", change: "93% attendance", positive: true },
    { icon: Calendar, label: "Pending Leaves", value: "15", change: "Requires review", positive: false },
    { icon: AlertCircle, label: "Open Tickets", value: "8", change: "HR support", positive: false },
  ];

  const pendingApprovals = [
    { name: "Sarah Johnson", type: "Leave Request", days: "5 days", date: "Dec 25-29", avatar: "SJ" },
    { name: "Michael Chen", type: "Leave Request", days: "2 days", date: "Dec 23-24", avatar: "MC" },
    { name: "Emily Davis", type: "Expense Claim", amount: "$450", date: "Dec 20", avatar: "ED" },
  ];

  const recentHires = [
    { name: "James Wilson", role: "Software Engineer", department: "Engineering", date: "Dec 15" },
    { name: "Anna Martinez", role: "Marketing Manager", department: "Marketing", date: "Dec 10" },
    { name: "David Brown", role: "Financial Analyst", department: "Finance", date: "Dec 5" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">Dayflow</span>
                <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                  Admin
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  5
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
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
            HR Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your organization's workforce management.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  index < 2 ? "bg-secondary/10" : "bg-accent/10"
                }`}>
                  <stat.icon className={`w-5 h-5 ${index < 2 ? "text-secondary" : "text-accent-foreground"}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className={`text-xs ${stat.positive ? "text-success" : "text-muted-foreground"}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <div className="bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">Pending Approvals</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="divide-y divide-border">
              {pendingApprovals.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type} · {item.days || item.amount}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      Reject
                    </Button>
                    <Button size="sm" className="h-8">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Hires */}
          <div className="bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">Recent Hires</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="divide-y divide-border">
              {recentHires.map((hire, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{hire.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {hire.role} · {hire.department}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{hire.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Manage Employees" },
              { icon: Calendar, label: "Leave Calendar" },
              { icon: FileText, label: "Generate Reports" },
              { icon: BarChart3, label: "Analytics" },
            ].map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium text-foreground text-sm">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
