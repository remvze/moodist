#!/bin/bash

# Moodist Docker 构建和推送脚本
# 支持多平台构建并推送到 Docker Hub

set -e

# 配置变量
IMAGE_NAME="walllee/moodist"
VERSION=${1:-latest}
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
VCS_REF=$(git rev-parse --short HEAD)

echo "🐳 开始构建 Moodist Docker 镜像..."
echo "📦 镜像名称: ${IMAGE_NAME}"
echo "🏷️  版本标签: ${VERSION}"
echo "📅 构建时间: ${BUILD_DATE}"
echo "🔗 Git提交: ${VCS_REF}"

# 检查Docker是否安装并运行
if ! docker info &> /dev/null; then
    echo "❌ Docker未运行，请启动Docker服务"
    exit 1
fi

# 检查是否登录Docker Hub
if ! docker info | grep -q "Username"; then
    echo "⚠️  未检测到Docker登录，请先运行: docker login"
    echo "💡 如果您有Docker Hub账号，请使用以下命令登录："
    echo "   docker login"
    echo "   # 输入您的用户名和密码或访问令牌"
    read -p "是否继续构建？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 构建已取消"
        exit 1
    fi
fi

# 创建buildx构建器（如果不存在）
if ! docker buildx ls | grep -q "moodist-builder"; then
    echo "🔨 创建Docker Buildx构建器..."
    docker buildx create --name moodist-builder --use
    docker buildx inspect --bootstrap
fi

# 构建参数
BUILD_ARGS="--build-arg BUILD_DATE=${BUILD_DATE}"
BUILD_ARGS="${BUILD_ARGS} --build-arg VERSION=${VERSION}"
BUILD_ARGS="${BUILD_ARGS} --build-arg VCS_REF=${VCS_REF}"
BUILD_ARGS="${BUILD_ARGS} --build-arg NODE_ENV=production"

echo "🏗️  开始构建多平台镜像..."

# 构建并推送多平台镜像
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --tag "${IMAGE_NAME}:${VERSION}" \
    --tag "${IMAGE_NAME}:latest" \
    ${BUILD_ARGS} \
    --file ./Dockerfile.optimized \
    --push \
    .

echo "✅ 构建完成！"

# 如果指定了特定版本，同时创建version-specific标签
if [ "$VERSION" != "latest" ]; then
    echo "🏷️  添加版本标签: ${VERSION}"
    docker buildx build \
        --platform linux/amd64,linux/arm64 \
        --tag "${IMAGE_NAME}:${VERSION}" \
        ${BUILD_ARGS} \
        --file ./Dockerfile.optimized \
        --push \
        .
fi

echo ""
echo "🎉 镜像构建和推送完成！"
echo "📋 镜像信息:"
echo "   🔗 Docker Hub: https://hub.docker.com/r/${IMAGE_NAME}"
echo "   🏷️  标签: ${VERSION}, latest"
echo "   🏗️  平台: linux/amd64, linux/arm64"
echo ""
echo "🚀 使用方法:"
echo "   docker run -d -p 8080:8080 ${IMAGE_NAME}:${VERSION}"
echo ""
echo "📝 查看镜像信息:"
echo "   docker pull ${IMAGE_NAME}:${VERSION}"
echo "   docker inspect ${IMAGE_NAME}:${VERSION}"