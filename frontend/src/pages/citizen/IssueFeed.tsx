
import { ReportIssueDialog } from "@/components/citizen/ReportIssueDialog";
import { mockIssues } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileWarning } from "lucide-react";
import { IssueCard } from "@/components/citizen/IssueCard";

export default function IssueFeed() {
     const pendingIssues = mockIssues.filter((i) => i.status ==='pending');
     const resolvedIssues = mockIssues.filter((i) => i.status === 'resolved');
     const inProgressIssues = mockIssues.filter((i) => i.status === 'in_progress');

     return(
        
     <div className="space-y-6">
                {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileWarning className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Issue Feed</h1>
              <p className="text-muted-foreground">
                Browse and track all civic issues in your area
              </p>
            </div>
          </div>
          <ReportIssueDialog />
        </div>


         {/* {IssueTab}   */}
       <Tabs defaultValue="all" className="w-full border-bordered rounded-lg">
         <TabsList className="mb-4 bg-secondary ">
           <TabsTrigger value="all" >All Issues({mockIssues.length})</TabsTrigger>
           <TabsTrigger value="pending">Pending({pendingIssues.length})</TabsTrigger>
           <TabsTrigger value="in_progress">In Progress({inProgressIssues.length})</TabsTrigger>
           <TabsTrigger value="resolved">Resolved({resolvedIssues.length})</TabsTrigger>
         </TabsList>

         <TabsContent value="all" className="space-y-4 mt-0 ">
            {mockIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue}/>
            ))}
         </TabsContent>
           <TabsContent value="pending" className="space-y-4 mt-0">
            {pendingIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} />
            ))}
            </TabsContent>
            <TabsContent value="in_progress" className="space-y mt-0">
                {inProgressIssues.map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </TabsContent>
            <TabsContent value="resolved" className="space-y mt-0">
                {resolvedIssues.map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </TabsContent>

       </Tabs>
     </div>
       )
    
}