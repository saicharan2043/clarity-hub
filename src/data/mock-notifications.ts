export type NotificationType = 'assessment_assigned' | 'result_published' | 'certificate_ready' | 'user_registered' | 'system_alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
  read: boolean;
  createdAt: Date;
}

const now = new Date();
const h = (hours: number) => new Date(now.getTime() - hours * 3600000);

export const mockNotifications: Notification[] = [
  { id: '1', type: 'assessment_assigned', title: 'Assessment assigned', body: 'Trainer John assigned "React Test"', link: '/trainer/assessments', read: false, createdAt: h(0.5) },
  { id: '2', type: 'result_published', title: 'Result published', body: 'Your CSS Mastery result is ready', link: '/trainer/assessment-reports', read: false, createdAt: h(1) },
  { id: '3', type: 'certificate_ready', title: 'Certificate ready', body: 'Safety Compliance certificate is available', link: '/trainer/certificates', read: false, createdAt: h(3) },
  { id: '4', type: 'user_registered', title: 'New user registered', body: 'Priya Sharma joined the platform', link: '/trainer/users', read: true, createdAt: h(6) },
  { id: '5', type: 'system_alert', title: 'Scheduled maintenance', body: 'System update tonight at 11 PM IST', read: true, createdAt: h(24) },
  { id: '6', type: 'assessment_assigned', title: 'Assessment assigned', body: 'Trainer Sarah assigned "Python Basics"', link: '/trainer/assessments', read: true, createdAt: h(26) },
  { id: '7', type: 'result_published', title: 'Result published', body: 'Leadership Assessment results are out', link: '/trainer/assessment-reports', read: true, createdAt: h(48) },
  { id: '8', type: 'certificate_ready', title: 'Certificate ready', body: 'Data Analytics certificate generated', link: '/trainer/certificates', read: false, createdAt: h(2) },
  { id: '9', type: 'system_alert', title: 'Policy update', body: 'New data policy effective from March 15', read: true, createdAt: h(72) },
  { id: '10', type: 'user_registered', title: 'New user registered', body: 'Amit Verma joined Group A', link: '/trainer/users', read: true, createdAt: h(50) },
];

export const notificationTypeConfig: Record<NotificationType, { icon: string; color: string }> = {
  assessment_assigned: { icon: '✏️', color: 'hsl(160 84% 39%)' },
  result_published: { icon: '📊', color: 'hsl(217 91% 60%)' },
  certificate_ready: { icon: '🎓', color: 'hsl(280 68% 45%)' },
  user_registered: { icon: '👤', color: 'hsl(45 93% 47%)' },
  system_alert: { icon: '⚠️', color: 'hsl(0 72% 51%)' },
};
