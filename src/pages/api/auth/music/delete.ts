import type { APIRoute } from 'astro';
import { deleteMusic } from '@/lib/database';
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
  const bodyResult = await parseRequestBody(request, ['musicId']);
  if (!bodyResult.success) {
    return new Response(JSON.stringify({ error: bodyResult.error!.message }), {
      status: bodyResult.error!.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { user } = authResult;
    const { data } = bodyResult;
    const { musicId } = data;

    // 验证音乐ID
    if (!musicId || (typeof musicId !== 'string' && typeof musicId !== 'number')) {
      return new Response(JSON.stringify({
        error: '音乐ID不能为空且必须是有效的标识符'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 删除音乐记录
    const success = deleteMusic(musicId.toString(), user!.id);

    if (!success) {
      return new Response(JSON.stringify({
        error: '音乐不存在或无权限删除'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: '音乐删除成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return handleApiError(error, '删除音乐');
  }
};