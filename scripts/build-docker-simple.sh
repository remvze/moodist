#!/bin/bash

# Moodist Docker 简化构建脚本
# 先本地构建，再打包成Docker镜像

set -e

# 配置变量
IMAGE_NAME="walllee/moodist"
VERSION=${1:-latest}
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

echo "🐳 开始构建 Moodist Docker 镜像（简化版）..."
echo "📦 镜像名称: ${IMAGE_NAME}"
echo "🏷️  版本标签: ${VERSION}"
echo "📅 构建时间: ${BUILD_DATE}"
echo "🔗 Git提交: ${VCS_REF}"

# 检查Docker是否安装并运行
if ! docker info &> /dev/null; then
    echo "❌ Docker未运行，请启动Docker服务"
    exit 1
fi

# 步骤1: 本地构建
echo ""
echo "📦 步骤 1: 本地构建应用..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 本地构建失败"
    exit 1
fi

echo "✅ 本地构建完成！"

# 步骤2: 构建Docker镜像
echo ""
echo "🐳 步骤 2: 构建 Docker镜像..."

# 构建参数
BUILD_ARGS="--build-arg BUILD_DATE=${BUILD_DATE}"
BUILD_ARGS="${BUILD_ARGS} --build-arg VERSION=${VERSION}"
BUILD_ARGS="${BUILD_ARGS} --build-arg VCS_REF=${VCS_REF}"

# 构建镜像
docker build \
    ${BUILD_ARGS} \
    --tag "${IMAGE_NAME}:${VERSION}" \
    --file ./Dockerfile.simple \
    .

echo "✅ Docker镜像构建完成！"

# 步骤3: 可选推送
if [ "${2}" = "push" ]; then
    echo ""
    echo "📤 步骤 3: 推送镜像到Docker Hub..."

    # 检查是否登录Docker Hub
    if ! docker info 2>/dev/null | grep -q "Username"; then
        echo "⚠️  未检测到Docker登录，请先运行: docker login"
        read -p "是否继续推送？(y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "❌ 推送已取消"
            exit 1
        fi
    fi

    # 推送镜像
    docker push "${IMAGE_NAME}:${VERSION}"

    # 如果指定了特定版本，同时创建latest标签
    if [ "$VERSION" != "latest" ]; then
        docker tag "${IMAGE_NAME}:${VERSION}" "${IMAGE_NAME}:latest"
        docker push "${IMAGE_NAME}:latest"
    fi

    echo "✅ 镜像推送完成！"
fi

echo ""
echo "🎉 简化构建完成！"
echo "📋 镜像信息:"
echo "   🔗 镜像名称: ${IMAGE_NAME}"
if [ "$VERSION" != "latest" ]; then
    echo "   🏷️  标签: ${VERSION}, latest"
else
    echo "   🏷️  标签: ${VERSION}"
fi
echo "   📅 构建时间: ${BUILD_DATE}"
echo "   🔗 Git提交: ${VCS_REF}"
echo ""
echo "🚀 使用方法:"
echo "   docker run -d -p 8080:8080 ${IMAGE_NAME}:${VERSION}"
echo ""
echo "📝 查看镜像信息:"
echo "   docker images | grep ${IMAGE_NAME}"
echo "   docker inspect ${IMAGE_NAME}:${VERSION}"

# 显示镜像大小
echo ""
echo "📊 镜像大小:"
docker images ${IMAGE_NAME}:${VERSION} --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# 显示构建产物大小
echo ""
echo "📦 构建产物大小:"
du -sh dist/ | tail -1