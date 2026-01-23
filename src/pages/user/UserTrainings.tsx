import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, PlayCircle, CheckCircle2, Lock, Calendar } from 'lucide-react';

const trainings = [
  {
    id: 1,
    name: 'Workplace Safety Training',
    description: 'Comprehensive training on workplace safety protocols and procedures.',
    progress: 75,
    totalModules: 8,
    completedModules: 6,
    duration: '4 hours',
    deadline: 'Feb 15, 2026',
    status: 'in_progress',
    lastAccessed: '2 hours ago',
    assessmentRequired: true,
    certificateAvailable: true,
  },
  {
    id: 2,
    name: 'Fire Safety Essentials',
    description: 'Learn fire prevention, detection, and emergency response procedures.',
    progress: 40,
    totalModules: 5,
    completedModules: 2,
    duration: '2.5 hours',
    deadline: 'Feb 20, 2026',
    status: 'in_progress',
    lastAccessed: '4 hours ago',
    assessmentRequired: true,
    certificateAvailable: true,
  },
  {
    id: 3,
    name: 'Emergency Response Training',
    description: 'Training on emergency response procedures and first aid basics.',
    progress: 20,
    totalModules: 5,
    completedModules: 1,
    duration: '3 hours',
    deadline: 'Mar 1, 2026',
    status: 'in_progress',
    lastAccessed: 'Yesterday',
    assessmentRequired: true,
    certificateAvailable: true,
  },
  {
    id: 4,
    name: 'Equipment Handling Course',
    description: 'Safe handling and operation of industrial equipment.',
    progress: 0,
    totalModules: 6,
    completedModules: 0,
    duration: '3.5 hours',
    deadline: 'Mar 15, 2026',
    status: 'not_started',
    lastAccessed: '-',
    assessmentRequired: true,
    certificateAvailable: true,
  },
  {
    id: 5,
    name: 'Basic Safety Certification',
    description: 'Fundamental safety training for all employees.',
    progress: 100,
    totalModules: 4,
    completedModules: 4,
    duration: '2 hours',
    deadline: '-',
    status: 'completed',
    lastAccessed: '3 days ago',
    assessmentRequired: true,
    certificateAvailable: true,
  },
  {
    id: 6,
    name: 'Chemical Safety Handling',
    description: 'Safe practices for handling hazardous chemicals.',
    progress: 100,
    totalModules: 5,
    completedModules: 5,
    duration: '2.5 hours',
    deadline: '-',
    status: 'completed',
    lastAccessed: '1 week ago',
    assessmentRequired: true,
    certificateAvailable: true,
  },
];

const UserTrainings = () => {
  const [activeTab, setActiveTab] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">In Progress</Badge>;
      case 'not_started':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Not Started</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Button variant="outline" size="sm" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Review
          </Button>
        );
      case 'in_progress':
        return (
          <Button size="sm" className="gap-2 bg-user-accent hover:bg-user-accent/90">
            <PlayCircle className="h-4 w-4" />
            Continue
          </Button>
        );
      case 'not_started':
        return (
          <Button size="sm" className="gap-2 bg-user-accent hover:bg-user-accent/90">
            <PlayCircle className="h-4 w-4" />
            Start
          </Button>
        );
      default:
        return null;
    }
  };

  const filteredTrainings = trainings.filter((training) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in_progress') return training.status === 'in_progress';
    if (activeTab === 'completed') return training.status === 'completed';
    if (activeTab === 'not_started') return training.status === 'not_started';
    return true;
  });

  const stats = {
    total: trainings.length,
    inProgress: trainings.filter(t => t.status === 'in_progress').length,
    completed: trainings.filter(t => t.status === 'completed').length,
    notStarted: trainings.filter(t => t.status === 'not_started').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Trainings</h1>
        <p className="text-muted-foreground">View and manage your assigned training courses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Courses</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-700">{stats.inProgress}</p>
              </div>
              <PlayCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Not Started</p>
                <p className="text-2xl font-bold text-gray-700">{stats.notStarted}</p>
              </div>
              <Lock className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Training List */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress ({stats.inProgress})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
              <TabsTrigger value="not_started">Not Started ({stats.notStarted})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTrainings.map((training) => (
              <div
                key={training.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{training.name}</h3>
                      {getStatusBadge(training.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{training.description}</p>
                    
                    {training.status !== 'not_started' && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{training.progress}%</span>
                        </div>
                        <Progress value={training.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {training.completedModules}/{training.totalModules} Modules
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {training.duration}
                      </span>
                      {training.deadline !== '-' && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {training.deadline}
                        </span>
                      )}
                      {training.lastAccessed !== '-' && (
                        <span>Last accessed: {training.lastAccessed}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {training.assessmentRequired && (
                        <Badge variant="outline" className="text-xs">Assessment Required</Badge>
                      )}
                      {training.certificateAvailable && (
                        <Badge variant="outline" className="text-xs">Certificate Available</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getActionButton(training.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTrainings;
