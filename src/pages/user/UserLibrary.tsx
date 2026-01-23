import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BookOpen, Clock, PlayCircle, Lock, CheckCircle2, AlertTriangle, Video, FileText, Box } from 'lucide-react';

const modules = [
  {
    id: 1,
    name: 'Introduction to Workplace Safety',
    course: 'Workplace Safety Training',
    duration: '30 min',
    progress: 100,
    status: 'completed',
    type: 'video',
    order: 1,
    isLocked: false,
  },
  {
    id: 2,
    name: 'Hazard Identification',
    course: 'Workplace Safety Training',
    duration: '45 min',
    progress: 100,
    status: 'completed',
    type: 'video',
    order: 2,
    isLocked: false,
  },
  {
    id: 3,
    name: 'Personal Protective Equipment',
    course: 'Workplace Safety Training',
    duration: '35 min',
    progress: 60,
    status: 'in_progress',
    type: 'video',
    order: 3,
    isLocked: false,
  },
  {
    id: 4,
    name: 'Emergency Procedures',
    course: 'Workplace Safety Training',
    duration: '40 min',
    progress: 0,
    status: 'locked',
    type: 'video',
    order: 4,
    isLocked: true,
  },
  {
    id: 5,
    name: 'Safety Documentation',
    course: 'Workplace Safety Training',
    duration: '25 min',
    progress: 0,
    status: 'locked',
    type: 'pdf',
    order: 5,
    isLocked: true,
  },
  {
    id: 6,
    name: 'Fire Prevention Basics',
    course: 'Fire Safety Essentials',
    duration: '35 min',
    progress: 100,
    status: 'completed',
    type: 'video',
    order: 1,
    isLocked: false,
  },
  {
    id: 7,
    name: 'Fire Extinguisher Training',
    course: 'Fire Safety Essentials',
    duration: '40 min',
    progress: 50,
    status: 'in_progress',
    type: 'xr',
    order: 2,
    isLocked: false,
  },
  {
    id: 8,
    name: 'Evacuation Procedures',
    course: 'Fire Safety Essentials',
    duration: '30 min',
    progress: 0,
    status: 'locked',
    type: 'video',
    order: 3,
    isLocked: true,
  },
];

const UserLibrary = () => {
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [selectedModule, setSelectedModule] = useState<typeof modules[0] | null>(null);

  const handleModuleClick = (module: typeof modules[0]) => {
    if (module.isLocked) {
      setSelectedModule(module);
      setShowLockDialog(true);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'xr': return <Box className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">In Progress</Badge>;
      case 'locked':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Locked</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (module: typeof modules[0]) => {
    if (module.isLocked) {
      return (
        <Button variant="outline" size="sm" disabled className="gap-2">
          <Lock className="h-4 w-4" />
          Locked
        </Button>
      );
    }
    if (module.status === 'completed') {
      return (
        <Button variant="outline" size="sm" className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Review
        </Button>
      );
    }
    if (module.status === 'in_progress') {
      return (
        <Button size="sm" className="gap-2 bg-user-accent hover:bg-user-accent/90">
          <PlayCircle className="h-4 w-4" />
          Resume
        </Button>
      );
    }
    return (
      <Button size="sm" className="gap-2 bg-user-accent hover:bg-user-accent/90">
        <PlayCircle className="h-4 w-4" />
        Start
      </Button>
    );
  };

  // Group modules by course
  const groupedModules = modules.reduce((acc, module) => {
    if (!acc[module.course]) {
      acc[module.course] = [];
    }
    acc[module.course].push(module);
    return acc;
  }, {} as Record<string, typeof modules>);

  const getCourseProgress = (courseModules: typeof modules) => {
    const completed = courseModules.filter(m => m.status === 'completed').length;
    return Math.round((completed / courseModules.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Learning Library</h1>
        <p className="text-muted-foreground">Access your course modules and learning materials</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Modules</p>
                <p className="text-2xl font-bold text-blue-700">{modules.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <p className="text-2xl font-bold text-green-700">
                  {modules.filter(m => m.status === 'completed').length}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-700">
                  {modules.filter(m => m.status === 'in_progress').length}
                </p>
              </div>
              <PlayCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Locked</p>
                <p className="text-2xl font-bold text-gray-700">
                  {modules.filter(m => m.status === 'locked').length}
                </p>
              </div>
              <Lock className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules by Course */}
      {Object.entries(groupedModules).map(([courseName, courseModules]) => (
        <Card key={courseName}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-user-accent" />
                {courseName}
              </CardTitle>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {courseModules.filter(m => m.status === 'completed').length}/{courseModules.length} completed
                </span>
                <div className="w-24">
                  <Progress value={getCourseProgress(courseModules)} className="h-2" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courseModules
                .sort((a, b) => a.order - b.order)
                .map((module, index) => (
                  <div
                    key={module.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                      module.isLocked 
                        ? 'bg-gray-50 opacity-60 cursor-not-allowed' 
                        : 'hover:bg-muted/50 cursor-pointer'
                    }`}
                    onClick={() => handleModuleClick(module)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        module.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : module.status === 'in_progress'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {module.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : module.isLocked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{module.name}</h4>
                          {getStatusBadge(module.status)}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            {getTypeIcon(module.type)}
                            {module.type.toUpperCase()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {module.duration}
                          </span>
                        </div>
                        {module.status === 'in_progress' && (
                          <div className="mt-2 w-48">
                            <Progress value={module.progress} className="h-1.5" />
                            <span className="text-xs text-muted-foreground">{module.progress}% complete</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      {getActionButton(module)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Lock Dialog */}
      <Dialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Module Locked
            </DialogTitle>
            <DialogDescription>
              This module is currently locked. You must complete the previous modules in sequence before accessing this content.
            </DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="py-4">
              <p className="font-medium">{selectedModule.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Please complete all previous modules in "{selectedModule.course}" to unlock this content.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLockDialog(false)}>
              Understood
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserLibrary;
