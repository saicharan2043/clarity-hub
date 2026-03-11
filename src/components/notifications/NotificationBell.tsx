import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { NotificationPopover } from './NotificationPopover';
import { useNotifications } from '@/hooks/use-notifications';

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const displayCount = unreadCount === 0 ? null : unreadCount > 9 ? '9+' : unreadCount;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        >
          <Bell className="h-4 w-4" />
          {displayCount !== null && (
            <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold px-1">
              {displayCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[400px] p-0 shadow-lg"
        sideOffset={8}
      >
        <NotificationPopover onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};
