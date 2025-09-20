import { useFormContext } from "@/contexts/FormContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { forms, submissions } = useFormContext();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Forms",
      value: forms.length,
      icon: FileText,
      color: "text-primary",
    },
    {
      title: "Total Submissions",
      value: submissions.length,
      icon: Users,
      color: "text-success",
    },
    {
      title: "Active Forms",
      value: forms.length,
      icon: Eye,
      color: "text-destructive",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your form builder dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => navigate("/builder")} className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Create New Form
            </Button>
            <Button variant="outline" onClick={() => navigate("/forms")} className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Manage Forms
            </Button>
            <Button variant="outline" onClick={() => navigate("/submissions")} className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              View Submissions
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Forms</CardTitle>
          </CardHeader>
          <CardContent>
            {forms.length === 0 ? (
              <p className="text-muted-foreground">No forms created yet</p>
            ) : (
              <div className="space-y-2">
                {forms.slice(0, 5).map((form) => (
                  <div key={form.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm font-medium">{form.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(form.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;