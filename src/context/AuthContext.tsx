import { createContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'docente';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  error: null
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simular petición a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock de datos para demo
      let mockUser: User;
      
      if (email.includes('admin')) {
        mockUser = {
          id: '1',
          name: 'Administrador',
          email,
          role: 'admin',
          avatar: 'https://i.pravatar.cc/150?img=60'
        };
      } else {
        mockUser = {
          id: '2',
          name: 'Docente',
          email,
          role: 'docente',
          avatar: 'https://i.pravatar.cc/150?img=32'
        };
      }
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Credenciales inválidas. Intente nuevamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};