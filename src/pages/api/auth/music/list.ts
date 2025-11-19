import type { APIRoute } from 'astro';
import { getUserMusic } from '@/lib/database';
import { authenticateJWTRequest, handleApiError } from '@/lib/jwt-auth-middleware';

export const POST: APIRoute = async ({ request }) => {
  // 使用JWT认证中间件
  const authResult = await authenticateJWTRequest(request);
  if (!authResult.success) {
    return new Response(JSON.stringify({ error: authResult.error!.message }), {
      status: authResult.error!.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { user } = authResult;

    // 获取用户音乐列表
    const musicList = getUserMusic(user!.id);

    // 解析JSON字段并格式化数据
    const formattedMusicList = musicList.map(music => {
      try {
        return {
          id: music.id,
          name: music.name,
          sounds: JSON.parse(music.sounds),
          volume: JSON.parse(music.volume),
          speed: JSON.parse(music.speed),
          rate: JSON.parse(music.rate),
          random_effects: JSON.parse(music.random_effects),
          created_at: music.created_at,
          updated_at: music.updated_at
        };
      } catch (parseError) {
        console.error(`解析音乐数据失败 (ID: ${music.id}):`, parseError);
        // 返回安全的默认值
        return {
          id: music.id,
          name: music.name,
          sounds: [],
          volume: {},
          speed: {},
          rate: {},
          random_effects: {},
          created_at: music.created_at,
          updated_at: music.updated_at
        };
      }
    });

    return new Response(JSON.stringify({
      success: true,
      musicList: formattedMusicList
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return handleApiError(error, '获取音乐列表');
  }
};