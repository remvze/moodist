import crypto from 'crypto';

// JWT配置 (与src/lib/jwt.ts保持一致)
const JWT_SECRET = 'your-secret-key-change-in-production';
const JWT_ALGORITHM = 'HS256';
const JWT_EXPIRES_IN = 7 * 24 * 60 * 60; // 7天

function base64UrlEncode(data) {
  return Buffer.from(data)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function createJWT(payload) {
  const header = { alg: JWT_ALGORITHM, typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const jwtPayload = { ...payload, iat: now, exp: now + JWT_EXPIRES_IN };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(jwtPayload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(signatureInput)
    .digest('base64url');

  return `${signatureInput}.${signature}`;
}

// 创建测试用的JWT token (用户ID: 1, username: test123)
const testToken = createJWT({
  userId: 1,
  username: 'test123'
});

console.log('测试JWT Token:', testToken);

// 测试API调用
async function testMusicAPI() {
  try {
    const response = await fetch('http://localhost:4323/api/auth/music/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${testToken}`
      },
      body: JSON.stringify({})
    });

    console.log('API响应状态:', response.status);
    console.log('API响应头:', Object.fromEntries(response.headers.entries()));

    const text = await response.text();
    console.log('API响应内容:', text);

    try {
      const data = JSON.parse(text);
      console.log('解析后的数据:', data);
    } catch (e) {
      console.log('响应不是有效的JSON');
    }

  } catch (error) {
    console.error('API调用失败:', error);
  }
}

testMusicAPI();