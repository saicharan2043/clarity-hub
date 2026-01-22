import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

// Mock data for charts
const completionTrend = [
  { month: 'Jan', completion: 65 },
  { month: 'Feb', completion: 72 },
  { month: 'Mar', completion: 68 },
  { month: 'Apr', completion: 78 },
  { month: 'May', completion: 82 },
  { month: 'Jun', completion: 85 },
];

const assessmentData = [
  { name: 'Pass', value: 78, color: 'hsl(160, 84%, 39%)' },
  { name: 'Fail', value: 22, color: 'hsl(0, 84%, 60%)' },
];

const attendanceData = [
  { name: 'Week 1', enrolled: 120, attended: 105 },
  { name: 'Week 2', enrolled: 130, attended: 118 },
  { name: 'Week 3', enrolled: 125, attended: 110 },
  { name: 'Week 4', enrolled: 140, attended: 132 },
];

const recentActivity = [
  { course: 'Safety Training 101', users: 45, completion: 89, status: 'active' },
  { course: 'Equipment Handling', users: 32, completion: 76, status: 'active' },
  { course: 'Fire Safety Basics', users: 28, completion: 92, status: 'completed' },
  { course: 'First Aid Essentials', users: 56, completion: 65, status: 'active' },
  { course: 'Workplace Hazards', users: 38, completion: 100, status: 'completed' },
];

const kpiCards = [
  { 
    title: 'Total Courses', 
    value: '24', 
    change: '+3 this month',
    icon: BookOpen,
    trend: 'up'
  },
  { 
    title: 'Active Trainings', 
    value: '8', 
    change: '5 in progress',
    icon: Activity,
    trend: 'up'
  },
  { 
    title: 'Total Users Assigned', 
    value: '256', 
    change: '+18 new users',
    icon: Users,
    trend: 'up'
  },
  { 
    title: 'Avg. Completion', 
    value: '78%', 
    change: '+5% from last month',
    icon: TrendingUp,
    trend: 'up'
  },
  { 
    title: 'Pending Feedback', 
    value: '12', 
    change: '3 urgent',
    icon: MessageSquare,
    trend: 'neutral'
  },
];

const TrainerDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Trainer Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your training activities and learner performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                    <p className="text-xs text-content-accent mt-1">{kpi.change}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-content-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-content-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Trend */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Course Completion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={completionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    stroke="hsl(160, 84%, 39%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(160, 84%, 39%)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Pass/Fail */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Assessment Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assessmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {assessmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {assessmentData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance vs Enrollment */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Attendance vs Enrollment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="enrolled" fill="hsl(214, 100%, 50%)" name="Enrolled" radius={[4, 4, 0, 0]} />
                <Bar dataKey="attended" fill="hsl(160, 84%, 39%)" name="Attended" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Table */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-content-accent text-white">
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tl-lg">Course Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">User Count</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Completion %</th>
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{activity.course}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{activity.users}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-content-accent rounded-full" 
                            style={{ width: `${activity.completion}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.completion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        className={activity.status === 'completed' ? 'bg-content-accent' : ''}
                      >
                        {activity.status === 'completed' ? 'Completed' : 'Active'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerDashboard;
