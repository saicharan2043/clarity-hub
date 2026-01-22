import { useState } from 'react';
import { Plus, Calendar as CalendarIcon, MapPin, Video, Users, Clock, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Event {
  id: string;
  name: string;
  course: string;
  date: string;
  time: string;
  mode: 'online' | 'physical';
  location: string;
  maxParticipants: number;
  enrolled: number;
}

const mockEvents: Event[] = [
  { id: '1', name: 'Safety Training Session', course: 'Safety Training 101', date: '2025-01-25', time: '10:00 AM', mode: 'online', location: 'Zoom Meeting', maxParticipants: 50, enrolled: 32 },
  { id: '2', name: 'Equipment Demo', course: 'Equipment Handling', date: '2025-01-26', time: '2:00 PM', mode: 'physical', location: 'Training Room A', maxParticipants: 20, enrolled: 18 },
  { id: '3', name: 'Fire Drill Practice', course: 'Fire Safety Basics', date: '2025-01-28', time: '9:00 AM', mode: 'physical', location: 'Main Building', maxParticipants: 100, enrolled: 85 },
  { id: '4', name: 'First Aid Workshop', course: 'First Aid Essentials', date: '2025-02-01', time: '11:00 AM', mode: 'online', location: 'Teams Meeting', maxParticipants: 30, enrolled: 15 },
];

const TrainerEvents = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    date: '',
    time: '',
    mode: 'online' as 'online' | 'physical',
    location: '',
    maxParticipants: 50,
  });

  const handleCreate = () => {
    if (!formData.name || !formData.course) {
      toast.error('Event name and course are required');
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      ...formData,
      enrolled: 0,
    };

    setEvents([...events, newEvent]);
    setFormData({ name: '', course: '', date: '', time: '', mode: 'online', location: '', maxParticipants: 50 });
    setIsCreateOpen(false);
    toast.success('Event created successfully');
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast.success('Event deleted');
  };

  const filteredEvents = selectedDate 
    ? events.filter(e => e.date === selectedDate.toISOString().split('T')[0])
    : events;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Events & Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage training events and schedules
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-content-accent hover:bg-content-accent/90 gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Schedule a new training event
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="event-name">Event Name *</Label>
                <Input
                  id="event-name"
                  placeholder="Enter event name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Linked Course *</Label>
                <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Safety Training 101">Safety Training 101</SelectItem>
                    <SelectItem value="Equipment Handling">Equipment Handling</SelectItem>
                    <SelectItem value="Fire Safety Basics">Fire Safety Basics</SelectItem>
                    <SelectItem value="First Aid Essentials">First Aid Essentials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Mode</Label>
                <Select value={formData.mode} onValueChange={(value: 'online' | 'physical') => setFormData({ ...formData, mode: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="physical">Physical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{formData.mode === 'online' ? 'Meeting Link' : 'Location'}</Label>
                <Input
                  id="location"
                  placeholder={formData.mode === 'online' ? 'Enter meeting link' : 'Enter location'}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Max Participants</Label>
                <Input
                  id="max"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} className="bg-content-accent hover:bg-content-accent/90">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0"
            />
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-medium text-foreground">
            {selectedDate ? `Events on ${selectedDate.toLocaleDateString()}` : 'All Upcoming Events'}
          </h2>
          
          {filteredEvents.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-8 text-center">
                <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No events scheduled</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{event.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={event.mode === 'online' ? 'border-content-accent text-content-accent' : ''}
                          >
                            {event.mode === 'online' ? <Video className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                            {event.mode}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.course}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.enrolled}/{event.maxParticipants}
                          </div>
                          <div className="flex items-center gap-1">
                            {event.mode === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerEvents;
