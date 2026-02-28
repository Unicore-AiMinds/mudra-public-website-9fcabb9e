// Local storage service for testing form submissions locally
// Stores contact submissions in browser's localStorage instead of Supabase

import { ContactSubmission } from './api';

const STORAGE_KEY = 'local_contact_submissions';

function getSubmissions(): ContactSubmission[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveSubmissions(submissions: ContactSubmission[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export const localStorageService = {
  insert(submission: Omit<ContactSubmission, 'id' | 'submitted_at' | 'updated_at'>): ContactSubmission {
    const submissions = getSubmissions();
    const now = new Date().toISOString();

    const newSubmission: ContactSubmission = {
      ...submission,
      id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id || 0)) + 1 : 1,
      submitted_at: now,
      updated_at: now,
    };

    submissions.push(newSubmission);
    saveSubmissions(submissions);
    console.log('[LocalStorage] Submission saved:', newSubmission);
    return newSubmission;
  },

  getAll(): ContactSubmission[] {
    const submissions = getSubmissions();
    console.log(`[LocalStorage] Found ${submissions.length} submissions`);
    return submissions;
  },

  getById(id: number): ContactSubmission | undefined {
    return getSubmissions().find(s => s.id === id);
  },

  updateStatus(id: number, status: ContactSubmission['status']): boolean {
    const submissions = getSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    if (index === -1) return false;

    submissions[index].status = status;
    submissions[index].updated_at = new Date().toISOString();
    saveSubmissions(submissions);
    return true;
  },

  delete(id: number): boolean {
    const submissions = getSubmissions();
    const filtered = submissions.filter(s => s.id !== id);
    if (filtered.length === submissions.length) return false;

    saveSubmissions(filtered);
    return true;
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[LocalStorage] All submissions cleared');
  },
};
