import { useState } from 'react';
import { Search, Download, Check, X, Filter } from 'lucide-react';
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

interface AttendanceRecord {
  id: string;
  userName: string;
  eventName: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'pending';
}

const mockAttendance: AttendanceRecord[] = [
  { id: '1', userName: 'John Smith', eventName: 'Safety Training Session', date: '2025-01-25', time: '10:00 AM', status: 'present' },
  { id: '2', userName: 'Sarah Johnson', eventName: 'Safety Training Session', date: '2025-01-25', time: '10:00 AM', status: 'present' },
  { id: '3', userName: 'Mike Wilson', eventName: 'Equipment Demo', date: '2025-01-26', time: '2:00 PM', status: 'absent' },
  { id: '4', userName: 'Emily Brown', eventName: 'Fire Drill Practice', date: '2025-01-28', time: '9:00 AM', status: 'pending' },
  { id: '5', userName: 'David Lee', eventName: 'Fire Drill Practice', date: '2025-01-28', time: '9:00 AM', status: 'pending' },
  { id: '6', userName: 'Lisa Chen', eventName: 'First Aid Workshop', date: '2025-02-01', time: '11:00 AM', status: 'pending' },
];

const TrainerAttendance = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>(mockAttendance);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = filterEvent === 'all' || record.eventName === filterEvent;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const uniqueEvents = [...new Set(records.map(r => r.eventName))];

  const handleMarkAttendance = (id: string, status: 'present' | 'absent') => {
    setRecords(records.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Attendance marked as ${status}`);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast.success(`Exporting attendance as ${format.toUpperCase()}...`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-content-accent">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = {
    total: records.length,
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    pending: records.filter(r => r.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Attendance Tracking</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage event attendance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('excel')} className="gap-2">
            <Download className="h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')} className="gap-2">
            <Download className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-content-accent">{stats.present}</p>
            <p className="text-sm text-muted-foreground">Present</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
            <p className="text-sm text-muted-foreground">Absent</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{stats.pending}</p>
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
                placeholder="Search by user name..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterEvent} onValueChange={setFilterEvent}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {uniqueEvents.map(event => (
                  <SelectItem key={event} value={event}>{event}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-content-accent text-white">
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tl-lg">User Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Event Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{record.userName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{record.eventName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{record.date}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{record.time}</td>
                    <td className="py-3 px-4">{getStatusBadge(record.status)}</td>
                    <td className="py-3 px-4">
                      {record.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-8 gap-1 text-content-accent border-content-accent hover:bg-content-accent hover:text-white"
                            onClick={() => handleMarkAttendance(record.id, 'present')}
                          >
                            <Check className="h-3 w-3" />
                            Present
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-8 gap-1 text-destructive border-destructive hover:bg-destructive hover:text-white"
                            onClick={() => handleMarkAttendance(record.id, 'absent')}
                          >
                            <X className="h-3 w-3" />
                            Absent
                          </Button>
                        </div>
                      )}
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

export default TrainerAttendance;
