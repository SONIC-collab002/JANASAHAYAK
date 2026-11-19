import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import IssueList from '@/components/issues/issue-list';
import { issues } from '@/lib/data';
import { INDIAN_CIVIC_HELPLINES, APP_NAME, APP_NAME_HINDI } from '@/lib/constants';
import {
  ArrowRight,
  ShieldCheck,
  Quote,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  PhoneCall,
  MapPin,
  Camera,
  Share2,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "JanSahayak has bridged the gap between municipal ward offices and citizens. In Bengaluru's Ward 114 alone, pothole repair turnaround dropped from 14 days to under 48 hours under the Citizen Charter.",
    name: "Er. Ramesh Kumar",
    title: "Chief Engineer (Road Infrastructure), BBMP Bengaluru",
    fallback: "RK",
  },
  {
    quote: "With GPS coordinates and timestamped before-and-after photographs, bogus ticket closure is impossible. Ward residents can verify cleanliness drives themselves.",
    name: "Dr. Sunita Sharma",
    title: "Zonal Sanitary Officer, MCD North Delhi",
    fallback: "SS",
  },
  {
    quote: "The ability for citizens to share grievances directly into neighborhood WhatsApp groups mobilizes community consensus. It helps us prioritize urgent public hazards immediately.",
    name: "Er. Rajesh Shinde",
    title: "Executive Engineer (Public Works), PMC Pune",
    fallback: "RS",
  },
];

