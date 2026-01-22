import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StaffMember {
    id:string;
    name:string;
    activeTasks:number;
}

interface StaffListCardProps {
    staff:StaffMember[];
    title?:string;
}
export function StaffListCard({ staff, title = 'Department Staff'}: StaffListCardProps) {
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary"/>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {staff.map((member) => (
                    <StaffListItem key={member.id} staff={member}/>
                ))}
                 {staff.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No staff members found
          </p>
        )}
            </CardContent>
        </Card>

    );
}

interface StaffListItemProps {
    staff:StaffMember;
}

export function StaffListItem({ staff }: StaffListItemProps) {
  const getStatusColor = (activeTasks: number) => {
    if (activeTasks === 0) return 'bg-success';
    if (activeTasks < 3) return 'bg-warning';
    return 'bg-destructive';
  };


  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {staff.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div>
          <p className="font-medium text-sm">{staff.name}</p>
          <p className="text-xs text-muted-foreground">
            {staff.activeTasks} active tasks
          </p>
        </div>
      </div>
      <div className={`h-2 w-2 rounded-full ${getStatusColor(staff.activeTasks)}`} />
    </div>
  );
}

