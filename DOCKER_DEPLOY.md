# Moodist Docker 部署指南

## 🐳 Docker 镜像构建和部署

### 📋 镜像信息

- **镜像名称**: `walllee/moodist`
- **Docker Hub**: https://hub.docker.com/r/walllee/moodist
- **支持平台**: `linux/amd64`, `linux/arm64`
- **基础镜像**: `nginx:alpine`
- **镜像大小**: ~30MB

### 🚀 快速开始

#### 1. 直接拉取并运行
```bash
# 拉取镜像
docker pull walllee/moodist:latest

# 运行容器
docker run -d \
  --name moodist \
  -p 8080:8080 \
  --restart unless-stopped \
  walllee/moodist:latest
```

#### 2. 使用 Docker Compose
```bash
# 简单版本
docker-compose up -d

# 或使用优化版本
docker-compose -f docker-compose.optimized.yml up -d

# 查看日志
docker-compose logs -f
# 或
docker-compose -f docker-compose.optimized.yml logs -f

# 停止服务
docker-compose down
```

### 🔨 自定义构建

#### 1. 简化本地构建（推荐）
```bash
# 克隆仓库
git clone https://github.com/wheesys/moodist.git
cd moodist

# 简化构建（推荐，兼容性最好）
npm run docker:push

# 或带版本号构建
./scripts/build-docker-simple.sh 2.1.0

# 构建并推送到 Docker Hub
npm run docker:push-and-upload
```

**特点：**
- ✅ 完全兼容，不依赖 Docker Buildx
- ✅ 先本地构建再打包，避免容器内依赖问题
- ✅ 构建速度快，使用缓存优化
- ✅ 支持版本标签和自动 latest 标签

#### 2. 多平台构建
```bash
# 克隆仓库
git clone https://github.com/wheesys/moodist.git
cd moodist

# 本地构建和测试
./scripts/build-local.sh

# 查看构建结果
docker images | grep moodist
```

#### 3. 推送到 Docker Hub
```bash
# 登录 Docker Hub
docker login

# 使用简化脚本推送
npm run docker:push-and-upload

# 或手动推送指定版本
docker push walllee/moodist:2.1.0
docker push walllee/moodist:latest
```

### 📦 部署配置

#### 生产环境配置
```yaml
version: '3.8'
services:
  moodist:
    image: wheeysys/moodist:latest
    container_name: moodist-prod
    restart: always
    ports:
      - "80:8080"
    environment:
      - NODE_ENV=production
      - TZ=Asia/Shanghai
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

#### 开发环境配置
```bash
# 使用开发配置
docker-compose -f docker-compose.dev.yml up -d

# 或者使用开发工具
docker-compose -f docker-compose.dev.yml --profile tools up -d
```

### 🔧 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `NODE_ENV` | `production` | 运行环境 |
| `TZ` | `Asia/Shanghai` | 时区设置 |

### 📊 性能优化

#### 镜像特性
- ✅ **多阶段构建**: 优化镜像大小
- ✅ **多平台支持**: AMD64 + ARM64
- ✅ **非root用户**: 提高安全性
- ✅ **健康检查**: 自动监控应用状态
- ✅ **静态优化**: Nginx + Gzip 压缩

#### 资源使用
- **内存占用**: ~32MB (运行时)
- **CPU占用**: < 0.1 (空闲时)
- **启动时间**: ~2秒
- **镜像大小**: ~30MB

### 🔍 监控和日志

#### 查看容器状态
```bash
# 查看容器状态
docker ps | grep moodist

# 查看健康检查状态
docker inspect moodist | grep Health -A 10

# 查看资源使用
docker stats moodist
```

#### 日志管理
```bash
# 查看实时日志
docker logs -f moodist

# 查看最近日志
docker logs --tail 100 moodist

# 日志轮转（在 docker-compose 中配置）
logging:
  options:
    max-size: "10m"
    max-file: "3"
```

### 🛠️ 故障排除

#### 常见问题

1. **容器无法启动**
   ```bash
   # 检查端口占用
   netstat -tlnp | grep 8080

   # 查看容器日志
   docker logs moodist
   ```

2. **健康检查失败**
   ```bash
   # 手动检查应用是否响应
   curl -f http://localhost:8080/

   # 查看健康检查状态
   docker inspect moodist | grep Health
   ```

3. **构建失败**
   ```bash
   # 清理Docker缓存
   docker system prune -a

   # 重新构建
   docker build --no-cache -f Dockerfile.optimized -t moodist:test .
   ```

### 🔄 更新部署

#### 滚动更新
```bash
# 拉取新版本
docker pull wheeysys/moodist:latest

# 停止旧容器
docker stop moodist

# 启动新容器
docker run -d \
  --name moodist \
  -p 8080:8080 \
  --restart unless-stopped \
  wheeysys/moodist:latest

# 删除旧容器
docker rm $(docker ps -aq --filter "status=exited")
```

#### 使用 Docker Compose 更新
```bash
# 拉取新镜像
docker-compose -f docker-compose.optimized.yml pull

# 重启服务
docker-compose -f docker-compose.optimized.yml up -d

# 清理旧镜像
docker image prune -f
```

### 🔐 安全配置

#### 生产环境安全建议
```yaml
services:
  moodist:
    image: wheeysys/moodist:latest
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /var/cache/nginx
      - /var/run
    user: "nginx"
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
```

### 📈 扩展部署

#### 使用反向代理
```nginx
server {
    listen 80;
    server_name moodist.example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 负载均衡配置
```yaml
version: '3.8'
services:
  moodist:
    image: wheeysys/moodist:latest
    deploy:
      replicas: 3
    # ... 其他配置
```

### 📞 支持

- **GitHub**: https://github.com/wheesys/moodist
- **Docker Hub**: https://hub.docker.com/r/walllee/moodist
- **问题反馈**: 请在 GitHub Issues 中提交

---

*最后更新: 2024-11-16*