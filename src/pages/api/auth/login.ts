import type { APIRoute } from 'astro';
import { authenticateUser } from '@/lib/database';
import { createJWT } from '@/lib/jwt';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();

    if (!body.trim()) {
      return new Response(JSON.stringify({ error: '请求体不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { username, password } = JSON.parse(body);

    // 验证输入
    if (!username || !password) {
      return new Response(JSON.stringify({ error: '用户名和密码不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 验证用户
    const user = authenticateUser(username, password);

    if (!user) {
      return new Response(JSON.stringify({ error: '用户名或密码错误' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 创建JWT token
    const token = createJWT({
      userId: user.id,
      username: user.username
    });

    return new Response(JSON.stringify({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at
      },
      token,
      expiresIn: 7 * 24 * 60 * 60 // 7天，单位：秒
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('登录错误:', error);

    let errorMessage = '登录失败，请稍后再试';

    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      errorMessage = '请求格式错误';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};