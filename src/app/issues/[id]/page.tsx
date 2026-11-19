import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { issues } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, Clock, CheckCircle2, Phone, ShieldCheck, ArrowLeft, Building2 } from 'lucide-react';
import IssueTimeline from '@/components/issues/issue-timeline';
import { Button } from '@/components/ui/button';
import { getStatusAppearance } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import IssueActionPanel from '@/components/issues/issue-action-panel';

export function generateStaticParams() {
  return issues.map((issue) => ({
    id: issue.id,
  }));
}

export default async function IssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const issue = issues.find((issue) => issue.id === resolvedParams.id);

  if (!issue) {
    console.error(`IssueDetailPage error: Issue with ID "${resolvedParams.id}" not found.`);
    notFound();
  }

  const statusAppearance = getStatusAppearance(issue.status);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-8">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/#issues">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Reports · वापस जाएं</span>
          </Link>
        </Button>
        <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded">
          TICKET: {issue.id}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Main Issue Card */}
          <Card className="border shadow-xs overflow-hidden">
            <CardHeader className="space-y-3">
              {/* Quiet unboxed metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-medium">
                <span className="text-primary font-bold">{issue.location.corporation}</span>
                <span aria-hidden="true">·</span>
                <span>{issue.location.ward}</span>
                <span aria-hidden="true">·</span>
                <span className="text-foreground font-semibold">{issue.categoryHindi}</span>
              </div>

              <CardTitle className="font-headline text-2xl md:text-3xl font-bold leading-tight">
                {issue.title}
              </CardTitle>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground pt-1">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  <span>Reported: {new Date(issue.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  <span>{issue.location.address}, PIN {issue.location.pincode}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Photo Showcase: Before / After if resolved */}
              {issue.status === 'Resolved' && issue.resolvedPhotoUrl ? (
                <div className="space-y-2">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
                        <Image
                          src={issue.photoUrl}
                          alt="Grievance Before"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                          BEFORE · शिकायत के समय
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-emerald-600/50 bg-muted">
                        <Image
                          src={issue.resolvedPhotoUrl}
                          alt="Grievance After Resolution"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-emerald-700 text-white text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>AFTER · समाधान सत्यापित</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded border border-emerald-200">
                    ✓ Verified on site with geotagged photographic audit. Certified under Swachh Ward standards.
                  </p>
                </div>
              ) : (
                <div className="aspect-video relative rounded-lg overflow-hidden border bg-muted">
                  <Image
                    src={issue.photoUrl}
                    alt={issue.title}
                    fill
                    className="object-cover"
                    data-ai-hint={issue.photoHint}
                  />
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Detailed Description · शिकायत का विवरण</h4>
                <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">{issue.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Official Resolution Timeline */}
          <Card className="border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-headline text-xl flex items-center justify-between">
                <span>Official Resolution Timeline · कार्य प्रगति</span>
                <span className="text-xs font-normal text-muted-foreground">Audited Municipal Record</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IssueTimeline updates={issue.updates} />
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: Status, SLA, Nodal Officer, Actions */}
        <div className="space-y-6">
          {/* Status & SLA Card */}
          <Card className="border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="font-headline text-base">Grievance Status · स्थिति</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <statusAppearance.icon className={`h-5 w-5 ${statusAppearance.className}`} />
                <span className="font-headline font-bold text-lg text-foreground">{issue.status}</span>
              </div>

              {/* Citizen Charter SLA Guarantee */}
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                  <Clock className="h-4 w-4" />
                  <span>SLA Guarantee: {issue.slaHours} Hours</span>
                </div>
                <p className="text-muted-foreground">
                  Under the state Right to Public Service Act, this issue must be inspected and addressed within {issue.slaHours} hours of logging.
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Last official update: {new Date(issue.updates[issue.updates.length - 1].timestamp).toLocaleString('en-IN')}
              </p>
            </CardContent>
          </Card>

          {/* Interactive Support & WhatsApp Mobilization */}
          <Card className="border shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="font-headline text-base">Mohalla Mobilization</CardTitle>
            </CardHeader>
            <CardContent>
              <IssueActionPanel issue={issue} />
            </CardContent>
          </Card>

          {/* Assigned Nodal Officer */}
          {issue.assignedOfficer ? (
            <Card className="border shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="font-headline text-base flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Assigned Nodal Officer</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border">
                    {issue.assignedOfficer.avatarUrl && (
                      <AvatarImage src={issue.assignedOfficer.avatarUrl} alt={issue.assignedOfficer.name} />
                    )}
                    <AvatarFallback className="font-bold bg-primary/10 text-primary">
                      {issue.assignedOfficer.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="font-bold text-sm text-foreground">{issue.assignedOfficer.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">{issue.assignedOfficer.designation}</p>
                    <p className="text-xs text-muted-foreground">{issue.assignedOfficer.department}</p>
                  </div>
                </div>

                {issue.assignedOfficer.contactNumber && (
                  <div className="pt-2 border-t flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Ward Office: <strong className="text-foreground">{issue.assignedOfficer.contactNumber}</strong></span>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="font-headline text-base">Jurisdiction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>{issue.location.corporation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{issue.location.ward}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reporter & Citizen Karma */}
          <Card className="border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="font-headline text-base">Filed By · सजग नागरिक</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={issue.reporter.avatarUrl} alt={issue.reporter.name} />
                  <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm text-foreground">{issue.reporter.name}</p>
                  {issue.reporter.badge && (
                    <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">{issue.reporter.badge}</p>
                  )}
                </div>
              </div>

              {issue.reporter.karmaPoints && (
                <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <span>Nagrik Karma Points:</span>
                  <span className="font-mono font-bold text-primary">{issue.reporter.karmaPoints} pts</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

