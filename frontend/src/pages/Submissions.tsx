import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Submissions = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { getForm, getFormSubmissions, loadFormSubmissions, loadAllSubmissions, submissions, loading, submissionsLoading } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

  const form = formId ? getForm(parseInt(formId)) : null;
  const displaySubmissions = formId ? getFormSubmissions(parseInt(formId)) : submissions;

  useEffect(() => {
    if (formId) {
      // Load submissions for the specific form
      const formSubmissions = getFormSubmissions(parseInt(formId));
      if (formSubmissions.length === 0) {
        loadFormSubmissions(parseInt(formId));
      }
    } else {
      // Load all submissions when no formId is provided
      if (submissions.length === 0) {
        loadAllSubmissions();
      }
    }
  }, [formId, loadFormSubmissions, loadAllSubmissions, getFormSubmissions, submissions.length]);


  if (loading || submissionsLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  // Only show "form not found" if we're looking for a specific form but can't find it
  if (formId && !form) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Form not found</h1>
          <Button onClick={() => navigate("/forms")}>Back to Forms</Button>
        </div>
      </div>
    );
  }

  const filteredSubmissions = displaySubmissions.filter(submission => {
    if (!searchTerm) return true;
    return submission.answers.some(answer => 
      String(answer.answer).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const selectedSubmissionData = selectedSubmission 
    ? displaySubmissions.find(s => s.id.toString() === selectedSubmission)
    : null;

  const renderFieldValue = (answer: any) => {
    if (Array.isArray(answer.answer)) {
      return answer.answer.join(", ");
    }
    return String(answer.answer);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/forms")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {formId ? "Form Submissions" : "All Submissions"}
            </h1>
            <p className="text-muted-foreground">
              {formId ? `${form?.title} • ${displaySubmissions.length} submissions` : `${displaySubmissions.length} total submissions`}
            </p>
          </div>
        </div>
        
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {displaySubmissions.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-foreground mb-2">No submissions yet</h3>
          <p className="text-muted-foreground">
            {formId ? "Share your form to start collecting responses" : "No submissions found across all forms"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Submissions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredSubmissions.map((submission, index) => {
                    const isSelected = selectedSubmission === submission.id.toString();
                    const displayAnswers = submission.answers.slice(0, 2);
                    const submissionForm = form || submission.form;
                    
                    return (
                      <div
                        key={submission.id}
                        className={`p-4 cursor-pointer border-b hover:bg-muted/50 transition-colors ${
                          isSelected ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedSubmission(submission.id.toString())}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Submission #{index + 1}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {!formId && submissionForm && (
                          <div className="mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {submissionForm.title}
                            </Badge>
                          </div>
                        )}
                        <div className="space-y-1">
                          {displayAnswers.map((answer) => {
                            const field = submissionForm?.fields?.find(f => f.id === answer.field_id);
                            return (
                              <div key={answer.id} className="text-sm">
                                <span className="font-medium">{field?.label || `Field ${answer.field_id}`}: </span>
                                <span className="text-muted-foreground">
                                  {renderFieldValue(answer)}
                                </span>
                              </div>
                            );
                          })}
                          {submission.answers.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{submission.answers.length - 2} more fields
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submission Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSubmissionData ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Submitted:</span>
                        <p className="text-muted-foreground">
                          {new Date(selectedSubmissionData.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">IP Address:</span>
                        <p className="text-muted-foreground">
                          {selectedSubmissionData.ip_address || "N/A"}
                        </p>
                      </div>
                    </div>

                    {!formId && selectedSubmissionData.form && (
                      <div>
                        <span className="font-medium">Form:</span>
                        <p className="text-muted-foreground">
                          {selectedSubmissionData.form.title}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-4">Form Data</h4>
                      <div className="space-y-4">
                        {selectedSubmissionData.answers.map((answer) => {
                          const submissionForm = form || selectedSubmissionData.form;
                          const field = submissionForm?.fields?.find(f => f.id === answer.field_id);
                          return (
                            <div key={answer.id} className="space-y-1">
                              <Label className="font-medium">{field?.label || `Field ${answer.field_id}`}</Label>
                              <div className="p-3 bg-muted rounded-md">
                                {renderFieldValue(answer)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Select a submission from the list to view details
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;