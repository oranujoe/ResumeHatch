import { LayoutDashboard, FileText, Database, Bot, HelpCircle, Settings, User, Briefcase, Users, Calendar, MessageSquare, Shield } from 'lucide-react';

export interface NavItem {
  title: string;
  url: string;
  icon: any;
  subItems?: { title: string; url: string; comingSoon?: boolean }[];
  disabled?: boolean;
  comingSoon?: boolean;
  adminOnly?: boolean; // New property to mark admin-only items
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Job Parser',
    url: '/dashboard/job-parser',
    icon: Bot,
    subItems: [
      { title: 'Parse & Apply', url: '/dashboard/job-parser/parse' },
      { title: 'Chrome Extension', url: '/dashboard/job-parser/chrome' },
      { title: 'Bulk Queue', url: '/dashboard/job-parser/bulk' },
      { title: 'Job Zone', url: '/dashboard/job-parser/zone' },
    ]
  },
  {
    title: 'Applications',
    url: '/dashboard/applications',
    icon: Briefcase,
    comingSoon: true,
  },
  {
    title: 'Documents',
    url: '/dashboard/documents',
    icon: FileText,
    comingSoon: true,
  },
  {
    title: 'Job Feed',
    url: '/dashboard/job-feed',
    icon: Briefcase,
    comingSoon: true,
  },
  {
    title: 'Interview Prep',
    url: '/dashboard/interview-prep',
    icon: MessageSquare,
    comingSoon: true,
  },
  {
    title: 'Referrals',
    url: '/dashboard/referrals',
    icon: Users,
    comingSoon: true,
  },
  {
    title: 'Knowledge Base',
    url: '/dashboard/knowledge',
    icon: Database,
    subItems: [
      { title: 'Profile Data', url: '/dashboard/knowledge/profile' },
      { title: 'Skills Gap', url: '/dashboard/knowledge/skills' },
    ]
  },
  {
    title: 'Help & Support',
    url: '/dashboard/help',
    icon: HelpCircle,
    subItems: [
      { title: 'Documentation', url: '/dashboard/help/docs' },
      { title: 'Live Chat', url: '/dashboard/help/chat' },
      { title: 'Changelog', url: '/dashboard/help/changelog' },
    ]
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: 'Admin Dashboard',
    url: '/admin',
    icon: Shield,
  },
  {
    title: 'User Management',
    url: '/admin/users',
    icon: Users,
  },
  {
    title: 'Audit Logs',
    url: '/admin/audit',
    icon: FileText,
    comingSoon: true,
  },
  {
    title: 'System Data',
    url: '/admin/system',
    icon: Database,
    comingSoon: true,
  },
];

export const bottomNavItems: NavItem[] = [
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
    comingSoon: true,
  },
  {
    title: 'Profile',
    url: '/dashboard/profile',
    icon: User,
    comingSoon: true,
  },
  {
    title: 'Admin Setup',
    url: '/dashboard/setup-admin',
    icon: Shield,
    adminOnly: true, // Mark as admin-only
  },
];

// Keep the old export for backward compatibility
export const navigationItems = [
  ...mainNavItems,
  ...bottomNavItems,
];
