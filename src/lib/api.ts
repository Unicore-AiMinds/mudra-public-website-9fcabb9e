// API client using Supabase (no backend server needed!)
import { supabase } from './supabase';
import { localStorageService } from './localStorage';

const isDev = import.meta.env.DEV;

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

class ApiClient {
  // Submit contact form
  async submitContact(data: {
    name: string;
    email: string;
    phone: string;
    serviceInquiry: string;
    message: string;
    formType: 'dental' | 'aesthetic';
  }): Promise<ApiResponse<ContactSubmission>> {
    try {
      // Map formType to clinic
      const clinic = data.formType === 'dental' ? 'dental_metrix' : 'meditouch';

      const submission = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service_inquiry: data.serviceInquiry,
        message: data.message,
        clinic,
        status: 'new' as const
      };

      // Use localStorage in development, Supabase in production
      const result = isDev
        ? localStorageService.insert(submission)
        : await supabase.from<ContactSubmission>('contact_submissions').insert(submission);

      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Error submitting contact:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit contact'
      };
    }
  }

  // Get submissions with filtering
  async getSubmissions(filters: SubmissionFilters = {}): Promise<ApiResponse<ContactSubmission[]>> {
    try {
      const {
        clinic,
        status,
        search,
        page = 1,
        limit = 10,
        sortBy = 'submitted_at',
        sortOrder = 'desc'
      } = filters;

      // Fetch all data from localStorage (dev) or Supabase (prod)
      let allData: ContactSubmission[];

      if (isDev) {
        allData = localStorageService.getAll();
      } else {
        const supabaseFilters: Record<string, unknown> = {};
        if (clinic) supabaseFilters.clinic = clinic;
        if (status && status !== 'all') supabaseFilters.status = status;

        allData = await supabase.from<ContactSubmission>('contact_submissions').getAll({
          order: { column: sortBy, ascending: sortOrder === 'asc' },
          filters: supabaseFilters
        });
      }

      // Apply filters
      let filteredData = allData;

      if (clinic) {
        filteredData = filteredData.filter(item => item.clinic === clinic);
      }

      if (status && status !== 'all') {
        filteredData = filteredData.filter(item => item.status === status);
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(searchLower) ||
          item.email.toLowerCase().includes(searchLower) ||
          item.phone.includes(search) ||
          item.service_inquiry.toLowerCase().includes(searchLower)
        );
      }

      // Sort
      filteredData.sort((a, b) => {
        const aVal = (a as any)[sortBy] || '';
        const bVal = (b as any)[sortBy] || '';
        return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
      });

      // Apply pagination
      const total = filteredData.length;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;
      const paginatedData = filteredData.slice(offset, offset + limit);

      return {
        success: true,
        data: paginatedData,
        total,
        page,
        totalPages
      };
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch submissions',
        data: []
      };
    }
  }

  // Update submission status
  async updateSubmissionStatus(id: number, status: ContactSubmission['status']): Promise<ApiResponse<ContactSubmission>> {
    try {
      if (isDev) {
        localStorageService.updateStatus(id, status);
        const updated = localStorageService.getById(id);
        return { success: true, data: updated };
      }

      const result = await supabase.from<ContactSubmission>('contact_submissions').update(id, { status });
      return { success: true, data: result };
    } catch (error) {
      console.error('Error updating submission status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update submission status'
      };
    }
  }

  // Get analytics data
  async getAnalytics(): Promise<ApiResponse<AnalyticsData>> {
    try {
      // Fetch all submissions
      const allSubmissions = isDev
        ? localStorageService.getAll()
        : await supabase.from<ContactSubmission>('contact_submissions').getAll();

      // Calculate analytics
      const total = allSubmissions.length;
      const dental = allSubmissions.filter(s => s.clinic === 'dental_metrix').length;
      const aesthetic = allSubmissions.filter(s => s.clinic === 'meditouch').length;

      const byStatus: Record<string, number> = {
        new: 0,
        contacted: 0,
        'follow-up': 0,
        scheduled: 0,
        closed: 0
      };

      allSubmissions.forEach(submission => {
        byStatus[submission.status] = (byStatus[submission.status] || 0) + 1;
      });

      return {
        success: true,
        data: {
          total,
          dental,
          aesthetic,
          byStatus
        }
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch analytics'
      };
    }
  }

  // Get submission by ID
  async getSubmissionById(id: number): Promise<ApiResponse<ContactSubmission>> {
    try {
      const result = isDev
        ? localStorageService.getById(id)
        : await supabase.from<ContactSubmission>('contact_submissions').getById(id);

      if (!result) {
        return { success: false, error: 'Submission not found' };
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Error fetching submission:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch submission'
      };
    }
  }

  // Delete submission
  async deleteSubmission(id: number): Promise<ApiResponse<{ message: string }>> {
    try {
      if (isDev) {
        localStorageService.delete(id);
      } else {
        await supabase.from<ContactSubmission>('contact_submissions').delete(id);
      }

      return {
        success: true,
        data: { message: 'Submission deleted successfully' }
      };
    } catch (error) {
      console.error('Error deleting submission:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete submission'
      };
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    try {
      // Simple health check - try to fetch from Supabase
      await supabase.from<ContactSubmission>('contact_submissions').getAll({ limit: 1 });

      return {
        success: true,
        data: {
          message: 'Supabase connection healthy',
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Health check failed'
      };
    }
  }
}

export const apiClient = new ApiClient();
