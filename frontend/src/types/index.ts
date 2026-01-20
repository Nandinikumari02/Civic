export type UserRole = 'citizen' | 'department_admin' | 'staff' | 'super_admin';
export type IssueCategory = 'water' |'electricity' | 'roads' | 'sanitation' | 'streetlights' | 'drainage';
export type IssueStatus = 'pending' | 'in_progress' | 'resolved';


export interface User  {
   id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: IssueCategory;
  points?: number;
  avatar?: string;

}

 export interface Issue {
    id: string;
    title: string;
    description: string;
    category: IssueCategory;
    status: IssueStatus;
    location :{
        lat: number ;
        lng: number;
        address: string;
    }
    beforePhoto?: string;
    afterPhoto?: string;
    reportedBy: string;
    reportedAt: Date;
    assignedTo?: string;
    resolvedAt?: Date;
    upvotes: number;
    upvotedBy: string[];

 }

export interface StaffMember {
  id: string;
  name: string;
  department: IssueCategory;
  activeTasks: number;
}

export const CATEGORY_LABELS: Record<IssueCategory, string> = {
  water: 'Water Supply',
  electricity: 'Electricity',
  roads: 'Roads & Potholes',
  sanitation: 'Sanitation',
  streetlights: 'Street Lights',
  drainage: 'Drainage',
};

export const STATUS_LABELS: Record<IssueStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};
