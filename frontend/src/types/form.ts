export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'checkbox' | 'radio';
  label: string;
  required: boolean;
  options?: string[];
  order: number;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
  ipAddress?: string;
}

export interface FormSubmissionData {
  [fieldId: string]: string | string[];
}