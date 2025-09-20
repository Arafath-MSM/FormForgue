export interface FormField {
  id: number;
  form_id: number;
  type: 'text' | 'textarea' | 'checkbox' | 'radio' | 'select';
  label: string;
  required: boolean;
  options?: string[];
  order: number;
  created_at: string;
  updated_at: string;
}

export interface FormFieldBuilder {
  id: number;
  type: 'text' | 'textarea' | 'checkbox' | 'radio' | 'select';
  label: string;
  required: boolean;
  options?: string[];
  order: number;
}

export interface Form {
  id: number;
  title: string;
  description?: string;
  fields: FormField[];
  created_at: string;
  updated_at: string;
}

export interface SubmissionAnswer {
  id: number;
  submission_id: number;
  field_id: number;
  answer: string;
  created_at: string;
  updated_at: string;
  field?: FormField;
}

export interface FormSubmission {
  id: number;
  form_id: number;
  ip_address?: string;
  created_at: string;
  updated_at: string;
  answers: SubmissionAnswer[];
  form?: Form;
}

export interface FormSubmissionData {
  [fieldId: number]: string | string[];
}

export interface CreateFormData {
  title: string;
  description?: string;
  fields: {
    label: string;
    type: 'text' | 'textarea' | 'checkbox' | 'radio' | 'select';
    required: boolean;
    options?: string[];
    order: number;
  }[];
}