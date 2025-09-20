import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const AllSubmissions = () => {
  const navigate = useNavigate();
  const { forms, submissions, loading, submissionsLoading, loadForms, loadFormSubmissions } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<number | null>(null);
  const [loadedForms, setLoadedForms] = useState<Set<number>>(new Set());

  // Load all forms and submissions
  useEffect(() => {
    if (forms.length === 0) {
      loadForms();
    }
  }, [forms.length, loadForms]);

  useEffect(() => {
    // Load submissions for all forms (only if not already loaded)
    if (forms.length > 0) {
      const formsToLoad = forms.filter(form => !loadedForms.has(form.id));
      
      if (formsToLoad.length > 0) {
        formsToLoad.forEach(form => {
          loadFormSubmissions(form.id);
          setLoadedForms(prev => new Set([...prev, form.id]));
        });
      }
    }
  }, [forms, loadFormSubmissions, loadedForms]);

  // Filter submissions based on search term and selected form
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = !searchTerm || submission.answers.some(answer => 
      String(answer.answer).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesForm = !selectedForm || submission.form_id === selectedForm;
    return matchesSearch && matchesForm;
  });

  // Auto-select first submission when submissions are loaded or filtered
  useEffect(() => {
    if (filteredSubmissions.length > 0) {
      const firstSubmissionId = filteredSubmissions[0].id.toString();
      if (!selectedSubmission || !filteredSubmissions.find(s => s.id.toString() === selectedSubmission)) {
        setSelectedSubmission(firstSubmissionId);
      }
    }
  }, [filteredSubmissions, selectedSubmission]);

  // Only show loading if forms haven't been loaded yet
  if (loading && forms.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  const selectedSubmissionData = selectedSubmission 
    ? submissions.find(s => s.id.toString() === selectedSubmission)
    : null;

  const renderFieldValue = (answer: any) => {
    if (Array.isArray(answer.answer)) {
      return answer.answer.join(", ");
    }
    return String(answer.answer);
  };

  const getFormTitle = (formId: number) => {
    const form = forms.find(f => f.id === formId);
    return form?.title || "Unknown Form";
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/forms")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Forms</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Submissions</h1>
            <p className="text-muted-foreground">View all form submissions across all forms</p>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedForm?.toString() || "all"} onValueChange={(value) => setSelectedForm(value === "all" ? null : parseInt(value))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Forms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Forms</SelectItem>
              {forms.map((form) => (
                <SelectItem key={form.id} value={form.id.toString()}>
                  {form.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Submissions ({filteredSubmissions.length})</span>
              {submissionsLoading && forms.length > 0 && loadedForms.size < forms.length && (
                <div className="text-sm text-muted-foreground">Loading submissions...</div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No submissions found</p>
                </div>
              ) : (
                filteredSubmissions.map((submission, index) => {
                  const isSelected = selectedSubmission === submission.id.toString();
                  const displayAnswers = submission.answers.slice(0, 2);
                  const form = forms.find(f => f.id === submission.form_id);
                  
                  return (
                    <div
                      key={submission.id}
                      className={`p-4 cursor-pointer border-b hover:bg-blue-50 transition-colors ${
                        isSelected ? "bg-blue-100" : ""
                      }`}
                      onClick={() => setSelectedSubmission(submission.id.toString())}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Submission #{index + 1}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{getFormTitle(submission.form_id)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {displayAnswers.map((answer) => {
                          const field = form?.fields.find(f => f.id === answer.field_id);
                          return (
                            <div key={answer.id} className="text-sm">
                              <span className="font-medium">{field?.label}: </span>
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
                })
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSubmissionData ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Form:</span>
                    <p className="text-muted-foreground">
                      {getFormTitle(selectedSubmissionData.form_id)}
                    </p>
                  </div>
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

                <div>
                  <h4 className="font-medium mb-4">Form Data</h4>
                  <div className="space-y-4">
                    {selectedSubmissionData.answers.map((answer) => {
                      const form = forms.find(f => f.id === selectedSubmissionData.form_id);
                      const field = form?.fields.find(f => f.id === answer.field_id);
                      return (
                        <div key={answer.id} className="space-y-1">
                          <Label className="font-medium">{field?.label}</Label>
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
  );
};

export default AllSubmissions;
