import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, PlayCircle, Calendar, Clock, Monitor, CheckCircle2, AlertCircle } from 'lucide-react';

const kpiData = [
  { title: 'Courses Enrolled', value: '8', icon: BookOpen, change: '+2 this month', color: 'text-blue-600' },
  { title: 'Courses Running', value: '3', icon: PlayCircle, change: 'In progress', color: 'text-orange-600' },
  { title: 'Events Completed', value: '12', icon: CheckCircle2, change: '+4 this month', color: 'text-green-600' },
  { title: 'Upcoming Events', value: '5', icon: Calendar, change: 'Next 7 days', color: 'text-purple-600' },
];

const activityTimeline = [
  {
    id: 1,
    type: 'module',
    title: 'Completed Module: Safety Protocols',
    course: 'Workplace Safety Training',
    time: '2 hours ago',
    duration: '45 min',
    status: 'completed'
  },
  {
    id: 2,
    type: 'assessment',
    title: 'Started Assessment: Fire Safety Quiz',
    course: 'Fire Safety Essentials',
    time: '4 hours ago',
    duration: '20 min',
    status: 'in_progress'
  },
  {
    id: 3,
    type: 'event',
    title: 'Attended: Virtual Safety Workshop',
    course: 'Monthly Safety Meeting',
    time: 'Yesterday',
    duration: '1.5 hours',
    status: 'completed'
  },
  {
    id: 4,
    type: 'module',
    title: 'Resumed Module: Emergency Procedures',
    course: 'Emergency Response Training',
    time: 'Yesterday',
    duration: '30 min',
    status: 'in_progress'
  },
  {
    id: 5,
    type: 'certificate',
    title: 'Certificate Earned: Basic Safety',
    course: 'Basic Safety Certification',
    time: '3 days ago',
    duration: '-',
    status: 'completed'
  },
];

const currentCourses = [
  { id: 1, name: 'Workplace Safety Training', progress: 75, modulesCompleted: 6, totalModules: 8, lastAccessed: '2 hours ago' },
  { id: 2, name: 'Fire Safety Essentials', progress: 40, modulesCompleted: 2, totalModules: 5, lastAccessed: '4 hours ago' },
  { id: 3, name: 'Emergency Response Training', progress: 20, modulesCompleted: 1, totalModules: 5, lastAccessed: 'Yesterday' },
];

const upcomingEvents = [
  { id: 1, name: 'Safety Drill Practice', date: 'Jan 25, 2026', time: '10:00 AM', type: 'Physical' },
  { id: 2, name: 'First Aid Training', date: 'Jan 27, 2026', time: '2:00 PM', type: 'Online' },
  { id: 3, name: 'Equipment Handling Workshop', date: 'Jan 30, 2026', time: '11:00 AM', type: 'Physical' },
];

const screenActivity = {
  activeTime: '4h 32m',
  idleTime: '45m',
  focusScore: 85,
  sessionsToday: 3,
};

const UserDashboard = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'module': return <BookOpen className="h-4 w-4" />;
      case 'assessment': return <AlertCircle className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'certificate': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-3xl font-bold mt-1">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-muted ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Courses Progress */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-user-accent" />
                Courses In Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{course.name}</h4>
                    <Badge variant="outline">{course.progress}%</Badge>
                  </div>
                  <Progress value={course.progress} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{course.modulesCompleted} of {course.totalModules} modules completed</span>
                    <span>Last accessed: {course.lastAccessed}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Screen Activity Tracking (UI Mock) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-user-accent" />
              Today's Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{screenActivity.activeTime}</p>
                <p className="text-xs text-muted-foreground">Active Time</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{screenActivity.idleTime}</p>
                <p className="text-xs text-muted-foreground">Idle Time</p>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Focus Score</span>
                <span className="text-sm font-bold text-blue-600">{screenActivity.focusScore}%</span>
              </div>
              <Progress value={screenActivity.focusScore} className="h-2" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Sessions Today</span>
              <span className="font-bold">{screenActivity.sessionsToday}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-user-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityTimeline.map((activity, index) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    {index < activityTimeline.length - 1 && (
                      <div className="w-px h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.course}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      {activity.duration !== '-' && (
                        <>
                          <span>•</span>
                          <span>{activity.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-user-accent" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{event.name}</p>
                    <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                  </div>
                  <Badge variant={event.type === 'Online' ? 'default' : 'secondary'}>
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
