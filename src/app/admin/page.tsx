import IssuesTable from "@/components/admin/issues-table";
import { issues } from "@/lib/data";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Municipal Corporation Portal</span>
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-1">
            Nodal Officer Console · नगर निगम अधिकारी पोर्टल
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor and fulfill public service guarantees across PWD, Jal Board, SWM, and Vidyut divisions under the Citizen Charter.
          </p>
        </div>
      </div>
      <IssuesTable initialIssues={issues} />
    </div>
  );
}
