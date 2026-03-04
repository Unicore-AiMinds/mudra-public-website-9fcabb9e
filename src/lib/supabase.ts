/**
 * Supabase client for direct REST API access
 * No backend server needed - works directly from the browser
 */

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Generic function to make a request to the Supabase REST API
 */
async function supabaseRequest<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  data?: Record<string, unknown>,
  options?: {
    headers?: Record<string, string>;
    params?: Record<string, string>;
  }
): Promise<T> {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);

  // Add query parameters if provided
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Default headers for Supabase
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    ...options?.headers,
  };

  try {
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log(`[SUPABASE] Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error(`[SUPABASE] Error response:`, errorData);
      } catch (e) {
        const textResponse = await response.text().catch(() => 'Could not read response');
        console.error(`[SUPABASE] Raw error:`, textResponse);
        errorData = { message: 'Could not parse error response' };
      }

      throw new Error(
        `Supabase request failed: ${response.status} ${response.statusText}${
          errorData ? ` - ${JSON.stringify(errorData)}` : ''
        }`
      );
    }

    // For DELETE requests that return 204 No Content
    if (response.status === 204) {
      console.log('[SUPABASE] DELETE request successful (204 No Content)');
      return {} as T;
    }

    const responseData = await response.json();
    console.log(`[SUPABASE] ${method} request succeeded`);
    return responseData;
  } catch (error) {
    console.error('[SUPABASE] Request error:', error);
    throw error;
  }
}

/**
 * Generic CRUD operations for any table
 */
export const supabase = {
  /**
   * Fetch all records from a table
   */
  from: <T>(table: string) => ({
    /**
     * Get all records from the table
     */
    getAll: async (options?: {
      select?: string;
      order?: { column: string; ascending?: boolean };
      limit?: number;
      offset?: number;
      filters?: Record<string, unknown>;
    }): Promise<T[]> => {
      const params: Record<string, string> = {};

      if (options?.select) {
        params.select = options.select;
      }

      if (options?.order) {
        params.order = `${options.order.column}.${options.order.ascending ? 'asc' : 'desc'}`;
      }

      if (options?.limit) {
        params.limit = options.limit.toString();
      }

      if (options?.offset) {
        params.offset = options.offset.toString();
      }

      // Add filters if provided
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params[key] = `eq.${value}`;
        });
      }

      try {
        return await supabaseRequest<T[]>(table, 'GET', undefined, { params });
      } catch (error) {
        console.error(`Error fetching from ${table}:`, error);
        return [];
      }
    },

    /**
     * Get a single record by ID
     */
    getById: async (id: string | number, options?: { select?: string }): Promise<T | null> => {
      const params: Record<string, string> = {};

      if (options?.select) {
        params.select = options.select;
      }

      try {
        const result = await supabaseRequest<T[]>(`${table}?id=eq.${id}`, 'GET', undefined, {
          params,
          headers: { 'Prefer': 'return=representation' }
        });

        if (result && result.length > 0) {
          return result[0];
        }

        return null;
      } catch (error) {
        console.error(`Error fetching record from ${table} with ID ${id}:`, error);
        return null;
      }
    },

    /**
     * Insert a new record
     */
    insert: async (data: Partial<T>): Promise<T> => {
      try {
        const result = await supabaseRequest<T[]>(table, 'POST', data as Record<string, unknown>, {
          headers: { 'Prefer': 'return=representation' }
        });

        // Supabase returns an array, return the first item
        return Array.isArray(result) ? result[0] : result as T;
      } catch (error) {
        console.error(`Error inserting into ${table}:`, error);
        throw error;
      }
    },

    /**
     * Update a record by ID
     */
    update: async (id: string | number, data: Partial<T>): Promise<T> => {
      // Add updated_at timestamp
      const dataWithTimestamp = {
        ...data,
        updated_at: new Date().toISOString()
      };

      try {
        const result = await supabaseRequest<T[]>(`${table}?id=eq.${id}`, 'PATCH', dataWithTimestamp, {
          headers: { 'Prefer': 'return=representation' }
        });

        return Array.isArray(result) ? result[0] : result as T;
      } catch (error) {
        console.error(`Error updating in ${table}:`, error);
        throw error;
      }
    },

    /**
     * Delete a record by ID
     */
    delete: async (id: string | number): Promise<void> => {
      try {
        await supabaseRequest<void>(`${table}?id=eq.${id}`, 'DELETE');
        console.log(`Successfully deleted record from ${table} with ID ${id}`);
      } catch (error) {
        console.error(`Error deleting from ${table}:`, error);
        throw error;
      }
    },
  }),
};

export default supabase;
