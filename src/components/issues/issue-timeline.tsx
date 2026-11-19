import type { StatusUpdate } from "@/lib/types";
import { getStatusAppearance } from "@/lib/utils";

type IssueTimelineProps = {
  updates: StatusUpdate[];
};

export default function IssueTimeline({ updates }: IssueTimelineProps) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>

      <div className="space-y-8">
        {updates.map((update, index) => {
          const statusAppearance = getStatusAppearance(update.status);
          const Icon = statusAppearance.icon;

          return (
            <div key={index} className="relative flex items-start">
              <div className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-background -translate-x-1/2">
                <Icon className={`h-5 w-5 ${statusAppearance.className}`} />
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="font-semibold text-foreground text-sm">{update.status}</p>
                  <time className="text-xs text-muted-foreground">
                    {new Date(update.timestamp).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </div>
                {update.officialDepartment && (
                  <p className="text-xs font-medium text-primary">
                    Division: {update.officialDepartment}
                  </p>
                )}
                {update.notes && (
                  <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md border border-border/50">
                    {update.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