export default function Home() {
  const totalIssues = 12450;
  const resolvedIssues = 8920;
  const activeCitizens = 54200;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section with Generated Indian Civic Asset */}
      <section className="relative w-full py-20 md:py-28 lg:py-36 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/src/assets/images/hero_indian_civic_1794151374959.jpg"
            alt="Indian modern civic avenue"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-950/60 to-slate-950/90" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>जनशक्ति से जनसेवा · Public Services Guarantee Act (SLA Mandate)</span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              आपका मोहल्ला, <span className="text-primary">आपकी सरकार</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
              Report potholes, overflowing garbage, water leaks, and dark spots directly to your Municipal Ward Engineer. Track real-time progress with guaranteed Citizen Charter timelines.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto font-bold text-base px-8 h-12 shadow-lg bg-primary hover:bg-primary/95 text-primary-foreground">
                <Link href="/report-issue">
                  Report a Grievance · शिकायत दर्ज करें <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20 text-white h-12 text-base">
                <Link href="/#issues">View Ward Grievances · वार्ड रिपोर्टें</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 24x7 Indian Civic Emergency Helplines Strip */}
      <section id="helplines" className="py-6 bg-slate-900 text-white border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <PhoneCall className="h-5 w-5 text-amber-400" />
              <div>
                <p className="font-headline font-bold text-sm">24x7 Nagrik Emergency Helplines</p>
                <p className="text-xs text-slate-400">टोल-फ्री नागरिक सहायता नंबर</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full lg:w-auto">
              {INDIAN_CIVIC_HELPLINES.map((helpline) => (
                <div
                  key={helpline.number}
                  className="bg-slate-800/80 hover:bg-slate-800 p-2.5 rounded-lg border border-slate-700 text-left transition-colors"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono font-bold text-base text-amber-400">{helpline.number}</span>
                    <span className="text-[10px] text-slate-400">Toll-Free</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 truncate">{helpline.hindiName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{helpline.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grounded Civic Facts & Transparency Metrics */}
      <section className="py-12 bg-card border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="space-y-1.5 pt-4 sm:pt-0">
              <div className="flex justify-center mb-1">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <p className="font-headline text-4xl font-bold text-foreground">{(activeCitizens / 1000).toFixed(1)}k+</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Ward Citizens · सजग नागरिक</p>
              <p className="text-xs text-muted-foreground/75">Covering 450+ Municipal Wards across India</p>
            </div>

            <div className="space-y-1.5 pt-4 sm:pt-0">
              <div className="flex justify-center mb-1">
                <TrendingUp className="h-7 w-7 text-accent" />
              </div>
              <p className="font-headline text-4xl font-bold text-foreground">{totalIssues.toLocaleString()}</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Grievances Registered · दर्ज समस्याएं</p>
              <p className="text-xs text-muted-foreground/75">Linked to PWD, Jal Board, SWM & Vidyut divisions</p>
            </div>

            <div className="space-y-1.5 pt-4 sm:pt-0">
              <div className="flex justify-center mb-1">
                <CheckCircle className="h-7 w-7 text-emerald-600" />
              </div>
              <p className="font-headline text-4xl font-bold text-foreground">{((resolvedIssues / totalIssues) * 100).toFixed(0)}%</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Verified Resolution · समाधान दर</p>
              <p className="text-xs text-muted-foreground/75">Certified via mandatory on-site photo audit</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Indian Citizen Charter & 3-Step Accountability Model */}
      <section id="charter" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Citizen Charter Mandate</span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mt-1 text-foreground">
              नागरिक अधिकार पत्र: जवाबदेही और गारंटी
            </h2>
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              Why Indian citizens trust JanSahayak over bureaucratic complaint boxes. Every complaint is tracked with legally backed service delivery deadlines.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border border-border/80 shadow-sm bg-card hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-3">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-headline text-foreground">1. Timebound SLA Guarantee</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Potholes: <strong>48 Hours</strong>. Garbage clearance: <strong>24 Hours</strong>. Broken streetlight: <strong>48 Hours</strong>. Backed by state Public Service Guarantee rules.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/80 shadow-sm bg-card hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-3">
                <div className="bg-emerald-500/10 text-emerald-600 p-3 rounded-lg w-fit">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-headline text-foreground">2. WhatsApp Mohalla Mobilization</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Share reports directly into your Apartment or Colony WhatsApp group with one click. When 50+ neighbors upvote, the Ward Parshad and Engineer receive immediate notification.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/80 shadow-sm bg-card hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-3">
                <div className="bg-blue-500/10 text-blue-600 p-3 rounded-lg w-fit">
                  <Camera className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-headline text-foreground">3. Geotagged Photo Verification</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No fake closure on paper. Municipal workers must upload a timestamped geotagged &quot;After&quot; photo from the exact spot before a ticket can be certified as resolved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet Your Ground Nodal Administration */}
      <section className="py-16 md:py-20 bg-card border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-square sm:aspect-video md:aspect-square rounded-2xl overflow-hidden border shadow-lg bg-muted">
              <Image
                src="/src/assets/images/indian_ward_officer_1794151375604.jpg"
                alt="Municipal Ward Civil Engineer"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent text-white">
                <p className="font-headline font-bold text-lg">Er. Rajesh Shinde</p>
                <p className="text-xs text-amber-300">Executive Engineer, Ward 42 Public Works · पुणे महानगरपालिका</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">On-Ground Accountability</span>
                <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground">
                  Meet Your Ward Officers & Engineers
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  In India, real civic change happens when citizens know exactly which Executive Engineer, Sanitary Inspector, or Line Supervisor is accountable for their street.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Official Department Tagging:</strong>
                    <p className="text-muted-foreground text-xs">Direct routing to PWD road squads, Jal Board valves, or SWM tippers without bureaucratic delays.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                  <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Audited Work Orders:</strong>
                    <p className="text-muted-foreground text-xs">Every contractor tender and material allocation is visible on the ticket timeline.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button asChild variant="outline" className="font-semibold">
                  <Link href="/admin">Access Municipal Administration Portal</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Community Grievances Watch */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">National Civic Feed</span>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground">
                Live Community Grievances · जन शिकायतें
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Real-time reports across Pune (PMC), Delhi (MCD), Bengaluru (BBMP), Mumbai (BMC), and Lucknow (LMC).
              </p>
            </div>
            <Button asChild className="shrink-0 font-semibold">
              <Link href="/report-issue">
                File a Complaint · शिकायत दर्ज करें
              </Link>
            </Button>
          </div>

          <IssueList issues={issues} />
        </div>
      </section>

      {/* Institutional Testimonials */}
      <section className="py-16 md:py-24 bg-card border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Administrative Endorsements</span>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground mt-1">
              प्रशासन और नागरिकों का विश्वास
            </h2>
            <p className="mt-2 text-muted-foreground text-sm">
              How Municipal Commissioners and Executive Engineers use JanSahayak to fulfill the Swachh Bharat mission.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col border border-border/80 shadow-xs hover:border-primary/40 transition-colors">
                <CardContent className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <Quote className="w-7 h-7 text-primary/40" />
                  <p className="text-muted-foreground text-sm leading-relaxed italic flex-grow">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t">
                    <Avatar className="h-10 w-10 border border-primary/30">
                      <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
                        {testimonial.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}