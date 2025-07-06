
import { LayoutDashboard, FileText, Database, Bot, HelpCircle, Settings, User, Briefcase, Users, Calendar, MessageSquare, Shield } from 'lucide-react';

export const navigationItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Job Parser',
    href: '/dashboard/job-parser',
    icon: Bot,
    subItems: [
      { label: 'Parse & Apply', href: '/dashboard/job-parser/parse' },
      { label: 'Chrome Extension', href: '/dashboard/job-parser/chrome' },
      { label: 'Bulk Queue', href: '/dashboard/job-parser/bulk' },
      { label: 'Job Zone', href: '/dashboard/job-parser/zone' },
    ]
  },
  {
    label: 'Applications',
    href: '/dashboard/applications',
    icon: Briefcase,
  },
  {
    label: 'Documents',
    href: '/dashboard/documents',
    icon: FileText,
  },
  {
    label: 'Job Feed',
    href: '/dashboard/job-feed',
    icon: Briefcase,
  },
  {
    label: 'Interview Prep',
    href: '/dashboard/interview-prep',
    icon: MessageSquare,
  },
  {
    label: 'Referrals',
    href: '/dashboard/referrals',
    icon: Users,
  },
  {
    label: 'Knowledge Base',
    href: '/dashboard/knowledge',
    icon: Database,
    subItems: [
      { label: 'Profile Data', href: '/dashboard/knowledge/profile' },
      { label: 'Skills Gap', href: '/dashboard/knowledge/skills' },
    ]
  },
  {
    label: 'Help & Support',
    href: '/dashboard/help',
    icon: HelpCircle,
    subItems: [
      { label: 'Documentation', href: '/dashboard/help/docs' },
      { label: 'Live Chat', href: '/dashboard/help/chat' },
      { label: 'Changelog', href: '/dashboard/help/changelog' },
    ]
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Admin Setup',
    href: '/dashboard/setup-admin',
    icon: Shield,
    className: 'border-t border-gray-200 pt-2 mt-2'
  },
];
