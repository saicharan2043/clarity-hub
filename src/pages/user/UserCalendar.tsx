import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Users, ExternalLink } from 'lucide-react';

const events = [
  {
    id: 1,
    name: 'Safety Drill Practice',
    date: new Date(2026, 0, 25),
    time: '10:00 AM - 11:30 AM',
    type: 'Physical',
    location: 'Training Hall A',
    course: 'Workplace Safety Training',
    instructor: 'John Smith',
    maxParticipants: 30,
    enrolled: 25,
    status: 'upcoming'
  },
  {
    id: 2,
    name: 'First Aid Training Session',
    date: new Date(2026, 0, 27),
    time: '2:00 PM - 4:00 PM',
    type: 'Online',
    location: 'https://meet.example.com/first-aid',
    course: 'Emergency Response Training',
    instructor: 'Dr. Sarah Johnson',
    maxParticipants: 50,
    enrolled: 42,
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'Equipment Handling Workshop',
    date: new Date(2026, 0, 30),
    time: '11:00 AM - 1:00 PM',
    type: 'Physical',
    location: 'Workshop B',
    course: 'Equipment Handling Course',
    instructor: 'Mike Brown',
    maxParticipants: 20,
    enrolled: 18,
    status: 'upcoming'
  },
  {
    id: 4,
    name: 'Fire Safety Quiz Review',
    date: new Date(2026, 1, 3),
    time: '3:00 PM - 4:00 PM',
    type: 'Online',
    location: 'https://meet.example.com/fire-safety',
    course: 'Fire Safety Essentials',
    instructor: 'Emily Davis',
    maxParticipants: 40,
    enrolled: 35,
    status: 'upcoming'
  },
  {
    id: 5,
    name: 'Monthly Safety Meeting',
    date: new Date(2026, 0, 22),
    time: '10:00 AM - 11:00 AM',
    type: 'Online',
    location: 'https://meet.example.com/monthly-safety',
    course: 'General Training',
    instructor: 'John Smith',
    maxParticipants: 100,
    enrolled: 85,
    status: 'completed'
  },
];

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const eventDates = events.map(e => e.date.toDateString());
  
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return events.filter(e => e.date.toDateString() === date.toDateString());
  };

  const upcomingEvents = events
    .filter(e => e.status === 'upcoming')
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Training Calendar</h1>
        <p className="text-muted-foreground">View your scheduled training events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-user-accent" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                event: (date) => eventDates.includes(date.toDateString()),
              }}
              modifiersStyles={{
                event: {
                  fontWeight: 'bold',
                  backgroundColor: 'hsl(var(--user-accent))',
                  color: 'white',
                  borderRadius: '50%',
                },
              }}
            />
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-user-accent" />
              <span>Days with events</span>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedDate 
                ? `Events on ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`
                : 'Select a date'
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">{event.course}</p>
                      </div>
                      <Badge variant={event.type === 'Online' ? 'default' : 'secondary'}>
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.enrolled}/{event.maxParticipants} enrolled</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                        {event.type === 'Online' ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <MapPin className="h-4 w-4" />
                        )}
                        <span>{event.type === 'Online' ? 'Virtual Meeting' : event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <span className="text-sm text-muted-foreground">
                        Instructor: {event.instructor}
                      </span>
                      {event.type === 'Online' && event.status === 'upcoming' && (
                        <Button size="sm" className="gap-2 bg-user-accent hover:bg-user-accent/90">
                          <ExternalLink className="h-4 w-4" />
                          Join Meeting
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No events scheduled for this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-user-accent" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <p className="text-2xl font-bold text-user-accent">
                      {event.date.getDate()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString('en-US', { month: 'short' })}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">{event.course}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        {event.type === 'Online' ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{event.enrolled}/{event.maxParticipants}</Badge>
                  {event.type === 'Online' ? (
                    <Button size="sm" variant="outline" className="gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Join
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCalendar;
