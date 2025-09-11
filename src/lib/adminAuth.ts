import Cookies from 'js-cookie';

export interface AdminUser {
  username: string;
  role: 'admin';
}

// Simple admin credentials (in a real app, this would be in a secure backend)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'mudra2024'
};

const ADMIN_TOKEN_KEY = 'mudra_admin_token';
const SESSION_DURATION_DAYS = 1;

export class AdminAuthService {
  static login(username: string, password: string): boolean {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = this.generateToken();
      Cookies.set(ADMIN_TOKEN_KEY, token, { expires: SESSION_DURATION_DAYS });
      return true;
    }
    return false;
  }

  static logout(): void {
    Cookies.remove(ADMIN_TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = Cookies.get(ADMIN_TOKEN_KEY);
    return !!token && this.isValidToken(token);
  }

  static getCurrentUser(): AdminUser | null {
    if (this.isAuthenticated()) {
      return {
        username: ADMIN_CREDENTIALS.username,
        role: 'admin'
      };
    }
    return null;
  }

  private static generateToken(): string {
    const payload = {
      username: ADMIN_CREDENTIALS.username,
      timestamp: Date.now()
    };
    return btoa(JSON.stringify(payload));
  }

  private static isValidToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token));
      const tokenAge = Date.now() - payload.timestamp;
      const maxAge = SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000; // Convert days to milliseconds
      return tokenAge < maxAge;
    } catch {
      return false;
    }
  }
}