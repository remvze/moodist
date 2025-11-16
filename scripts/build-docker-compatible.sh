#!/bin/bash

# Moodist Docker 构建脚本 - 兼容版本
# 支持标准Docker和Docker Buildx（可选）

set -e

# 配置变量
IMAGE_NAME="walllee/moodist"
VERSION=${1:-latest}
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
USE_BUILDX=${2:-false}

echo "🐳 开始构建 Moodist Docker 镜像..."
echo "📦 镜像名称: ${IMAGE_NAME}"
echo "🏷️  版本标签: ${VERSION}"
echo "📅 构建时间: ${BUILD_DATE}"
echo "🔗 Git提交: ${VCS_REF}"
echo "🔧 使用Buildx: ${USE_BUILDX}"

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

# 构建函数
build_image() {
    local tag=$1
    local push_flag=$2
    local build_cmd="docker build"

    if [ "$USE_BUILDX" = "true" ]; then
        # 检查buildx是否可用
        if docker buildx version &> /dev/null; then
            echo "🔨 使用Docker Buildx构建..."
            build_cmd="docker buildx build"

            # 创建buildx构建器（如果不存在）
            if ! docker buildx ls | grep -q "moodist-builder"; then
                echo "🔨 创建Docker Buildx构建器..."
                docker buildx create --name moodist-builder --use 2>/dev/null || true
                docker buildx inspect --bootstrap 2>/dev/null || true
            fi

            # 多平台构建参数
            PLATFORM_ARGS="--platform linux/amd64,linux/arm64"
            PUSH_FLAG="--push"
        else
            echo "⚠️  Docker Buildx不可用，回退到标准Docker构建..."
            USE_BUILDX="false"
        fi
    fi

    echo "🏗️  开始构建镜像: ${tag}"

    if [ "$USE_BUILDX" = "true" ]; then
        # 使用buildx
        $build_cmd \
            $PLATFORM_ARGS \
            --tag "${tag}" \
            $BUILD_ARGS \
            --file ./Dockerfile.optimized \
            $PUSH_FLAG \
            .
    else
        # 使用标准Docker
        $build_cmd \
            --tag "${tag}" \
            $BUILD_ARGS \
            --file ./Dockerfile.optimized \
            .

        # 如果需要推送，使用标准Docker push
        if [ "$push_flag" = "true" ]; then
            echo "📤 推送镜像: ${tag}"
            docker push "${tag}"
        fi
    fi
}

# 检查是否需要登录Docker Hub
if [ "$USE_BUILDX" = "true" ] || [ "${2}" = "push" ]; then
    if ! docker info 2>/dev/null | grep -q "Username"; then
        echo "⚠️  未检测到Docker登录，请先运行: docker login"
        echo "💡 如果您有Docker Hub账号，请使用以下命令登录："
        echo "   docker login"
        read -p "是否继续构建？(y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "❌ 构建已取消"
            exit 1
        fi
    fi
fi

# 构建镜像
if [ "$USE_BUILDX" = "true" ]; then
    # Buildx模式（支持多平台）
    build_image "${IMAGE_NAME}:${VERSION}" true

    # 如果指定了特定版本，同时创建version-specific标签
    if [ "$VERSION" != "latest" ]; then
        echo "🏷️  添加版本标签: ${VERSION}"
        build_image "${IMAGE_NAME}:${VERSION}" true
    fi
else
    # 标准Docker模式
    build_image "${IMAGE_NAME}:${VERSION}" false

    # 如果指定了特定版本，创建额外的标签
    if [ "$VERSION" != "latest" ]; then
        docker tag "${IMAGE_NAME}:${VERSION}" "${IMAGE_NAME}:latest"
    fi

    # 如果需要推送
    if [ "${2}" = "push" ]; then
        echo "📤 推送镜像到Docker Hub..."
        docker push "${IMAGE_NAME}:${VERSION}"

        if [ "$VERSION" != "latest" ]; then
            docker push "${IMAGE_NAME}:latest"
        fi
    fi
fi

echo ""
echo "🎉 镜像构建完成！"
echo "📋 镜像信息:"
echo "   🔗 镜像名称: ${IMAGE_NAME}"
echo "   🏷️  标签: ${VERSION}${VERSION != "latest" ? ", latest" : ""}"
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