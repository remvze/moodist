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
  sessionPassword: string | null; // 仅当前会话使用的密码，不持久化
}

interface AuthStore extends AuthState {
  // Actions
  login: (userData: { username: string; password: string }) => Promise<void>;
  register: (userData: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
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
      sessionPassword: null,

      // Actions
      login: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          const result = await apiCall('/api/auth/login', userData);
          const user = result.user;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            sessionPassword: userData.password, // 保存密码用于当前会话的API调用
          });

          console.log('✅ 用户登录成功:', user.username);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '登录失败';
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
            sessionPassword: null,
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

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            sessionPassword: userData.password, // 保存密码用于当前会话的API调用
          });

          console.log('✅ 用户注册成功:', user.username);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '注册失败';
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
            sessionPassword: null,
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
          sessionPassword: null, // 清除会话密码
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
        const { user, isAuthenticated } = get();

        // 如果已经有用户信息且已认证，则直接返回
        if (user && isAuthenticated) {
          return;
        }

        // 这里可以添加token验证或会话验证逻辑
        // 目前简单检查本地存储的用户信息
        set({ isLoading: true });

        try {
          // 如果有用户信息但未认证，可以尝试验证
          if (user && !isAuthenticated) {
            set({
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('❌ 认证检查失败:', error);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: '认证检查失败',
          });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // 不包含 sessionPassword，仅存储在内存中
      }),
    }
  )
);