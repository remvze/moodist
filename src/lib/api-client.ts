import { useAuthStore } from '@/stores/auth';

/**
 * API客户端辅助函数，自动添加JWT Authorization头
 */
export class ApiClient {
  /**
   * 发起API请求
   * @param url - API URL
   * @param options - fetch options
   * @returns Promise<Response>
   */
  static async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    // 获取token - 尝试多种方式获取Zustand store
    let token = null;

    try {
      // 方法1: 通过useAuthStore.getState()获取
      token = useAuthStore.getState().getToken();
      console.log('🔐 方法1获取token结果:', token ? '成功' : '失败');
    } catch (e) {
      console.warn('无法通过useAuthStore.getState()获取token:', e);
    }

    // 如果方法1失败，尝试方法2: 从localStorage直接获取
    if (!token) {
      try {
        const authStorage = localStorage.getItem('auth-storage');
        console.log('🔐 localStorage auth-storage:', authStorage ? '存在' : '不存在');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          token = parsed.state?.token;
          console.log('🔐 方法2获取token结果:', token ? '成功' : '失败');
        }
      } catch (e) {
        console.warn('无法从localStorage获取token:', e);
      }
    }

    // 创建新的headers对象
    const headers = new Headers(options.headers || {});

    // 添加Content-Type（如果没有的话）
    if (!headers.has('Content-Type') && (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH')) {
      headers.set('Content-Type', 'application/json');
    }

    // 添加Authorization头（如果有token）
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      console.log('🔑 已添加Authorization头，URL:', url);
    } else {
      console.warn('⚠️ 没有找到token，请求URL:', url);
    }

    // 发起请求
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log('📡 API响应:', url, response.status);
    return response;
  }

  /**
   * 发起POST请求
   * @param url - API URL
   * @param data - 请求数据
   * @returns Promise<Response>
   */
  static async post(url: string, data?: any): Promise<Response> {
    return this.fetch(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * 发起GET请求
   * @param url - API URL
   * @returns Promise<Response>
   */
  static async get(url: string): Promise<Response> {
    return this.fetch(url, {
      method: 'GET',
    });
  }

  /**
   * 发起PUT请求
   * @param url - API URL
   * @param data - 请求数据
   * @returns Promise<Response>
   */
  static async put(url: string, data?: any): Promise<Response> {
    return this.fetch(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * 发起DELETE请求
   * @param url - API URL
   * @returns Promise<Response>
   */
  static async delete(url: string): Promise<Response> {
    return this.fetch(url, {
      method: 'DELETE',
    });
  }
}

/**
 * 简化的API调用函数
 * @param url - API URL
 * @param data - 请求数据
 * @param method - HTTP方法
 * @returns Promise<any>
 */
export async function apiCall(url: string, data?: any, method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'POST'): Promise<any> {
  const response = await ApiClient.fetch(url, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'API 调用失败');
  }

  return result;
}