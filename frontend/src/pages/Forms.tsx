import { useFormContext } from "@/contexts/FormContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2, Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Forms = () => {
  const { forms, deleteForm, getFormSubmissions } = useFormContext();
  const navigate = useNavigate();

  const handleEdit = (formId: string) => {
    navigate(`/builder?edit=${formId}`);
  };

  const handlePreview = (formId: string) => {
    navigate(`/preview/${formId}`);
  };

  const handleDelete = async (formId: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await deleteForm(formId);
      } catch (error) {
        console.error("Failed to delete form:", error);
      }
    }
  };

  const handleViewSubmissions = (formId: string) => {
    navigate(`/submissions/${formId}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forms</h1>
          <p className="text-muted-foreground">Manage your forms and view submissions</p>
        </div>
        <Button onClick={() => navigate("/builder")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No forms yet</h3>
          <p className="text-muted-foreground mb-4">Create your first form to get started</p>
          <Button onClick={() => navigate("/builder")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Form
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => {
            const submissionCount = getFormSubmissions(form.id).length;
            return (
              <Card key={form.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">{form.title}</h3>
                  </div>
                  
                  {form.description && (
                    <p className="text-muted-foreground text-sm mb-4">{form.description}</p>
                  )}
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleEdit(form.id)}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(form.id)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSubmissions(form.id)}
                    >
                      {submissionCount}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(form.id)}
                      className="text-destructive hover:text-destructive ml-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Created {new Date(form.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Forms;