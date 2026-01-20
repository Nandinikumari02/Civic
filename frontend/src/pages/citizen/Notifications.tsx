import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle2, Clock, AlertCircle, Award, MessageSquare, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Notification {
  id: string;
  type: 'issue_update' | 'reward' | 'message' | 'alert';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'issue_update',
    title: 'Issue Status Updated',
    description: 'Your report "Pothole on Main Street" has been marked as In Progress.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'reward',
    title: 'Points Earned!',
    description: 'You earned 50 civic points for your recent issue report.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'issue_update',
    title: 'Issue Resolved',
    description: 'Your report "Broken Streetlight" has been resolved. Thank you for reporting!',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'message',
    title: 'New Comment',
    description: 'A staff member commented on your issue "Water Leak on Oak Avenue".',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'alert',
    title: 'Scheduled Maintenance',
    description: 'Water supply will be interrupted on Jan 15 from 9 AM to 2 PM in your area.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '6',
    type: 'reward',
    title: 'New Badge Unlocked!',
    description: 'Congratulations! You\'ve earned the "Active Reporter" badge.',
    time: '1 week ago',
    read: true,
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'issue_update':
      return <Clock className="h-5 w-5 text-primary" />;
    case 'reward':
      return <Award className="h-5 w-5 text-yellow-500" />;
    case 'message':
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case 'alert':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

const getNotificationBadge = (type: Notification['type']) => {
  switch (type) {
    case 'issue_update':
      return <Badge variant="secondary">Issue Update</Badge>;
    case 'reward':
      return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Reward</Badge>;
    case 'message':
      return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Message</Badge>;
    case 'alert':
      return <Badge variant="destructive">Alert</Badge>;
    default:
      return null;
  }
};

export default function Notifications() {
  const unreadNotifications = mockNotifications.filter((n) => !n.read);
 

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card className={`transition-colors ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-foreground">{notification.title}</h3>
                  {getNotificationBadge(notification.type)}
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
   
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated on your issues and rewards
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Check className="h-4 w-4" />
            Mark All as Read
          </Button>
        </div>

        {/* Notifications Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({mockNotifications.length})</TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadNotifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-0">
            {mockNotifications.length > 0 ? (
              mockNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-1">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! Check back later for updates.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3 mt-0">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-1">All caught up!</h3>
                  <p className="text-sm text-muted-foreground">
                    You have no unread notifications.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
  
  );
}
