import type { APIRoute } from 'astro';
import { authenticateUser } from '@/lib/database';

/**
 * 认证中间件 - 统一处理用户身份验证
 * @param request - Astro请求对象
 * @returns 认证结果对象
 */
export interface AuthResult {
  success: boolean;
  user?: {
    id: number;
    username: string;
  };
  error?: {
    message: string;
    status: number;
  };
  data?: any;
}

/**
 * 验证请求并解析JSON数据
 * @param request - Astro请求对象
 * @param requiredFields - 必需的字段数组
 * @returns 认证结果
 */
export async function authenticateRequest(
  request: Request,
  requiredFields: string[] = ['username', 'password']
): Promise<AuthResult> {
  try {
    // 验证请求体
    const body = await request.text();
    if (!body.trim()) {
      return {
        success: false,
        error: {
          message: '请求体不能为空',
          status: 400
        }
      };
    }

    // 解析JSON
    let data;
    try {
      data = JSON.parse(body);
    } catch (parseError) {
      return {
        success: false,
        error: {
          message: '请求格式错误，请检查JSON格式',
          status: 400
        }
      };
    }

    // 验证必需字段
    const missingFields = requiredFields.filter(field => {
      // 对于密码字段，我们允许空字符串，但不允许undefined/null
      if (field === 'password') {
        return data[field] === undefined || data[field] === null;
      }
      return !data[field];
    });
    if (missingFields.length > 0) {
      return {
        success: false,
        error: {
          message: `缺少必需字段: ${missingFields.join(', ')}`,
          status: 400
        }
      };
    }

    // 验证用户身份
    const user = authenticateUser(data.username, data.password);
    if (!user) {
      return {
        success: false,
        error: {
          message: '用户认证失败，请检查用户名和密码',
          status: 401
        }
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username
      },
      data
    };

  } catch (error) {
    console.error('认证过程出错:', error);
    return {
      success: false,
      error: {
        message: '服务器内部错误',
        status: 500
      }
    };
  }
}

/**
 * 创建标准化的API响应
 * @param success - 是否成功
 * @param data - 响应数据
 * @param message - 响应消息
 * @param status - HTTP状态码
 * @returns Response对象
 */
export function createApiResponse(
  success: boolean,
  data?: any,
  message?: string,
  status: number = 200
): Response {
  const responseBody = {
    success,
    ...(message && { message }),
    ...(data && data)
  };

  return new Response(JSON.stringify(responseBody), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * 创建错误响应
 * @param message - 错误消息
 * @param status - HTTP状态码
 * @returns Response对象
 */
export function createErrorResponse(message: string, status: number = 500): Response {
  return createApiResponse(false, undefined, message, status);
}

/**
 * 处理API错误的统一函数
 * @param error - 错误对象
 * @param operation - 操作描述
 * @returns Response对象
 */
export function handleApiError(error: unknown, operation: string): Response {
  console.error(`${operation}错误:`, error);

  let errorMessage = `${operation}失败，请稍后再试`;
  let status = 500;

  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    errorMessage = '请求格式错误';
    status = 400;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return createErrorResponse(errorMessage, status);
}