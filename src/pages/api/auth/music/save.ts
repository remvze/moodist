import type { APIRoute } from 'astro';
import { createMusic } from '@/lib/database';
import { authenticateUser } from '@/lib/database';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();

    if (!body.trim()) {
      return new Response(JSON.stringify({ error: '请求体不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, sounds, volume, speed, rate, random_effects, username, password } = JSON.parse(body);

    // 验证输入
    if (!name || !sounds || !username || !password) {
      return new Response(JSON.stringify({ error: '音乐名称、声音配置和用户信息不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 验证用户身份
    const user = authenticateUser(username, password);
    if (!user) {
      return new Response(JSON.stringify({ error: '用户认证失败' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 创建音乐记录
    const music = await createMusic({
      user_id: user.id,
      name,
      sounds,
      volume: volume || {},
      speed: speed || {},
      rate: rate || {},
      random_effects: random_effects || {},
    });

    return new Response(JSON.stringify({
      success: true,
      music: {
        id: music.id,
        name: music.name,
        created_at: music.created_at
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('保存音乐错误:', error);

    let errorMessage = '保存音乐失败，请稍后再试';

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