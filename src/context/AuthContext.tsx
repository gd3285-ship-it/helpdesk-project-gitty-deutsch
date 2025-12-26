import { createContext, useReducer, useContext, useEffect, type ReactNode } from 'react';
import { authReducer } from './authReducer';
import { authService } from '../services/auth.service'; // ודאי שהנתיב תואם לתיקייה שלך
import type { AuthState, AuthResponse } from '../types/auth.types'; // ודאי שהנתיב תואם

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'), 
  isAuthenticated: false,
  loading: false,
  error: null
};

// 2. הגדרת הממשק של ה-Context (מה הפונקציות שהוא חושף)
interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

// 3. יצירת ה-Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. ה-Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // --- כאן הלוגיקה שהשלמתי עבורך ---
  const login = async (email: string, pass: string) => {
    try {
      // שלב 1: מתחילים טעינה (הספינר יסתובב)
      dispatch({ type: 'LOGIN_START' });

      // שלב 2: שולחים בקשה לשרת
      const response = await authService.login(email, pass);

      // שלב 3: שומרים את הטוקן ב-LocalStorage
      localStorage.setItem('token', response.token);
      
      // אופציונלי: אפשר לשמור גם את פרטי המשתמש אם רוצים
      // localStorage.setItem('user', JSON.stringify(response.user));

      // שלב 4: מעדכנים את ה-State בהצלחה
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: response // שולחים את כל התשובה (טוקן + יוזר) ל-Reducer
      });

    } catch (error: any) {
      // שלב 5: טיפול בשגיאה
      const errorMessage = error.response?.data?.message || 'שגיאה בהתחברות';
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: errorMessage 
      });
      console.error("Login failed:", errorMessage);
      throw error; // זורקים את השגיאה כדי שהקומפוננטה תוכל להציג אותה אם צריך
    }
  };

  const logout = () => {
    // מחיקת המידע מהדפדפן
    localStorage.removeItem('token');
    // עדכון ה-State
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. ה-Hook לשימוש קל
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};