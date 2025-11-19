import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  username: string;
  created_at: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null; // JWT token
}

interface AuthStore extends AuthState {
  // Actions
  login: (userData: { username: string; password: string }) => Promise<void>;
  register: (userData: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
  getToken: () => string | null;
  setToken: (token: string) => void;
}

/**
 * API 调用辅助函数
 */
const apiCall = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'API 调用失败');
  }

  return result;
};

/**
 * 用户认证状态管理 Store
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null,

      // Actions
      login: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          const result = await apiCall('/api/auth/login', userData);
          const user = result.user;
          const token = result.token;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            token,
          });

          console.log('✅ 用户登录成功:', user.username);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '登录失败';
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
            token: null,
          });
          console.error('❌ 登录失败:', error);
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          const result = await apiCall('/api/auth/register', userData);
          const user = result.user;
          const token = result.token;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            token,
          });

          console.log('✅ 用户注册成功:', user.username);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '注册失败';
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
            token: null,
          });
          console.error('❌ 注册失败:', error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          token: null,
        });
        console.log('✅ 用户已登出');
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      checkAuth: async () => {
        const { user, isAuthenticated, token } = get();

        // 如果已经有用户信息且已认证，则直接返回
        if (user && isAuthenticated && token) {
          return;
        }

        // zustand persist会自动从localStorage恢复token
        // 如果有token但没有用户信息，说明token可能无效
        if (token && !user) {
          console.warn('发现token但缺少用户信息，可能需要重新登录');
          set({
            token: null,
            isAuthenticated: false
          });
        }

        set({ isLoading: false });
      },

      getToken: () => {
        const { token } = get();
        return token;
      },

      setToken: (newToken: string) => {
        set({ token: newToken });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token, // 现在也保存token
      }),
    }
  )
);