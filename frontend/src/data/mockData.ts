import type { Issue, StaffMember, IssueCategory } from '@/types';

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Water pipeline leakage on MG Road',
    description: 'Major water leakage causing road damage and water wastage near the main junction.',
    category: 'water',
    status: 'pending',
    location: { lat: 28.6139, lng: 77.209, address: 'MG Road, Sector 14, Delhi' },
    reportedBy: 'Rahul Sharma',
    reportedAt: new Date('2024-01-05'),
    upvotes: 24,
    upvotedBy: ['1', '5', '7'],
    beforePhoto: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400',
  },
  {
    id: '2',
    title: 'Street light not working',
    description: 'The street light near park entrance has been non-functional for 2 weeks.',
    category: 'streetlights',
    status: 'in_progress',
    location: { lat: 28.6129, lng: 77.2295, address: 'Green Park, Block B, Delhi' },
    reportedBy: 'Anita Desai',
    reportedAt: new Date('2024-01-03'),
    assignedTo: 'Amit Kumar',
    upvotes: 18,
    upvotedBy: ['2', '3'],
    beforePhoto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
  {
    id: '3',
    title: 'Large pothole causing accidents',
    description: 'Dangerous pothole on the main road. Multiple accidents reported.',
    category: 'roads',
    status: 'resolved',
    location: { lat: 28.6448, lng: 77.2167, address: 'Ring Road, Near Metro Station, Delhi' },
    reportedBy: 'Suresh Gupta',
    reportedAt: new Date('2024-01-01'),
    resolvedAt: new Date('2024-01-04'),
    assignedTo: 'Ravi Singh',
    upvotes: 45,
    upvotedBy: ['1', '2', '4', '6'],
    beforePhoto: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400',
    afterPhoto: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
  },
  {
    id: '4',
    title: 'Drainage overflow in residential area',
    description: 'Sewage overflow causing health hazards in the colony.',
    category: 'drainage',
    status: 'pending',
    location: { lat: 28.5355, lng: 77.391, address: 'Noida Sector 62, Block A' },
    reportedBy: 'Meera Joshi',
    reportedAt: new Date('2024-01-06'),
    upvotes: 32,
    upvotedBy: ['3', '5', '8'],
    beforePhoto: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400',
  },
  {
    id: '5',
    title: 'Electricity fluctuation in sector',
    description: 'Frequent power cuts and voltage issues affecting the entire sector.',
    category: 'electricity',
    status: 'in_progress',
    location: { lat: 28.4595, lng: 77.0266, address: 'Gurugram Sector 45' },
    reportedBy: 'Karan Mehta',
    reportedAt: new Date('2024-01-04'),
    assignedTo: 'Vikram Yadav',
    upvotes: 56,
    upvotedBy: ['1', '4', '7', '9'],
    beforePhoto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
  {
    id: '6',
    title: 'Garbage not collected for days',
    description: 'Garbage pile-up in the area causing foul smell and health concerns.',
    category: 'sanitation',
    status: 'pending',
    location: { lat: 28.7041, lng: 77.1025, address: 'Model Town, Phase 2' },
    reportedBy: 'Pooja Verma',
    reportedAt: new Date('2024-01-07'),
    upvotes: 28,
    upvotedBy: ['2', '6'],
    beforePhoto: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400',
  },
];

export const mockStaff: StaffMember[] = [
  { id: 's1', name: 'Amit Kumar', department: 'water', activeTasks: 2 },
  { id: 's2', name: 'Ravi Singh', department: 'roads', activeTasks: 1 },
  { id: 's3', name: 'Vikram Yadav', department: 'electricity', activeTasks: 3 },
  { id: 's4', name: 'Sunil Sharma', department: 'sanitation', activeTasks: 0 },
  { id: 's5', name: 'Deepak Verma', department: 'drainage', activeTasks: 2 },
  { id: 's6', name: 'Rajesh Gupta', department: 'streetlights', activeTasks: 1 },
];

export const getIssuesByDepartment = (department: IssueCategory): Issue[] => {
  return mockIssues.filter((issue) => issue.category === department);
};

export const getIssuesByStaff = (staffName: string): Issue[] => {
  return mockIssues.filter((issue) => issue.assignedTo === staffName);
};

export const getStaffByDepartment = (department: IssueCategory): StaffMember[] => {
  return mockStaff.filter((staff) => staff.department === department);
};
