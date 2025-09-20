const API_BASE_URL = 'http://localhost:8000/api';

interface ApiResponse<T> {
  data: T;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Forms API
  async getForms() {
    return this.request('/forms');
  }

  async getForm(id: string) {
    return this.request(`/forms/${id}`);
  }

  async createForm(formData: any) {
    return this.request('/forms', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async updateForm(id: string, formData: any) {
    return this.request(`/forms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
    });
  }

  async deleteForm(id: string) {
    return this.request(`/forms/${id}`, {
      method: 'DELETE',
    });
  }

  // Submissions API
  async getFormSubmissions(formId: string) {
    return this.request(`/forms/${formId}/submissions`);
  }

  async getSubmission(submissionId: string) {
    return this.request(`/submissions/${submissionId}`);
  }

  async submitForm(formId: string, submissionData: any) {
    return this.request(`/forms/${formId}/submissions`, {
      method: 'POST',
      body: JSON.stringify({ data: submissionData }),
    });
  }
}

export const apiService = new ApiService();
