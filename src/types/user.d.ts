export interface TypesUser {
    routines: Record<string, unknown>;
    _id: string;
    email: string;
    apiKey: string;
    status: 'active' | 'inactive';
    role: 'admin' | 'user' | 'trainer';
    image?: string;
    payments: unknown[];
    name: string;
    googleId: string;
    createdAt: string;
    updatedAt: string;
    token?: string;
    __v: number;
}


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}
