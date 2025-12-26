import type{ AuthState, AuthResponse } from '../types/auth.types';
export type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthResponse } 
  | { type: 'LOGIN_FAILURE'; payload: string }       
  | { type: 'LOGOUT' };
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
        return{
            ...state,
            loading:true,
            error: null
            
        };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,   
        token: action.payload.token,
        error: null
      }; 
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload  
      }; 
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    default:
      return state;

  }
};