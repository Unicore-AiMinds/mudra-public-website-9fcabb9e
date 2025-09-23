// API client for database operations

export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  phone: string;
  service_inquiry: string;
  message: string;
  clinic: 'dental_metrix' | 'meditouch';
  status: 'new' | 'contacted' | 'follow-up' | 'scheduled' | 'closed';
  submitted_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  page?: number;
  totalPages?: number;
}

export interface SubmissionFilters {
  clinic?: 'dental_metrix' | 'meditouch';
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AnalyticsData {
  total: number;
  dental: number;
  aesthetic: number;
  byStatus: Record<string, number>;
}

const API_BASE = '/api';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API request error:', error);
      throw new Error('Network error occurred');
    }
  }

  // Submit contact form
  async submitContact(data: {
    name: string;
    email: string;
    phone: string;
    serviceInquiry: string;
    message: string;
    formType: 'dental' | 'aesthetic';
  }): Promise<ApiResponse<ContactSubmission>> {
    return this.request<ContactSubmission>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get submissions with filtering
  async getSubmissions(filters: SubmissionFilters = {}): Promise<ApiResponse<ContactSubmission[]>> {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    const endpoint = queryString ? `/admin/submissions?${queryString}` : '/admin/submissions';

    return this.request<ContactSubmission[]>(endpoint);
  }

  // Update submission status
  async updateSubmissionStatus(id: number, status: ContactSubmission['status']): Promise<ApiResponse<ContactSubmission>> {
    return this.request<ContactSubmission>(`/admin/submissions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Get analytics data
  async getAnalytics(): Promise<ApiResponse<AnalyticsData>> {
    return this.request<AnalyticsData>('/admin/analytics');
  }

  // Get submission by ID
  async getSubmissionById(id: number): Promise<ApiResponse<ContactSubmission>> {
    return this.request<ContactSubmission>(`/admin/submissions/${id}`);
  }

  // Delete submission
  async deleteSubmission(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/admin/submissions/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    return this.request<{ message: string; timestamp: string }>('/health');
  }
}

export const apiClient = new ApiClient();