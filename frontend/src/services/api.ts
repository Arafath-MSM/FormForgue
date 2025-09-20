import { Form, FormSubmission, CreateFormData, FormSubmissionData } from '../types/form';

const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Forms API
  async getForms(): Promise<Form[]> {
    return this.request<Form[]>('/forms');
  }

  async getForm(id: number): Promise<Form> {
    return this.request<Form>(`/forms/${id}`);
  }

  async createForm(formData: CreateFormData): Promise<Form> {
    return this.request<Form>('/forms', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async updateForm(id: number, formData: CreateFormData): Promise<Form> {
    return this.request<Form>(`/forms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
    });
  }

  async deleteForm(id: number): Promise<void> {
    return this.request<void>(`/forms/${id}`, {
      method: 'DELETE',
    });
  }

  // Submissions API
  async getFormSubmissions(formId: number): Promise<FormSubmission[]> {
    return this.request<FormSubmission[]>(`/forms/${formId}/submissions`);
  }

  async getSubmission(submissionId: number): Promise<FormSubmission> {
    return this.request<FormSubmission>(`/submissions/${submissionId}`);
  }

  async submitForm(formId: number, submissionData: FormSubmissionData): Promise<FormSubmission> {
    // Convert number keys to strings for Laravel API
    const dataWithStringKeys: Record<string, string | string[]> = {};
    Object.entries(submissionData).forEach(([key, value]) => {
      dataWithStringKeys[key] = value;
    });
    
    return this.request<FormSubmission>(`/forms/${formId}/submissions`, {
      method: 'POST',
      body: JSON.stringify({ data: dataWithStringKeys }),
    });
  }
}

export const apiService = new ApiService();
