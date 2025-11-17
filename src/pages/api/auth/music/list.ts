import type { APIRoute } from 'astro';
import { getUserMusic } from '@/lib/database';
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

    const { username, password } = JSON.parse(body);

    // 验证输入
    if (!username || !password) {
      return new Response(JSON.stringify({ error: '用户名和密码不能为空' }), {
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

    // 获取用户音乐列表
    const musicList = getUserMusic(user.id);

    // 解析JSON字段
    const formattedMusicList = musicList.map(music => ({
      id: music.id,
      name: music.name,
      sounds: JSON.parse(music.sounds),
      volume: JSON.parse(music.volume),
      speed: JSON.parse(music.speed),
      rate: JSON.parse(music.rate),
      random_effects: JSON.parse(music.random_effects),
      created_at: music.created_at,
      updated_at: music.updated_at
    }));

    return new Response(JSON.stringify({
      success: true,
      musicList: formattedMusicList
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('获取音乐列表错误:', error);

    let errorMessage = '获取音乐列表失败，请稍后再试';

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