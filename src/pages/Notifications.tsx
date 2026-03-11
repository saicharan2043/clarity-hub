import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Check, Trash2, ExternalLink, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination';
import { useNotifications } from '@/hooks/use-notifications';
import { notificationTypeConfig, NotificationType } from '@/data/mock-notifications';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'assessment_assigned', label: 'Assessments' },
  { value: 'result_published', label: 'Results' },
  { value: 'certificate_ready', label: 'Certificates' },
  { value: 'system_alert', label: 'System' },
];

const PER_PAGE = 6;

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const filter = searchParams.get('filter') || 'all';
  const search = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [selected, setSelected] = useState<string[]>([]);

  const setFilter = (v: string) => setSearchParams(p => { p.set('filter', v); p.set('page', '1'); return p; });
  const setSearch = (v: string) => setSearchParams(p => { p.set('q', v); p.set('page', '1'); return p; });
  const setPage = (v: number) => setSearchParams(p => { p.set('page', String(v)); return p; });

  const filtered = useMemo(() => {
    return [...notifications]
      .filter(n => {
        if (filter === 'unread' && n.read) return false;
        if (!['all', 'unread'].includes(filter) && n.type !== filter) return false;
        if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.body.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [notifications, filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const bulkMarkRead = () => { selected.forEach(markAsRead); setSelected([]); };
  const bulkDelete = () => { selected.forEach(deleteNotification); setSelected([]); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Manage all your notifications</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
          <Check className="h-4 w-4" />
          Mark all read
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {FILTERS.map(f => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? 'default' : 'outline'}
                  size="sm"
                  className={cn('h-8 text-xs', filter === f.value && 'bg-content-accent hover:bg-content-accent/90 text-content-accent-foreground')}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 bg-muted rounded-lg px-4 py-2.5">
          <span className="text-sm text-muted-foreground">{selected.length} selected</span>
          <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={bulkMarkRead}>
            <Check className="h-3.5 w-3.5" /> Mark read
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={bulkDelete}>
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </Button>
        </div>
      )}

      {/* List */}
      <Card className="shadow-sm">
        <CardContent className="p-0 divide-y divide-border">
          {paginated.length === 0 ? (
            <div className="py-16 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground/30" />
              <h3 className="text-lg font-medium text-foreground mt-4">No notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">Nothing matches your current filters.</p>
            </div>
          ) : (
            paginated.map(n => {
              const cfg = notificationTypeConfig[n.type];
              return (
                <div
                  key={n.id}
                  className={cn(
                    'flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40 group',
                    !n.read && 'bg-content-accent/5 border-l-[3px] border-l-content-accent'
                  )}
                >
                  <Checkbox
                    checked={selected.includes(n.id)}
                    onCheckedChange={() => toggleSelect(n.id)}
                    className="shrink-0"
                  />
                  <span className="text-xl shrink-0" role="img" aria-label={n.type}>{cfg.icon}</span>
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => { markAsRead(n.id); if (n.link) navigate(n.link); }}
                  >
                    <div className="flex items-center gap-2">
                      <p className={cn('text-sm', !n.read ? 'font-semibold text-foreground' : 'font-medium text-foreground/80')}>
                        {n.title}
                      </p>
                      {!n.read && (
                        <Badge variant="outline" className="text-[9px] bg-content-accent/10 text-content-accent border-content-accent/20">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      {formatDistanceToNow(n.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                    {!n.read && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => markAsRead(n.id)} aria-label="Mark read">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    {n.link && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { markAsRead(n.id); navigate(n.link!); }} aria-label="Open">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteNotification(n.id)} aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage(page - 1)}
                className={cn(page <= 1 && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => page < totalPages && setPage(page + 1)}
                className={cn(page >= totalPages && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Notifications;
