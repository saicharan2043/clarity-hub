import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, AlertTriangle, CheckCircle2, XCircle, PlayCircle, RotateCcw } from 'lucide-react';

const assessments = [
  {
    id: 1,
    name: 'Workplace Safety Assessment',
    course: 'Workplace Safety Training',
    duration: '30 min',
    questions: 20,
    passingScore: 80,
    maxAttempts: 3,
    attemptsUsed: 0,
    status: 'pending',
    score: null,
    lastAttempt: null,
  },
  {
    id: 2,
    name: 'Fire Safety Quiz',
    course: 'Fire Safety Essentials',
    duration: '20 min',
    questions: 15,
    passingScore: 75,
    maxAttempts: 3,
    attemptsUsed: 1,
    status: 'failed',
    score: 60,
    lastAttempt: 'Jan 20, 2026',
  },
  {
    id: 3,
    name: 'Emergency Response Test',
    course: 'Emergency Response Training',
    duration: '25 min',
    questions: 18,
    passingScore: 80,
    maxAttempts: 3,
    attemptsUsed: 2,
    status: 'failed',
    score: 70,
    lastAttempt: 'Jan 18, 2026',
  },
  {
    id: 4,
    name: 'Basic Safety Certification Exam',
    course: 'Basic Safety Certification',
    duration: '45 min',
    questions: 30,
    passingScore: 85,
    maxAttempts: 3,
    attemptsUsed: 1,
    status: 'passed',
    score: 92,
    lastAttempt: 'Jan 10, 2026',
  },
  {
    id: 5,
    name: 'Chemical Safety Assessment',
    course: 'Chemical Safety Handling',
    duration: '30 min',
    questions: 20,
    passingScore: 80,
    maxAttempts: 3,
    attemptsUsed: 2,
    status: 'passed',
    score: 85,
    lastAttempt: 'Jan 5, 2026',
  },
];

const UserAssessments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [showDeactivationDialog, setShowDeactivationDialog] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<typeof assessments[0] | null>(null);

  const handleStartAssessment = (assessment: typeof assessments[0]) => {
    setSelectedAssessment(assessment);
    
    // Check if this would be their last attempt
    if (assessment.attemptsUsed === 2) {
      setShowWarningDialog(true);
    }
  };

  const handleRetryAssessment = (assessment: typeof assessments[0]) => {
    setSelectedAssessment(assessment);
    
    // Simulate failure on 3rd attempt for demo
    if (assessment.attemptsUsed === 2) {
      setShowDeactivationDialog(true);
    } else {
      setShowWarningDialog(true);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Failed</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Pending</Badge>;
      default:
        return null;
    }
  };

  const getAttemptsColor = (used: number, max: number) => {
    const remaining = max - used;
    if (remaining === 1) return 'text-red-600';
    if (remaining === 2) return 'text-orange-600';
    return 'text-green-600';
  };

  const filteredAssessments = assessments.filter((a) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return a.status === 'pending';
    if (activeTab === 'passed') return a.status === 'passed';
    if (activeTab === 'failed') return a.status === 'failed';
    return true;
  });

  const stats = {
    total: assessments.length,
    pending: assessments.filter(a => a.status === 'pending').length,
    passed: assessments.filter(a => a.status === 'passed').length,
    failed: assessments.filter(a => a.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Assessments</h1>
        <p className="text-muted-foreground">Complete assessments to earn your certifications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Passed</p>
                <p className="text-2xl font-bold text-green-700">{stats.passed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Failed</p>
                <p className="text-2xl font-bold text-red-700">{stats.failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800">Important Assessment Rules</h4>
              <p className="text-sm text-orange-700 mt-1">
                You have a maximum of 3 attempts per assessment. After 3 failed attempts, your account will be 
                temporarily deactivated and a trainer will need to reactivate it.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessments List */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="passed">Passed ({stats.passed})</TabsTrigger>
              <TabsTrigger value="failed">Failed ({stats.failed})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{assessment.name}</h3>
                      {getStatusBadge(assessment.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{assessment.course}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {assessment.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Questions</p>
                        <p className="font-medium">{assessment.questions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Passing Score</p>
                        <p className="font-medium">{assessment.passingScore}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Attempts</p>
                        <p className={`font-medium ${getAttemptsColor(assessment.attemptsUsed, assessment.maxAttempts)}`}>
                          {assessment.attemptsUsed}/{assessment.maxAttempts} used
                        </p>
                      </div>
                    </div>

                    {assessment.score !== null && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Your Score</p>
                            <p className={`text-xl font-bold ${assessment.score >= assessment.passingScore ? 'text-green-600' : 'text-red-600'}`}>
                              {assessment.score}%
                            </p>
                          </div>
                          <div className="flex-1 max-w-xs">
                            <Progress 
                              value={assessment.score} 
                              className={`h-2 ${assessment.score >= assessment.passingScore ? '[&>div]:bg-green-500' : '[&>div]:bg-red-500'}`}
                            />
                          </div>
                          {assessment.lastAttempt && (
                            <p className="text-sm text-muted-foreground">
                              Last attempt: {assessment.lastAttempt}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {assessment.status === 'pending' && (
                      <Button 
                        className="gap-2 bg-user-accent hover:bg-user-accent/90"
                        onClick={() => handleStartAssessment(assessment)}
                      >
                        <PlayCircle className="h-4 w-4" />
                        Start Assessment
                      </Button>
                    )}
                    {assessment.status === 'failed' && assessment.attemptsUsed < assessment.maxAttempts && (
                      <Button 
                        className="gap-2 bg-user-accent hover:bg-user-accent/90"
                        onClick={() => handleRetryAssessment(assessment)}
                      >
                        <RotateCcw className="h-4 w-4" />
                        Retry ({assessment.maxAttempts - assessment.attemptsUsed} left)
                      </Button>
                    )}
                    {assessment.status === 'passed' && (
                      <Button variant="outline" className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        View Results
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warning Dialog - After Failed Attempt */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Warning: Limited Attempts Remaining
            </DialogTitle>
            <DialogDescription>
              {selectedAssessment && selectedAssessment.attemptsUsed === 2 ? (
                <span className="text-red-600 font-medium">
                  This is your FINAL attempt! If you fail this assessment, your account will be temporarily 
                  deactivated and you will need to contact your trainer to reactivate it.
                </span>
              ) : (
                <span>
                  You have {selectedAssessment ? selectedAssessment.maxAttempts - selectedAssessment.attemptsUsed : 0} attempt(s) 
                  remaining. Make sure you are prepared before starting the assessment.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800">Before you start:</h4>
              <ul className="mt-2 space-y-1 text-sm text-orange-700">
                <li>• Review all course materials thoroughly</li>
                <li>• Ensure you have a stable internet connection</li>
                <li>• Set aside uninterrupted time for the assessment</li>
                <li>• Read each question carefully before answering</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWarningDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-user-accent hover:bg-user-accent/90"
              onClick={() => setShowWarningDialog(false)}
            >
              I Understand, Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Account Deactivation Dialog */}
      <Dialog open={showDeactivationDialog} onOpenChange={setShowDeactivationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Account Temporarily Deactivated
            </DialogTitle>
            <DialogDescription>
              You have exhausted all 3 attempts for this assessment. Your account has been temporarily deactivated.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-800">What happens next?</h4>
              <ul className="mt-2 space-y-1 text-sm text-red-700">
                <li>• Your trainer has been notified</li>
                <li>• You will need to complete additional training</li>
                <li>• Only your trainer can reactivate your account</li>
                <li>• Contact your trainer for next steps</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeactivationDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAssessments;
