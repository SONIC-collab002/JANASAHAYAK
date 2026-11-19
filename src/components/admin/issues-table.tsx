"use client";

import { useState } from "react";
import type { Issue, IssueStatus } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { getStatusAppearance, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ALL_STATUSES: IssueStatus[] = ['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Rejected'];

export default function IssuesTable({ initialIssues }: { initialIssues: Issue[] }) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [filter, setFilter] = useState('');

  const handleStatusChange = (issueId: string, newStatus: IssueStatus) => {
    try {
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === issueId ? { ...issue, status: newStatus, updates: [...issue.updates, {status: newStatus, timestamp: new Date().toISOString()}] } : issue
        )
      );
    } catch (err) {
      console.error("Error updating issue status in IssuesTable:", err);
    }
  };
  
  const filteredIssues = issues.filter(issue => 
    issue.title.toLowerCase().includes(filter.toLowerCase()) ||
    issue.id.toLowerCase().includes(filter.toLowerCase()) ||
    issue.category.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());


  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="mb-4">
            <Input 
                placeholder="Filter by title, ID, or category..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="max-w-sm"
            />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Ticket ID</TableHead>
                <TableHead>Grievance & Ward</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Citizen Charter SLA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => {
                const statusAppearance = getStatusAppearance(issue.status);
                const latestUpdate = issue.updates[issue.updates.length - 1];
                return (
                  <TableRow key={issue.id}>
                    <TableCell className="font-mono font-semibold text-xs align-top">
                      <a href={`/issues/${issue.id}`} className="text-primary hover:underline">
                        {issue.id}
                      </a>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {issue.upvotes} समर्थन
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <a href={`/issues/${issue.id}`} className="font-semibold text-sm hover:text-primary transition-colors block">
                        {issue.title}
                      </a>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {issue.location.corporation.split('(')[0].trim()} · {issue.location.ward}
                      </p>
                      {latestUpdate.notes && (
                        <p className="text-xs text-muted-foreground mt-1.5 bg-muted/60 p-2 rounded-md">
                          <span className="font-semibold text-foreground">Update:</span> {latestUpdate.notes}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="text-xs font-semibold">{issue.category}</div>
                      <div className="text-[11px] text-muted-foreground">{issue.categoryHindi}</div>
                    </TableCell>
                    <TableCell className="align-top text-xs">
                      <div className="font-semibold text-foreground">{issue.slaHours}h Mandate</div>
                      <div className="text-[11px] text-muted-foreground">
                        Logged: {new Date(issue.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <Badge variant={statusAppearance.variant} className={cn('gap-1.5 text-xs', statusAppearance.className)}>
                        <statusAppearance.icon className="h-3 w-3" />
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right align-top">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {ALL_STATUSES.map(status => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() => handleStatusChange(issue.id, status)}
                              disabled={issue.status === status}
                            >
                              Mark as {status}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
