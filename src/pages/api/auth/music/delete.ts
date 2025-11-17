import type { APIRoute } from 'astro';
import { deleteMusic } from '@/lib/database';
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

    const { musicId, username, password } = JSON.parse(body);

    // 验证输入
    if (!musicId || !username || !password) {
      return new Response(JSON.stringify({ error: '音乐ID和用户信息不能为空' }), {
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

    // 删除音乐记录
    const success = deleteMusic(musicId, user.id);

    if (!success) {
      return new Response(JSON.stringify({ error: '音乐不存在或无权限删除' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: '音乐删除成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('删除音乐错误:', error);

    let errorMessage = '删除音乐失败，请稍后再试';

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