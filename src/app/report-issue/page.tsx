import ReportIssueForm from "@/components/issues/report-issue-form";

export default function ReportIssuePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Nagrik Seva Portal · नागरिक सेवा</span>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          जन समस्या दर्ज करें · Report Civic Issue
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Take or upload a photo with GPS coordinates. Your report is routed directly to your local Ward Engineer with a legally backed Citizen Charter SLA guarantee.
        </p>
      </div>
      <ReportIssueForm />
    </div>
  );
}
