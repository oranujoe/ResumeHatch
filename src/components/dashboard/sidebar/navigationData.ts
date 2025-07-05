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
  subItems?: { title: string; url: string; comingSoon?: boolean }[];
  comingSoon?: boolean;
  disabled?: boolean;
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
    subItems: [
      { title: "Parse & Apply", url: "/dashboard/job-parser/parse" },
      { title: "Drop-zone Chrome", url: "/dashboard/job-parser/chrome" },
      { title: "Bulk Queue", url: "/dashboard/job-parser/bulk" },
      { title: "Job Zone", url: "/dashboard/job-parser/zone" }
    ]
  },
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: Briefcase,
    comingSoon: true,
    disabled: true,
    subItems: [
      { title: "My Applications", url: "/dashboard/applications/list", comingSoon: true },
      { title: "Analytics", url: "/dashboard/applications/analytics", comingSoon: true },
      { title: "Funnel View", url: "/dashboard/applications/funnel", comingSoon: true }
    ]
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FolderOpen,
    comingSoon: true,
    disabled: true,
    subItems: [
      { title: "Résumés", url: "/dashboard/documents/resumes", comingSoon: true },
      { title: "Cover Letters", url: "/dashboard/documents/cover-letters", comingSoon: true },
      { title: "Templates Gallery", url: "/dashboard/documents/templates", comingSoon: true },
      { title: "Document Locker", url: "/dashboard/documents/locker", comingSoon: true }
    ]
  },
  {
    title: "Knowledge Base",
    url: "/dashboard/knowledge",
    icon: BookOpen,
    subItems: [
      { title: "Profile Data", url: "/dashboard/knowledge/profile" },
      { title: "Skills Gap", url: "/dashboard/knowledge/skills" }
    ]
  },
  {
    title: "Job Feed",
    url: "/dashboard/job-feed",
    icon: Rss,
    comingSoon: true,
    disabled: true
  },
  {
    title: "Interview Prep",
    url: "/dashboard/interview-prep",
    icon: MessageSquare,
    comingSoon: true,
    disabled: true,
    subItems: [
      { title: "AI Coach", url: "/dashboard/interview-prep/ai-coach", comingSoon: true },
      { title: "Scheduler", url: "/dashboard/interview-prep/scheduler", comingSoon: true },
      { title: "Follow-Ups", url: "/dashboard/interview-prep/follow-ups", comingSoon: true }
    ]
  },
  {
    title: "Referrals",
    url: "/dashboard/referrals",
    icon: Users,
    comingSoon: true,
    disabled: true
  }
];

export const bottomNavItems: NavItem[] = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    comingSoon: true,
    disabled: true,
    subItems: [
      { title: "Account Security", url: "/dashboard/settings/security", comingSoon: true },
      { title: "Wallet & Billing", url: "/dashboard/settings/billing", comingSoon: true },
      { title: "Notifications", url: "/dashboard/settings/notifications", comingSoon: true },
      { title: "Integrations", url: "/dashboard/settings/integrations", comingSoon: true }
    ]
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
    comingSoon: true,
    disabled: true
  },
  {
    title: "Help",
    url: "/dashboard/help",
    icon: HelpCircle,
    subItems: [
      { title: "Docs/FAQ", url: "/dashboard/help/docs" },
      { title: "Live Chat", url: "/dashboard/help/chat" },
      { title: "Changelog", url: "/dashboard/help/changelog" }
    ]
  }
];
