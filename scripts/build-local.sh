#!/bin/bash

# Moodist Docker 本地构建脚本
# 用于本地测试和开发

set -e

# 配置变量
IMAGE_NAME="moodist-local"
VERSION=${1:-dev}
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

echo "🐳 开始本地构建 Moodist Docker 镜像..."
echo "📦 镜像名称: ${IMAGE_NAME}"
echo "🏷️  版本标签: ${VERSION}"
echo "📅 构建时间: ${BUILD_DATE}"
echo "🔗 Git提交: ${VCS_REF}"

# 检查Docker是否安装并运行
if ! docker info &> /dev/null; then
    echo "❌ Docker未运行，请启动Docker服务"
    exit 1
fi

# 构建参数
BUILD_ARGS="--build-arg BUILD_DATE=${BUILD_DATE}"
BUILD_ARGS="${BUILD_ARGS} --build-arg VERSION=${VERSION}"
BUILD_ARGS="${BUILD_ARGS} --build-arg VCS_REF=${VCS_REF}"
BUILD_ARGS="${BUILD_ARGS} --build-arg NODE_ENV=production"

echo "🏗️  开始本地构建..."

# 构建本地镜像
docker build \
    ${BUILD_ARGS} \
    --tag "${IMAGE_NAME}:${VERSION}" \
    --file ./Dockerfile.optimized \
    .

echo "✅ 本地构建完成！"

# 运行容器进行测试
echo "🧪 启动测试容器..."

# 停止并删除现有容器（如果存在）
docker stop moodist-test 2>/dev/null || true
docker rm moodist-test 2>/dev/null || true

# 启动新容器
docker run -d \
    --name moodist-test \
    -p 8081:8080 \
    --restart unless-stopped \
    "${IMAGE_NAME}:${VERSION}"

echo "🚀 测试容器已启动！"
echo ""
echo "📋 访问信息:"
echo "   🌐 本地访问: http://localhost:8081"
echo "   🐳 容器名称: moodist-test"
echo "   🏷️  镜像标签: ${IMAGE_NAME}:${VERSION}"
echo ""
echo "🔧 常用命令:"
echo "   查看日志: docker logs moodist-test"
echo "   停止容器: docker stop moodist-test"
echo "   删除容器: docker rm moodist-test"
echo "   进入容器: docker exec -it moodist-test /bin/sh"
echo ""
echo "⏳ 等待容器启动..."
sleep 5

# 健康检查
echo "🔍 执行健康检查..."
if curl -f http://localhost:8081/ &> /dev/null; then
    echo "✅ 健康检查通过！应用正常运行"
else
    echo "⚠️  健康检查失败，请查看容器日志"
    echo "   docker logs moodist-test"
fi

echo ""
echo "🎉 本地构建和测试完成！"