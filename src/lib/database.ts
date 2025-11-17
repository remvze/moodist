import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

let db: Database.Database | null = null;

export interface User {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

export interface CreateUserData {
  username: string;
  password: string;
}

export function getDatabase(): Database.Database {
  if (!db) {
    // 创建数据库文件路径
    const dbPath = path.join(process.cwd(), 'data', 'users.db');

    // 确保目录存在
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    db = new Database(dbPath);

    // 创建用户表
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  return db;
}

export async function createUser(userData: CreateUserData): Promise<User> {
  const database = getDatabase();

  // 检查用户名是否已存在
  const existingUser = database.prepare('SELECT id FROM users WHERE username = ?').get(userData.username);
  if (existingUser) {
    throw new Error('用户名已存在');
  }

  // 加密密码
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // 创建用户
  const stmt = database.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  const result = stmt.run(userData.username, hashedPassword);

  // 返回创建的用户
  const user = database.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(result.lastInsertRowid) as User;

  return user;
}

export function authenticateUser(username: string, password: string): User | null {
  const database = getDatabase();

  // 查找用户
  const user = database.prepare('SELECT id, username, password, created_at FROM users WHERE username = ?').get(username) as User & { password: string } | null;

  if (!user) {
    return null;
  }

  // 验证密码
  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  // 返回用户信息（不包含密码）
  return {
    id: user.id,
    username: user.username,
    created_at: user.created_at
  };
}

export function getUserById(id: number): User | null {
  const database = getDatabase();

  const user = database.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(id) as User | null;

  return user;
}

export function getUserByUsername(username: string): User | null {
  const database = getDatabase();

  const user = database.prepare('SELECT id, username, created_at FROM users WHERE username = ?').get(username) as User | null;

  return user;
}