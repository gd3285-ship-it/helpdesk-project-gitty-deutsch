export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'customer';
}

export interface AuthResponse {
  token: string;
  user: User | null;
}
export interface AuthState{
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// הגדרת טיקט
export interface Ticket {
  id: number;
  subject: string;
  description: string;
  status_name: string;
  priority_name: string;
  created_by: number;
}