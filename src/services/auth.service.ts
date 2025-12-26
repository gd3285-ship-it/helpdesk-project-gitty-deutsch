import axios from 'axios';
import type { AuthResponse } from '../types/auth.types';

const API_URL = 'http://localhost:4000/api/auth';
export const authService = {
    async login(email: string, password: string): Promise<AuthResponse>{
        const response = await axios.post<AuthResponse>(API_URL + '/login',{email,password},)
        return response.data
    },
    async register() {
     // TODO
  }
};