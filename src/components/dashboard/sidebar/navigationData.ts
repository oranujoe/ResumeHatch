
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
  subItems?: { title: string; url: string }[];
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
    subItems: [
      { title: "My Applications", url: "/dashboard/applications/list" },
      { title: "Analytics", url: "/dashboard/applications/analytics" },
      { title: "Funnel View", url: "/dashboard/applications/funnel" }
    ]
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FolderOpen,
    subItems: [
      { title: "Résumés", url: "/dashboard/documents/resumes" },
      { title: "Cover Letters", url: "/dashboard/documents/cover-letters" },
      { title: "Templates Gallery", url: "/dashboard/documents/templates" },
      { title: "Document Locker", url: "/dashboard/documents/locker" }
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
    icon: Rss
  },
  {
    title: "Interview Prep",
    url: "/dashboard/interview-prep",
    icon: MessageSquare,
    subItems: [
      { title: "AI Coach", url: "/dashboard/interview-prep/ai-coach" },
      { title: "Scheduler", url: "/dashboard/interview-prep/scheduler" },
      { title: "Follow-Ups", url: "/dashboard/interview-prep/follow-ups" }
    ]
  },
  {
    title: "Referrals",
    url: "/dashboard/referrals",
    icon: Users
  }
];

export const bottomNavItems: NavItem[] = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    subItems: [
      { title: "Account Security", url: "/dashboard/settings/security" },
      { title: "Wallet & Billing", url: "/dashboard/settings/billing" },
      { title: "Notifications", url: "/dashboard/settings/notifications" },
      { title: "Integrations", url: "/dashboard/settings/integrations" }
    ]
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User
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
