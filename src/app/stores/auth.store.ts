import { create } from 'zustand';

// Definir los roles de usuario
export type UserRole = 'admin' | 'student';

// Definir el tipo de usuario
export interface User {
  id: number;
  username: string;
  name: string;
  role: UserRole;
  email?: string;
  studentId?: number; // Para usuarios tipo estudiante
}

// Usuarios de ejemplo para desarrollo
const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    name: 'Administrador',
    role: 'admin',
    email: 'admin@universidad.edu'
  },
  {
    id: 2,
    username: 'student',
    name: 'Juan Pérez',
    role: 'student',
    email: 'jperez@universidad.edu',
    studentId: 2
  },
  {
    id: 3,
    username: 'maria',
    name: 'María Rodríguez',
    role: 'student',
    email: 'mrodriguez@universidad.edu',
    studentId: 1
  }
];

// Definir la interfaz del store de autenticación
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUser: () => User | null;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: localStorage.getItem('token') !== null,
  isLoading: false,
  error: null,
  
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simular una llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Buscar al usuario por username (simulando autenticación)
      const user = mockUsers.find(u => u.username === username);
      
      // Validación básica - en un entorno real usaríamos una API
      if (user && password === 'password') {
        // Guardar token y datos de usuario
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('user', JSON.stringify(user));
        
        set({ 
          user, 
          isAuthenticated: true,
          isLoading: false 
        });
        
        // Notificar cambio en localStorage
        window.dispatchEvent(new Event('storage-changed'));
        
        return true;
      } else {
        set({ 
          error: 'Usuario o contraseña incorrectos', 
          isLoading: false 
        });
        return false;
      }
    } catch (error) {
      set({ 
        error: 'Error al iniciar sesión. Intente nuevamente.', 
        isLoading: false 
      });
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    set({ 
      user: null, 
      isAuthenticated: false 
    });
    
    // Notificar cambio en localStorage
    window.dispatchEvent(new Event('storage-changed'));
  },
  
  getUser: () => {
    if (!get().user) {
      // Intentar recuperar usuario de localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          set({ user });
          return user;
        } catch (e) {
          console.error('Error al recuperar usuario:', e);
        }
      }
      return null;
    }
    return get().user;
  },
  
  checkAuth: () => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    set({ isAuthenticated });
    return isAuthenticated;
  }
}));