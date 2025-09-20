import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback, useMemo } from "react";
import { Form, FormSubmission, CreateFormData } from "@/types/form";
import { apiService } from "@/services/api";

interface FormContextType {
  forms: Form[];
  submissions: FormSubmission[];
  loading: boolean;
  submissionsLoading: boolean;
  error: string | null;
  addForm: (formData: CreateFormData) => Promise<Form>;
  updateForm: (formId: number, formData: CreateFormData) => Promise<void>;
  deleteForm: (formId: number) => Promise<void>;
  getForm: (formId: number) => Form | undefined;
  addSubmission: (formId: number, data: Record<string, any>) => Promise<void>;
  getFormSubmissions: (formId: number) => FormSubmission[];
  loadForms: () => Promise<void>;
  loadFormSubmissions: (formId: number) => Promise<void>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [forms, setForms] = useState<Form[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formsLoaded, setFormsLoaded] = useState(false);

  const loadForms = useCallback(async () => {
    // Prevent duplicate calls
    if (formsLoaded || loading) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const formsData = await apiService.getForms();
      setForms(formsData);
      setFormsLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load forms');
    } finally {
      setLoading(false);
    }
  }, [formsLoaded, loading]);

  const loadFormSubmissions = useCallback(async (formId: number) => {
    // Check if submissions for this form are already loaded
    const existingSubmissions = submissions.filter(s => s.form_id === formId);
    if (existingSubmissions.length > 0) {
      return; // Already loaded, no need to fetch again
    }

    try {
      setSubmissionsLoading(true);
      setError(null);
      const submissionsData = await apiService.getFormSubmissions(formId);
      // Update submissions for this form
      setSubmissions(prev => {
        const otherSubmissions = prev.filter(s => s.form_id !== formId);
        return [...otherSubmissions, ...submissionsData];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submissions');
    } finally {
      setSubmissionsLoading(false);
    }
  }, [submissions]);

  const addForm = async (formData: CreateFormData) => {
    try {
      setLoading(true);
      setError(null);
      const newForm = await apiService.createForm(formData);
      setForms(prev => [...prev, newForm]);
      return newForm;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create form');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateForm = async (formId: number, formData: CreateFormData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedForm = await apiService.updateForm(formId, formData);
      setForms(prev => prev.map(form => 
        form.id === formId ? updatedForm : form
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update form');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (formId: number) => {
    try {
      setLoading(true);
      setError(null);
      await apiService.deleteForm(formId);
      setForms(prev => prev.filter(form => form.id !== formId));
      setSubmissions(prev => prev.filter(submission => submission.form_id !== formId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete form');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getForm = (formId: number) => {
    return forms.find(form => form.id === formId);
  };

  const addSubmission = async (formId: number, data: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      const newSubmission = await apiService.submitForm(formId, data);
      setSubmissions(prev => [...prev, newSubmission]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getFormSubmissions = (formId: number) => {
    return submissions.filter(submission => submission.form_id === formId);
  };

  // Load forms on mount
  useEffect(() => {
    loadForms();
  }, []);

  const contextValue = useMemo(() => ({
    forms,
    submissions,
    loading,
    submissionsLoading,
    error,
    addForm,
    updateForm,
    deleteForm,
    getForm,
    addSubmission,
    getFormSubmissions,
    loadForms,
    loadFormSubmissions,
  }), [forms, submissions, loading, submissionsLoading, error, addForm, updateForm, deleteForm, getForm, addSubmission, getFormSubmissions, loadForms, loadFormSubmissions]);

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}