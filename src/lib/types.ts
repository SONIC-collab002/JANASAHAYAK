export type IssueStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved' | 'Rejected';

export type StatusUpdate = {
  status: IssueStatus;
  timestamp: string; // ISO 8601 date string
  notes?: string;
  officialDepartment?: string;
};

export type NodalOfficer = {
  name: string;
  designation: string;
  department: string;
  ward: string;
  contactNumber?: string;
  avatarUrl?: string;
};

export type Issue = {
  id: string;
  title: string;
  category: string;
  categoryHindi: string;
  description: string;
  photoUrl: string;
  photoHint: string;
  resolvedPhotoUrl?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    ward: string;
    corporation: string;
    pincode: string;
  };
  status: IssueStatus;
  submittedAt: string; // ISO 8601 date string
  slaDeadline: string; // SLA commitment timestamp
  slaHours: number;
  upvotes: number;
  reporter: {
    name: string;
    avatarUrl: string;
    karmaPoints?: number;
    badge?: string;
  };
  assignedOfficer?: NodalOfficer;
  updates: StatusUpdate[];
};

