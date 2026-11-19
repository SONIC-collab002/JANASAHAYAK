"use client";

import { useState } from 'react';
import type { Issue } from "@/lib/types";
import IssueCard from "./issue-card";
import { Input } from "@/components/ui/input";
import { Search, Flame, CheckCircle, Clock } from "lucide-react";

type IssueListProps = {
  issues: Issue[];
};

export default function IssueList({ issues }: IssueListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'progress' | 'resolved'>('all');
  const [selectedCorp, setSelectedCorp] = useState<string>('all');

  const filteredIssues = issues.filter((issue) => {
    // Search query matching title, address, ward, corporation, or category
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      issue.title.toLowerCase().includes(query) ||
      issue.location.address.toLowerCase().includes(query) ||
      issue.location.ward.toLowerCase().includes(query) ||
      issue.location.corporation.toLowerCase().includes(query) ||
      issue.categoryHindi.includes(query) ||
      issue.category.toLowerCase().includes(query);

    // City / Corp filter
    const matchesCorp =
      selectedCorp === 'all' || issue.location.corporation.includes(selectedCorp);

    // Status / urgency filter
    if (activeFilter === 'urgent') {
      return matchesSearch && matchesCorp && issue.upvotes >= 200;
    }
    if (activeFilter === 'progress') {
      return matchesSearch && matchesCorp && (issue.status === 'In Progress' || issue.status === 'Under Review');
    }
    if (activeFilter === 'resolved') {
      return matchesSearch && matchesCorp && issue.status === 'Resolved';
    }

    return matchesSearch && matchesCorp;
  });

  return (
    <div id="issues" className="space-y-6">
      {/* Control Bar: Search & Interactive Filter Segmented Buttons */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-card p-4 rounded-xl border border-border/70 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Ward, Mohalla, City (उदा. Shivajinagar, Rohini, MG Road)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-background"
          />
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-muted-foreground whitespace-nowrap font-semibold mr-1">City:</span>
          {['all', 'Pune', 'Delhi', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Lucknow'].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCorp(city)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedCorp === city
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              {city === 'all' ? 'All Cities' : city}
            </button>
          ))}
        </div>
      </div>

      {/* Segmented Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeFilter === 'all'
              ? 'bg-foreground text-background shadow-sm'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <span>All Grievances ({issues.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('urgent')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeFilter === 'urgent'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          <span>High Urgency / जन समर्थन (&gt;200)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('progress')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeFilter === 'progress'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Under Municipal Action · प्रगति पर</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('resolved')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeFilter === 'resolved'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Verified Resolved · समाधान सत्यापित</span>
        </button>
      </div>

      {/* Issues Grid */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-muted/20 border border-dashed rounded-xl space-y-3">
          <p className="font-headline font-semibold text-lg text-foreground">No matching civic issues found</p>
          <p className="text-sm text-muted-foreground">Try clearing search filters or check another city/ward.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
              setSelectedCorp('all');
            }}
            className="text-xs font-bold text-primary hover:underline"
          >
            Reset All Filters · सभी फ़िल्टर हटाएं
          </button>
        </div>
      )}
    </div>
  );
}

