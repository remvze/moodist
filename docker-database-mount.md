# Docker 数据库挂载说明

## 概述

本项目已配置 SQLite 数据库文件挂载，确保数据在容器重启后不会丢失。

## 数据库文件位置

SQLite 数据库文件位于项目的 `./data` 目录中：
- `./data/users.db` - 主数据库文件
- `./data/users.db-wal` - Write-Ahead Log 文件
- `./data/users.db-shm` - 共享内存文件

## Docker Compose 配置

### 1. 基础配置 (`docker-compose.yml`)

```yaml
services:
  moodist:
    volumes:
      # 挂载 SQLite 数据库文件和 WAL 文件
      - ./data:/app/data:rw
    environment:
      - NODE_ENV=production
```

### 2. 优化配置 (`docker-compose.optimized.yml`)

```yaml
services:
  moodist:
    volumes:
      # 挂载 SQLite 数据库文件目录（需要读写权限）
      - ./data:/app/data:rw
      # 挂载临时目录用于 SQLite WAL 文件
      - moodist-temp:/tmp:rw

volumes:
  moodist-temp:
    driver: local
```

### 3. 开发配置 (`docker-compose.dev.yml`)

```yaml
services:
  moodist-dev:
    volumes:
      # 挂载 SQLite 数据库文件目录
      - ./data:/app/data:rw
```

## 使用方法

### 启动服务

```bash
# 生产环境
docker-compose up -d

# 优化环境
docker-compose -f docker-compose.optimized.yml up -d

# 开发环境
docker-compose -f docker-compose.dev.yml up -d
```

### 数据持久化

- 数据库文件会自动创建在 `./data` 目录中
- 容器重启或重新创建后数据不会丢失
- 支持数据库备份和迁移

### 备份数据库

```bash
# 备份数据库
cp ./data/users.db ./data/users.db.backup.$(date +%Y%m%d_%H%M%S)

# 查看数据库文件
ls -la ./data/
```

## 注意事项

1. **权限问题**: 确保 `./data` 目录有正确的读写权限
2. **WAL 模式**: SQLite 使用 WAL (Write-Ahead Logging) 模式，会产生额外的 WAL 和 SHM 文件
3. **并发访问**: Docker 挂载确保文件系统的一致性
4. **备份策略**: 建议定期备份数据库文件

## 故障排除

### 数据库锁定问题
如果遇到数据库锁定错误：
1. 停止容器：`docker-compose down`
2. 删除 WAL 文件：`rm ./data/users.db-wal ./data/users.db-shm`
3. 重新启动容器：`docker-compose up -d`

### 权限问题
如果遇到权限错误：
```bash
# 设置正确的目录权限
sudo chown -R 1000:1000 ./data
chmod 755 ./data
```

## 开发环境注意事项

开发环境中，数据库文件会被实时同步到本地文件系统，便于：
- 调试和测试
- 数据分析
- 快速重置测试数据