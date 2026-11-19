import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { IssueStatus } from "@/lib/types";
import { Circle, CircleDashed, CircleDotDashed, CheckCircle2, XCircle, LucideIcon } from "lucide-react";
import { BadgeProps } from "@/components/ui/badge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusAppearance(status: IssueStatus): {
  variant: BadgeProps['variant'];
  icon: LucideIcon;
  className: string;
} {
  switch (status) {
    case 'Submitted':
      return { variant: 'secondary', icon: Circle, className: 'text-muted-foreground' };
    case 'Under Review':
      return { variant: 'outline', icon: CircleDashed, className: 'text-blue-600 border-blue-600' };
    case 'In Progress':
      return { variant: 'default', icon: CircleDotDashed, className: 'bg-primary/80 hover:bg-primary/90' };
    case 'Resolved':
      return { variant: 'default', icon: CheckCircle2, className: 'bg-green-600 hover:bg-green-700 text-white' };
    case 'Rejected':
      return { variant: 'destructive', icon: XCircle, className: '' };
    default:
      return { variant: 'secondary', icon: Circle, className: 'text-muted-foreground' };
  }
}
