import type { APIRoute } from 'astro';
import { updateMusicName } from '@/lib/database';
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

    const { musicId, name, username, password } = JSON.parse(body);

    // 验证输入
    if (!musicId || !name || !username || !password) {
      return new Response(JSON.stringify({ error: '音乐ID、新名称和用户信息不能为空' }), {
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

    // 更新音乐名称
    const success = updateMusicName(musicId, name, user.id);

    if (!success) {
      return new Response(JSON.stringify({ error: '音乐不存在或无权限修改' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: '音乐名称更新成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('重命名音乐错误:', error);

    let errorMessage = '重命名音乐失败，请稍后再试';

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