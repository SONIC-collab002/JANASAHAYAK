"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, Share2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Issue } from '@/lib/types';

export default function IssueActionPanel({ issue }: { issue: Issue }) {
  const [upvotes, setUpvotes] = useState(issue.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const { toast } = useToast();

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
      toast({
        title: "समर्थन दर्ज! Upvote Recorded",
        description: `Your support for issue #${issue.id} has been recorded. This signals urgency to the Ward Engineer.`,
      });
    }
  };

  const handleWhatsApp = () => {
    const text = `🚨 *Civic Issue Alert - JanSahayak*\n*${issue.title}*\n📍 ${issue.location.address} (${issue.location.ward}, ${issue.location.corporation})\n\nNeighbors, please upvote this complaint on JanSahayak so the municipal ward officer resolves it immediately under the Citizen Charter:\n${typeof window !== 'undefined' ? window.location.href : `https://jansahayak.gov.in/issues/${issue.id}`}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border">
        <div>
          <div className="font-headline font-bold text-2xl text-foreground tabular-nums">{upvotes}</div>
          <div className="text-xs text-muted-foreground font-medium">Citizen Upvotes · जन समर्थन</div>
        </div>
        <Button
          onClick={handleUpvote}
          variant={hasUpvoted ? "default" : "outline"}
          className="h-10 px-4 font-semibold text-xs sm:text-sm"
        >
          <ThumbsUp className={`mr-1.5 h-4 w-4 ${hasUpvoted ? 'fill-current' : ''}`} />
          {hasUpvoted ? "Supported · समर्थित" : "Support Issue · समर्थन दें"}
        </Button>
      </div>

      <Button
        onClick={handleWhatsApp}
        variant="outline"
        className="w-full h-11 border-emerald-600/30 text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100 font-semibold text-xs sm:text-sm"
      >
        <Share2 className="mr-2 h-4 w-4 text-emerald-600" />
        Share to Society WhatsApp Group · व्हाट्सएप पर भेजें
      </Button>
    </div>
  );
}
