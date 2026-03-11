import { useNavigate } from 'react-router-dom';
import { Check, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/hooks/use-notifications';
import { notificationTypeConfig } from '@/data/mock-notifications';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  onClose: () => void;
}

export const NotificationPopover = ({ onClose }: Props) => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications();
  const navigate = useNavigate();

  const sorted = [...notifications].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 8);

  const handleClick = (id: string, link?: string) => {
    markAsRead(id);
    if (link) {
      navigate(link);
      onClose();
    }
  };

  return (
    <div className="flex flex-col max-h-[460px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" className="text-xs h-7 text-content-accent hover:text-content-accent" onClick={markAllAsRead}>
            <Check className="h-3 w-3 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        {sorted.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-3xl">🎉</p>
            <p className="text-sm text-muted-foreground mt-2">You're all caught up!</p>
          </div>
        ) : (
          <div aria-live="polite">
            {sorted.map((n) => {
              const cfg = notificationTypeConfig[n.type];
              return (
                <div
                  key={n.id}
                  className={cn(
                    'flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-muted/60 group relative',
                    !n.read && 'bg-content-accent/5 border-l-[3px] border-l-content-accent'
                  )}
                  onClick={() => handleClick(n.id, n.link)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleClick(n.id, n.link); }}
                >
                  <span className="text-lg mt-0.5 shrink-0" role="img" aria-label={n.type}>{cfg.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-sm leading-tight', !n.read ? 'font-semibold text-foreground' : 'font-medium text-foreground/80')}>
                      {n.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{n.body}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">
                      {formatDistanceToNow(n.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  {/* Hover actions */}
                  <div className="hidden group-hover:flex items-center gap-0.5 shrink-0">
                    {!n.read && (
                      <Button
                        variant="ghost" size="icon" className="h-7 w-7"
                        onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                        aria-label="Mark as read"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button
                      variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border px-4 py-2.5">
        <Button
          variant="ghost"
          className="w-full text-sm text-content-accent hover:text-content-accent gap-1.5 h-8"
          onClick={() => { navigate('/notifications'); onClose(); }}
        >
          View all notifications
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
