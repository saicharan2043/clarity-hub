import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Download, Calendar, FileText, Clock, CheckCircle2 } from 'lucide-react';

const certificates = [
  {
    id: 'CERT-2026-001',
    name: 'Basic Safety Certification',
    course: 'Basic Safety Certification',
    issuedDate: 'Jan 10, 2026',
    expiryDate: 'Jan 10, 2027',
    status: 'active',
    completionDate: 'Jan 10, 2026',
    trainingName: 'Workplace Safety Program',
    modulesCompleted: 4,
  },
  {
    id: 'CERT-2026-002',
    name: 'Chemical Safety Handler',
    course: 'Chemical Safety Handling',
    issuedDate: 'Jan 5, 2026',
    expiryDate: 'Jan 5, 2027',
    status: 'active',
    completionDate: 'Jan 5, 2026',
    trainingName: 'Chemical Safety Program',
    modulesCompleted: 5,
  },
  {
    id: 'CERT-2025-015',
    name: 'Fire Safety Awareness',
    course: 'Fire Safety Basics',
    issuedDate: 'Dec 15, 2025',
    expiryDate: 'Dec 15, 2026',
    status: 'active',
    completionDate: 'Dec 15, 2025',
    trainingName: 'Fire Safety Program',
    modulesCompleted: 3,
  },
  {
    id: 'CERT-2024-042',
    name: 'First Aid Responder',
    course: 'First Aid Training',
    issuedDate: 'Nov 20, 2024',
    expiryDate: 'Nov 20, 2025',
    status: 'expired',
    completionDate: 'Nov 20, 2024',
    trainingName: 'Emergency Response Program',
    modulesCompleted: 6,
  },
];

const pendingCertificates = [
  {
    id: 1,
    name: 'Workplace Safety Expert',
    course: 'Workplace Safety Training',
    progress: 75,
    requirements: {
      modulesCompleted: false,
      assessmentPassed: false,
      waitingPeriod: false,
    },
    estimatedCompletion: 'Feb 15, 2026',
  },
  {
    id: 2,
    name: 'Fire Safety Specialist',
    course: 'Fire Safety Essentials',
    progress: 40,
    requirements: {
      modulesCompleted: false,
      assessmentPassed: false,
      waitingPeriod: false,
    },
    estimatedCompletion: 'Mar 1, 2026',
  },
];

const UserCertificates = () => {
  const activeCertificates = certificates.filter(c => c.status === 'active');
  const expiredCertificates = certificates.filter(c => c.status === 'expired');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Certificates</h1>
        <p className="text-muted-foreground">View and download your earned certificates</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Active Certificates</p>
                <p className="text-2xl font-bold text-green-700">{activeCertificates.length}</p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-700">{pendingCertificates.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Expired</p>
                <p className="text-2xl font-bold text-red-700">{expiredCertificates.length}</p>
              </div>
              <FileText className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Earned</p>
                <p className="text-2xl font-bold text-blue-700">{certificates.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificate Requirements Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Certificate Requirements</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Complete all course modules</li>
                <li>• Pass the final assessment</li>
                <li>• Wait 15 days after training completion (gap period)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            Active Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCertificates.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.course}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Certificate ID</span>
                    <span className="font-mono">{cert.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Training</span>
                    <span>{cert.trainingName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Modules Completed</span>
                    <span>{cert.modulesCompleted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Issued</span>
                    <span>{cert.issuedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Expires</span>
                    <span>{cert.expiryDate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t">
                  <Button className="w-full gap-2 bg-user-accent hover:bg-user-accent/90">
                    <Download className="h-4 w-4" />
                    Download Certificate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingCertificates.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.course}</p>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    {cert.progress}% Complete
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      cert.requirements.modulesCompleted ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <CheckCircle2 className={`h-3 w-3 ${
                        cert.requirements.modulesCompleted ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className={cert.requirements.modulesCompleted ? 'text-green-600' : 'text-muted-foreground'}>
                      Complete all modules
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      cert.requirements.assessmentPassed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <CheckCircle2 className={`h-3 w-3 ${
                        cert.requirements.assessmentPassed ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className={cert.requirements.assessmentPassed ? 'text-green-600' : 'text-muted-foreground'}>
                      Pass final assessment
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      cert.requirements.waitingPeriod ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <CheckCircle2 className={`h-3 w-3 ${
                        cert.requirements.waitingPeriod ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className={cert.requirements.waitingPeriod ? 'text-green-600' : 'text-muted-foreground'}>
                      Complete 15-day waiting period
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Estimated completion
                  </span>
                  <span className="font-medium">{cert.estimatedCompletion}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expired Certificates */}
      {expiredCertificates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-600" />
              Expired Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expiredCertificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <Award className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Expired on {cert.expiryDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-red-600 border-red-300">Expired</Badge>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserCertificates;
