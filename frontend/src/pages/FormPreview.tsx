import { useParams, useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Download, Share } from "lucide-react";
import FormRenderer from "@/components/FormRenderer/FormRenderer";
import { FormSubmissionData } from "@/types/form";
import { useToast } from "@/hooks/use-toast";

const FormPreview = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { getForm, addSubmission } = useFormContext();
  const { toast } = useToast();

  const form = formId ? getForm(formId) : null;

  if (!form) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Form not found</h1>
          <Button onClick={() => navigate("/forms")}>Back to Forms</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: FormSubmissionData) => {
    try {
      await addSubmission({
        formId: form.id,
        data,
        ipAddress: "127.0.0.1" // Mock IP for demo
      });
      
      toast({
        title: "Success!",
        description: "Your form has been submitted successfully."
      });
      
      // Navigate to a success page or back to forms
      navigate("/forms");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyUrl = () => {
    const url = `${window.location.origin}/preview/${form.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Form URL has been copied to clipboard"
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Form Preview</h1>
              <p className="text-sm text-muted-foreground">{form.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={copyUrl}>
              <Copy className="mr-2 h-4 w-4" />
              Copy URL
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <FormRenderer 
          form={form} 
          onSubmit={handleSubmit}
          isPreview={true}
        />
      </div>
    </div>
  );
};

export default FormPreview;