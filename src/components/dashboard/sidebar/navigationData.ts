
import { 
  Home, 
  FileText, 
  Briefcase, 
  FolderOpen, 
  BookOpen, 
  Rss, 
  MessageSquare, 
  Users, 
  Settings, 
  User, 
  HelpCircle
} from 'lucide-react';

export interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { title: string; url: string; isComingSoon?: boolean; isDisabled?: boolean }[];
  isComingSoon?: boolean;
  isDisabled?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home
  },
  {
    title: "Job Parser",
    url: "/dashboard/job-parser",
    icon: FileText,
    isComingSoon: false,
    isDisabled: false,
    subItems: [
      { title: "Parse & Apply", url: "/dashboard/job-parser/parse", isComingSoon: false, isDisabled: false },
      { title: "Drop-zone Chrome", url: "/dashboard/job-parser/chrome", isComingSoon: false, isDisabled: false },
      { title: "Bulk Queue", url: "/dashboard/job-parser/bulk", isComingSoon: false, isDisabled: false },
      { title: "Job Zone", url: "/dashboard/job-parser/zone", isComingSoon: false, isDisabled: false }
    ]
  },
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: Briefcase,
    isComingSoon: true,
    isDisabled: true,
    subItems: [
      { title: "My Applications", url: "/dashboard/applications/list", isComingSoon: true, isDisabled: true },
      { title: "Analytics", url: "/dashboard/applications/analytics", isComingSoon: true, isDisabled: true },
      { title: "Funnel View", url: "/dashboard/applications/funnel", isComingSoon: true, isDisabled: true }
    ]
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FolderOpen,
    isComingSoon: true,
    isDisabled: true,
    subItems: [
      { title: "Résumés", url: "/dashboard/documents/resumes", isComingSoon: true, isDisabled: true },
      { title: "Cover Letters", url: "/dashboard/documents/cover-letters", isComingSoon: true, isDisabled: true },
      { title: "Templates Gallery", url: "/dashboard/documents/templates", isComingSoon: true, isDisabled: true },
      { title: "Document Locker", url: "/dashboard/documents/locker", isComingSoon: true, isDisabled: true }
    ]
  },
  {
    title: "Knowledge Base",
    url: "/dashboard/knowledge",
    icon: BookOpen,
    isComingSoon: true,
    isDisabled: true,
    subItems: [
      { title: "Profile Data", url: "/dashboard/knowledge/profile", isComingSoon: true, isDisabled: true },
      { title: "Skills Gap", url: "/dashboard/knowledge/skills", isComingSoon: true, isDisabled: true }
    ]
  },
  {
    title: "Job Feed",
    url: "/dashboard/job-feed",
    icon: Rss,
    isComingSoon: true,
    isDisabled: true
  },
  {
    title: "Interview Prep",
    url: "/dashboard/interview-prep",
    icon: MessageSquare,
    isComingSoon: true,
    isDisabled: true,
    subItems: [
      { title: "AI Coach", url: "/dashboard/interview-prep/ai-coach", isComingSoon: true, isDisabled: true },
      { title: "Scheduler", url: "/dashboard/interview-prep/scheduler", isComingSoon: true, isDisabled: true },
      { title: "Follow-Ups", url: "/dashboard/interview-prep/follow-ups", isComingSoon: true, isDisabled: true }
    ]
  },
  {
    title: "Referrals",
    url: "/dashboard/referrals",
    icon: Users,
    isComingSoon: true,
    isDisabled: true
  }
];

export const bottomNavItems: NavItem[] = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    isComingSoon: true,
    isDisabled: true,
    subItems: [
      { title: "Account Security", url: "/dashboard/settings/security", isComingSoon: true, isDisabled: true },
      { title: "Wallet & Billing", url: "/dashboard/settings/billing", isComingSoon: true, isDisabled: true },
      { title: "Notifications", url: "/dashboard/settings/notifications", isComingSoon: true, isDisabled: true },
      { title: "Integrations", url: "/dashboard/settings/integrations", isComingSoon: true, isDisabled: true }
    ]
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
    isComingSoon: true,
    isDisabled: true
  },
  {
    title: "Help",
    url: "/dashboard/help",
    icon: HelpCircle,
    isComingSoon: true,
    isDisabled: true,
    subItems: [
      { title: "Docs/FAQ", url: "/dashboard/help/docs", isComingSoon: true, isDisabled: true },
      { title: "Live Chat", url: "/dashboard/help/chat", isComingSoon: true, isDisabled: true }
    ]
  }
];
