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

export interface SavedMusic {
  id: number;
  user_id: number;
  name: string;
  sounds: string; // JSON string of sound IDs
  volume: string; // JSON string of volume settings
  speed: string; // JSON string of speed settings
  rate: string; // JSON string of rate settings
  random_effects: string; // JSON string of random effects settings
  created_at: string;
  updated_at: string;
}

export interface CreateMusicData {
  user_id: number;
  name: string;
  sounds: string[];
  volume: Record<string, number>;
  speed: Record<string, number>;
  rate: Record<string, number>;
  random_effects: Record<string, boolean>;
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

    // 创建音乐保存表
    db.exec(`
      CREATE TABLE IF NOT EXISTS saved_music (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        sounds TEXT NOT NULL,
        volume TEXT NOT NULL,
        speed TEXT NOT NULL,
        rate TEXT NOT NULL,
        random_effects TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
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

// 音乐保存相关函数
export async function createMusic(musicData: CreateMusicData): Promise<SavedMusic> {
  const database = getDatabase();

  const stmt = database.prepare(`
    INSERT INTO saved_music (user_id, name, sounds, volume, speed, rate, random_effects)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    musicData.user_id,
    musicData.name,
    JSON.stringify(musicData.sounds),
    JSON.stringify(musicData.volume),
    JSON.stringify(musicData.speed),
    JSON.stringify(musicData.rate),
    JSON.stringify(musicData.random_effects)
  );

  const music = database.prepare('SELECT * FROM saved_music WHERE id = ?').get(result.lastInsertRowid) as SavedMusic;

  return music;
}

export function getUserMusic(userId: number): SavedMusic[] {
  const database = getDatabase();

  const musicList = database.prepare('SELECT * FROM saved_music WHERE user_id = ? ORDER BY created_at DESC').all(userId) as SavedMusic[];

  return musicList;
}

export function updateMusicName(musicId: number, name: string, userId: number): boolean {
  const database = getDatabase();

  const stmt = database.prepare(`
    UPDATE saved_music
    SET name = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `);

  const result = stmt.run(name, musicId, userId);

  return result.changes > 0;
}

export function deleteMusic(musicId: number, userId: number): boolean {
  const database = getDatabase();

  const stmt = database.prepare('DELETE FROM saved_music WHERE id = ? AND user_id = ?');
  const result = stmt.run(musicId, userId);

  return result.changes > 0;
}