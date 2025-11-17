import type { APIRoute } from 'astro';
import { authenticateUser } from '@/lib/database';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password } = await request.json();

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

    return new Response(JSON.stringify({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('登录错误:', error);

    return new Response(JSON.stringify({ error: '登录失败，请稍后再试' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};