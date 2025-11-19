import type { APIRoute } from 'astro';
import { createMusic } from '@/lib/database';
import { authenticateJWTRequest, parseRequestBody, handleApiError } from '@/lib/jwt-auth-middleware';

export const POST: APIRoute = async ({ request }) => {
  // 首先进行JWT认证
  const authResult = await authenticateJWTRequest(request);
  if (!authResult.success) {
    return new Response(JSON.stringify({ error: authResult.error!.message }), {
      status: authResult.error!.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 解析请求体
  const bodyResult = await parseRequestBody(request, ['name', 'sounds']);
  if (!bodyResult.success) {
    return new Response(JSON.stringify({ error: bodyResult.error!.message }), {
      status: bodyResult.error!.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { user } = authResult;
    const { data } = bodyResult;
    const { name, sounds, volume, speed, rate, random_effects } = data;

    console.log('🎵 保存音乐请求:', { userId: user?.id, name, soundsCount: sounds?.length });

    // 验证输入
    if (!name || !sounds || !Array.isArray(sounds)) {
      return new Response(JSON.stringify({
        error: '音乐名称和声音配置不能为空，声音必须是数组'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 创建音乐记录
    const music = await createMusic({
      user_id: user!.id,
      name,
      sounds,
      volume: volume || {},
      speed: speed || {},
      rate: rate || {},
      random_effects: random_effects || {},
    });

    console.log('✅ 音乐保存成功:', { id: music.id, name: music.name });

    return new Response(JSON.stringify({
      success: true,
      message: '音乐保存成功',
      music: {
        id: music.id,
        name: music.name,
        created_at: music.created_at
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ 保存音乐API错误:', error);

    // 处理特定的数据库错误
    if (error instanceof Error && error.message.includes('readonly')) {
      return new Response(JSON.stringify({
        error: '数据库权限错误，请检查文件权限'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return handleApiError(error, '保存音乐');
  }
};