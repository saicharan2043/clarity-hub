import { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface AssessmentReport {
  id: string;
  userName: string;
  assessmentName: string;
  course: string;
  attemptCount: number;
  score: number;
  result: 'pass' | 'fail';
  date: string;
}

const mockReports: AssessmentReport[] = [
  { id: '1', userName: 'John Smith', assessmentName: 'Safety Training Final', course: 'Safety Training 101', attemptCount: 1, score: 92, result: 'pass', date: '2025-01-20' },
  { id: '2', userName: 'Sarah Johnson', assessmentName: 'Safety Training Final', course: 'Safety Training 101', attemptCount: 2, score: 85, result: 'pass', date: '2025-01-19' },
  { id: '3', userName: 'Mike Wilson', assessmentName: 'Equipment Certification', course: 'Equipment Handling', attemptCount: 1, score: 68, result: 'fail', date: '2025-01-18' },
  { id: '4', userName: 'Emily Brown', assessmentName: 'Fire Safety Quiz', course: 'Fire Safety Basics', attemptCount: 3, score: 72, result: 'fail', date: '2025-01-17' },
  { id: '5', userName: 'David Lee', assessmentName: 'Safety Training Final', course: 'Safety Training 101', attemptCount: 1, score: 95, result: 'pass', date: '2025-01-16' },
  { id: '6', userName: 'Lisa Chen', assessmentName: 'Equipment Certification', course: 'Equipment Handling', attemptCount: 2, score: 88, result: 'pass', date: '2025-01-15' },
];

const TrainerAssessmentReports = () => {
  const [reports] = useState<AssessmentReport[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState('all');
  const [filterAssessment, setFilterAssessment] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesResult = filterResult === 'all' || report.result === filterResult;
    const matchesAssessment = filterAssessment === 'all' || report.assessmentName === filterAssessment;
    return matchesSearch && matchesResult && matchesAssessment;
  });

  const uniqueAssessments = [...new Set(reports.map(r => r.assessmentName))];

  const handleDownload = (id: string, format: 'pdf' | 'excel') => {
    toast.success(`Downloading report as ${format.toUpperCase()}...`);
  };

  const stats = {
    total: reports.length,
    passed: reports.filter(r => r.result === 'pass').length,
    failed: reports.filter(r => r.result === 'fail').length,
    avgScore: Math.round(reports.reduce((acc, r) => acc + r.score, 0) / reports.length),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Assessment Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and analyze assessment results
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleDownload('all', 'excel')} className="gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Attempts</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-content-accent">{stats.passed}</p>
            <p className="text-sm text-muted-foreground">Passed</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{stats.failed}</p>
            <p className="text-sm text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.avgScore}%</p>
            <p className="text-sm text-muted-foreground">Avg. Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user name..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterAssessment} onValueChange={setFilterAssessment}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Filter by assessment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assessments</SelectItem>
                {uniqueAssessments.map(assessment => (
                  <SelectItem key={assessment} value={assessment}>{assessment}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterResult} onValueChange={setFilterResult}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="pass">Passed</SelectItem>
                <SelectItem value="fail">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-content-accent text-white">
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tl-lg">User Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Assessment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Course</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Attempts</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Result</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr 
                    key={report.id} 
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{report.userName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{report.assessmentName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{report.course}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{report.attemptCount}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${report.score >= 80 ? 'text-content-accent' : report.score >= 60 ? 'text-yellow-600' : 'text-destructive'}`}>
                        {report.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        className={report.result === 'pass' ? 'bg-content-accent' : 'bg-destructive'}
                      >
                        {report.result === 'pass' ? 'Pass' : 'Fail'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{report.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownload(report.id, 'pdf')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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

export default TrainerAssessmentReports;
