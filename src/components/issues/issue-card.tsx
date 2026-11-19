"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Issue } from '@/lib/types';
import { MapPin, ThumbsUp, Share2, Clock, CheckCircle2, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { getStatusAppearance } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard({ issue }: IssueCardProps) {
  const [upvotes, setUpvotes] = useState(issue.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const { toast } = useToast();
  const statusAppearance = getStatusAppearance(issue.status);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasUpvoted) {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
      toast({
        title: "जन समर्थन दर्ज! Upvote Recorded",
        description: `You supported issue #${issue.id}. High upvote count escalates priority to Ward Engineer.`,
      });
    }
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = `🚨 *Civic Issue Alert - JanSahayak*\n*${issue.title}*\n📍 ${issue.location.address} (${issue.location.ward}, ${issue.location.corporation})\n\nNeighbors, please upvote this so local municipal authorities resolve it quickly under the Citizen Charter:\nhttps://jansahayak.gov.in/issues/${issue.id}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="flex flex-col overflow-hidden border border-border/80 bg-card hover:border-primary/40 transition-all duration-200 group">
      {/* Photo Header */}
      <Link href={`/issues/${issue.id}`} className="block relative aspect-video overflow-hidden bg-muted">
        <Image
          src={issue.photoUrl}
          alt={issue.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={issue.photoHint}
        />
        {/* Status overlay banner on top right */}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 shadow-sm text-foreground">
          <statusAppearance.icon className="h-3.5 w-3.5 text-primary" />
          <span>{issue.status}</span>
        </div>

        {/* Resolved Badge if verified */}
        {issue.status === 'Resolved' && (
          <div className="absolute bottom-3 left-3 bg-emerald-700/90 text-white backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Verified Resolution · समाधान सत्यापित</span>
          </div>
        )}
      </Link>

      <CardContent className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed Metadata (Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <span className="text-primary font-semibold">{issue.location.corporation.split('(')[0].trim()}</span>
            <span aria-hidden="true">·</span>
            <span>{issue.location.ward.split('(')[0].trim()}</span>
            <span aria-hidden="true">·</span>
            <span className="text-foreground/80">{issue.categoryHindi}</span>
          </div>

          {/* Primary Title */}
          <h3 className="font-headline font-bold text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/issues/${issue.id}`} className="hover:underline">
              {issue.title}
            </Link>
          </h3>

          {/* Address with MapPin */}
          <div className="flex items-start text-xs text-muted-foreground gap-1.5">
            <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
            <span className="line-clamp-1">{issue.location.address}, PIN {issue.location.pincode}</span>
          </div>

          {/* Citizen Charter SLA Commitment */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/50">
            <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>SLA: <strong className="text-foreground">{issue.slaHours}h Guarantee</strong> under Citizen Charter</span>
          </div>

          {/* Assigned Nodal Officer */}
          {issue.assignedOfficer && (
            <div className="text-xs text-muted-foreground bg-muted/40 p-2 rounded">
              <span className="font-semibold text-foreground">Nodal Officer: </span>
              {issue.assignedOfficer.name} ({issue.assignedOfficer.department})
            </div>
          )}
        </div>

        {/* Footer Actions: Upvote & WhatsApp Sharing */}
        <div className="pt-3 border-t border-border/70 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              hasUpvoted
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/70 hover:bg-muted text-foreground'
            }`}
            title="Upvote this issue to escalate to municipal authorities"
          >
            <ThumbsUp className={`h-3.5 w-3.5 ${hasUpvoted ? 'fill-current' : ''}`} />
            <span>{upvotes} जन समर्थन</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
              title="Share to Society WhatsApp Group"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <Link
              href={`/issues/${issue.id}`}
              className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-0.5 ml-1"
            >
              <span>View</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

