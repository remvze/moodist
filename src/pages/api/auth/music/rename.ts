import type { APIRoute } from 'astro';
import { updateMusicName } from '@/lib/database';
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
  const bodyResult = await parseRequestBody(request, ['musicId', 'name']);
  if (!bodyResult.success) {
    return new Response(JSON.stringify({ error: bodyResult.error!.message }), {
      status: bodyResult.error!.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { user } = authResult;
    const { data } = bodyResult;
    const { musicId, name } = data;

    // 验证输入
    if (!musicId || (typeof musicId !== 'string' && typeof musicId !== 'number')) {
      return new Response(JSON.stringify({
        error: '音乐ID不能为空且必须是有效的标识符'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return new Response(JSON.stringify({
        error: '音乐名称不能为空且必须是有效的字符串'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 验证名称长度
    if (name.trim().length > 100) {
      return new Response(JSON.stringify({
        error: '音乐名称长度不能超过100个字符'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 更新音乐名称
    const success = updateMusicName(musicId.toString(), name.trim(), user!.id);

    if (!success) {
      return new Response(JSON.stringify({
        error: '音乐不存在或无权限修改'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: '音乐名称更新成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return handleApiError(error, '重命名音乐');
  }
};