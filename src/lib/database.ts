import Database from 'better-sqlite3';
import { join } from 'path';

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

export interface ContactSubmissionFilters {
  clinic?: 'dental_metrix' | 'meditouch';
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class DatabaseService {
  private db: Database.Database;

  constructor() {
    // Create database in project root
    const dbPath = join(process.cwd(), 'mudra_clinic.db');
    this.db = new Database(dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase() {
    // Create contact_submissions table
    const createSubmissionsTable = `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        service_inquiry TEXT NOT NULL,
        message TEXT NOT NULL,
        clinic TEXT NOT NULL CHECK(clinic IN ('dental_metrix', 'meditouch')),
        status TEXT DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'follow-up', 'scheduled', 'closed')),
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.exec(createSubmissionsTable);

    // Create indexes for better performance
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_clinic ON contact_submissions(clinic);
      CREATE INDEX IF NOT EXISTS idx_status ON contact_submissions(status);
      CREATE INDEX IF NOT EXISTS idx_submitted_at ON contact_submissions(submitted_at);
      CREATE INDEX IF NOT EXISTS idx_email ON contact_submissions(email);
    `;

    this.db.exec(createIndexes);
  }

  // Insert new contact submission
  insertSubmission(submission: Omit<ContactSubmission, 'id' | 'submitted_at' | 'updated_at'>): ContactSubmission {
    const stmt = this.db.prepare(`
      INSERT INTO contact_submissions (name, email, phone, service_inquiry, message, clinic, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      submission.name,
      submission.email,
      submission.phone,
      submission.service_inquiry,
      submission.message,
      submission.clinic,
      submission.status || 'new'
    );

    return this.getSubmissionById(result.lastInsertRowid as number)!;
  }

  // Get submission by ID
  getSubmissionById(id: number): ContactSubmission | null {
    const stmt = this.db.prepare('SELECT * FROM contact_submissions WHERE id = ?');
    return stmt.get(id) as ContactSubmission | null;
  }

  // Get all submissions with filtering and pagination
  getSubmissions(filters: ContactSubmissionFilters = {}): {
    data: ContactSubmission[];
    total: number;
    page: number;
    totalPages: number;
  } {
    const {
      clinic,
      status,
      search,
      page = 1,
      limit = 10,
      sortBy = 'submitted_at',
      sortOrder = 'desc'
    } = filters;

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];

    if (clinic) {
      whereClause += ' AND clinic = ?';
      params.push(clinic);
    }

    if (status && status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR service_inquiry LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Count total records
    const countStmt = this.db.prepare(`SELECT COUNT(*) as count FROM contact_submissions ${whereClause}`);
    const totalCount = (countStmt.get(params) as any).count;

    // Get paginated data
    const offset = (page - 1) * limit;
    const orderClause = `ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    const dataStmt = this.db.prepare(`
      SELECT * FROM contact_submissions
      ${whereClause}
      ${orderClause}
      LIMIT ? OFFSET ?
    `);

    const data = dataStmt.all([...params, limit, offset]) as ContactSubmission[];

    return {
      data,
      total: totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit)
    };
  }

  // Update submission status
  updateSubmissionStatus(id: number, status: ContactSubmission['status']): boolean {
    const stmt = this.db.prepare(`
      UPDATE contact_submissions
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    const result = stmt.run(status, id);
    return result.changes > 0;
  }

  // Get analytics data
  getAnalytics(): {
    total: number;
    dental: number;
    aesthetic: number;
    byStatus: Record<string, number>;
  } {
    const totalStmt = this.db.prepare('SELECT COUNT(*) as count FROM contact_submissions');
    const total = (totalStmt.get() as any).count;

    const dentalStmt = this.db.prepare('SELECT COUNT(*) as count FROM contact_submissions WHERE clinic = ?');
    const dental = (dentalStmt.get('dental_metrix') as any).count;

    const aestheticStmt = this.db.prepare('SELECT COUNT(*) as count FROM contact_submissions WHERE clinic = ?');
    const aesthetic = (aestheticStmt.get('meditouch') as any).count;

    const statusStmt = this.db.prepare('SELECT status, COUNT(*) as count FROM contact_submissions GROUP BY status');
    const statusResults = statusStmt.all() as Array<{ status: string; count: number }>;

    const byStatus: Record<string, number> = {
      new: 0,
      contacted: 0,
      'follow-up': 0,
      scheduled: 0,
      closed: 0
    };

    statusResults.forEach(row => {
      byStatus[row.status] = row.count;
    });

    return {
      total,
      dental,
      aesthetic,
      byStatus
    };
  }

  // Delete submission (optional, for admin management)
  deleteSubmission(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM contact_submissions WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Close database connection
  close() {
    this.db.close();
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();