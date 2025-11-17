import type { APIRoute } from 'astro';
import { createUser } from '@/lib/database';

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

    if (username.length < 3) {
      return new Response(JSON.stringify({ error: '用户名至少需要3个字符' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ error: '密码至少需要6个字符' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 创建用户
    const user = await createUser({ username, password });

    return new Response(JSON.stringify({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('注册错误:', error);

    if (error instanceof Error && error.message === '用户名已存在') {
      return new Response(JSON.stringify({ error: '用户名已存在' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: '注册失败，请稍后再试' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};