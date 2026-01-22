import { useState } from 'react';
import { Search, Download, Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Feedback {
  id: string;
  userName: string;
  course: string;
  trainerRating: number;
  contentRating: number;
  comments: string;
  date: string;
}

const mockFeedback: Feedback[] = [
  { id: '1', userName: 'John Smith', course: 'Safety Training 101', trainerRating: 5, contentRating: 4, comments: 'Excellent training session! Very informative and well-structured.', date: '2025-01-20' },
  { id: '2', userName: 'Sarah Johnson', course: 'Equipment Handling', trainerRating: 4, contentRating: 5, comments: 'Great hands-on experience. The content was very relevant.', date: '2025-01-19' },
  { id: '3', userName: 'Mike Wilson', course: 'Fire Safety Basics', trainerRating: 5, contentRating: 5, comments: 'The fire drill was very realistic. Learned a lot!', date: '2025-01-18' },
  { id: '4', userName: 'Emily Brown', course: 'Safety Training 101', trainerRating: 3, contentRating: 4, comments: 'Good content but the pace was a bit fast.', date: '2025-01-17' },
  { id: '5', userName: 'David Lee', course: 'First Aid Essentials', trainerRating: 5, contentRating: 5, comments: 'Very practical training. The trainer was excellent!', date: '2025-01-16' },
];

const TrainerFeedback = () => {
  const [feedback] = useState<Feedback[]>(mockFeedback);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');

  const filteredFeedback = feedback.filter(f => {
    const matchesSearch = f.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.comments.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || f.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const uniqueCourses = [...new Set(feedback.map(f => f.course))];

  const handleExport = (format: 'csv' | 'pdf') => {
    toast.success(`Exporting feedback as ${format.toUpperCase()}...`);
  };

  const avgTrainerRating = (feedback.reduce((acc, f) => acc + f.trainerRating, 0) / feedback.length).toFixed(1);
  const avgContentRating = (feedback.reduce((acc, f) => acc + f.contentRating, 0) / feedback.length).toFixed(1);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Feedback</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and analyze training feedback from learners
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')} className="gap-2">
            <Download className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')} className="gap-2">
            <Download className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
                <p className="text-2xl font-bold text-foreground">{feedback.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-content-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Trainer Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-foreground">{avgTrainerRating}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Content Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-foreground">{avgContentRating}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            </div>
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
                placeholder="Search feedback..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {uniqueCourses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {filteredFeedback.map((item) => (
          <Card key={item.id} className="border-border">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{item.userName}</h3>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{item.course}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.comments}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Trainer</p>
                    {renderStars(item.trainerRating)}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Content</p>
                    {renderStars(item.contentRating)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainerFeedback;
