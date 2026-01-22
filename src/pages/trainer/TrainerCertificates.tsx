import { useState } from 'react';
import { Search, Download, Eye, Upload, Award, Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Certificate {
  id: string;
  userName: string;
  courseName: string;
  moduleName: string;
  trainingName: string;
  completionDate: string;
  certificateId: string;
  status: 'issued' | 'pending';
}

const mockCertificates: Certificate[] = [
  { id: '1', userName: 'John Smith', courseName: 'Safety Training 101', moduleName: 'Module 5', trainingName: 'Q1 Safety Training', completionDate: '2025-01-20', certificateId: 'CERT-2025-001', status: 'issued' },
  { id: '2', userName: 'Sarah Johnson', courseName: 'Equipment Handling', moduleName: 'Module 3', trainingName: 'Equipment Certification', completionDate: '2025-01-19', certificateId: 'CERT-2025-002', status: 'issued' },
  { id: '3', userName: 'Mike Wilson', courseName: 'Fire Safety Basics', moduleName: 'Module 4', trainingName: 'Fire Safety Training', completionDate: '2025-01-18', certificateId: 'CERT-2025-003', status: 'issued' },
  { id: '4', userName: 'Emily Brown', courseName: 'Safety Training 101', moduleName: 'Module 5', trainingName: 'Q1 Safety Training', completionDate: '2025-01-17', certificateId: 'CERT-2025-004', status: 'pending' },
  { id: '5', userName: 'David Lee', courseName: 'First Aid Essentials', moduleName: 'Module 6', trainingName: 'First Aid Certification', completionDate: '2025-01-16', certificateId: 'CERT-2025-005', status: 'issued' },
];

const TrainerCertificates = () => {
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handlePreview = (id: string) => {
    toast.info('Opening certificate preview...');
  };

  const handleDownload = (id: string) => {
    toast.success('Downloading certificate...');
  };

  const handleUploadTemplate = () => {
    toast.success('Template uploaded successfully');
    setIsUploadOpen(false);
  };

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === 'issued').length,
    pending: certificates.filter(c => c.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Certificates</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and issue training certificates
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-content-accent hover:bg-content-accent/90 gap-2">
              <Upload className="h-4 w-4" />
              Upload Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Certificate Template</DialogTitle>
              <DialogDescription>
                Upload a new certificate template for training completion
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input id="template-name" placeholder="Enter template name" />
              </div>
              <div className="space-y-2">
                <Label>Template File</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Upload PDF or image template
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
              <Button onClick={handleUploadTemplate} className="bg-content-accent hover:bg-content-accent/90">
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Certificates</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Award className="h-8 w-8 text-content-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-content-accent">{stats.issued}</p>
            <p className="text-sm text-muted-foreground">Issued</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
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
                placeholder="Search by name or certificate ID..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-content-accent text-white">
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tl-lg">Certificate ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">User Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Course</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Module</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Training</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Completion Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((cert) => (
                  <tr 
                    key={cert.id} 
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{cert.certificateId}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{cert.userName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{cert.courseName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{cert.moduleName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{cert.trainingName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{cert.completionDate}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        className={cert.status === 'issued' ? 'bg-content-accent' : 'bg-yellow-500'}
                      >
                        {cert.status === 'issued' ? 'Issued' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handlePreview(cert.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownload(cert.id)}
                          disabled={cert.status === 'pending'}
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

export default TrainerCertificates;
