## 🌍 Language / 语言

**[English](README.md)** | **[简体中文](README.zh-CN.md)**

---

<div align="center">
  <img src="/assets/banner.png" alt="Moodist Logo Banner" />
  <h2>Moodist 🌲</h2>
  <p>环境音生成器 - 专注与平静的声音伴侣。</p>
  <a href="https://moodist.mvze.net">访问 <strong>Moodist</strong></a> | <a href="https://buymeacoffee.com/remvze">请我喝杯咖啡</a>
</div>

## 目录

- ⚡ [功能特性](#功能特性)
- 🚀 [快速开始](#快速开始)
- 🐳 [Docker 部署](#docker-部署)
- 🧰 [技术工具](#技术工具)
- 🔮 [命令说明](#命令说明)
- 🚧 [贡献指南](#贡献指南)
- ⭐ [支持项目](#支持-moodist)
- 📜 [许可证](#许可证)

## 功能特性

1. 🎵 超过 75 种环境音
1. 📝 持久化的声音选择
1. ✈️ 与他人分享声音选择
1. 🧰 自定义声音预设
1. 🌙 睡眠定时器
1. 📓 快速记事本
1. 🍅 番茄钟计时器
1. ✅ 简单的待办事项列表（即将推出）
1. ⏯️ 媒体控制
1. ⌨️ 全功能键盘快捷键
1. 🥷 注重隐私：不收集任何数据
1. 💰 完全免费、开源、可自托管

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/wheesys/moodist.git
cd moodist

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:4321](http://localhost:4321) 查看应用。

### 构建生产版本

```bash
# 构建应用
npm run build

# 预览构建结果
npm run preview
```

## 🐳 Docker 部署

### 直接运行

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

### 使用 Docker Compose

```bash
# 简单版本
docker-compose up -d

# 或使用优化版本
docker-compose -f docker-compose.optimized.yml up -d
```

访问 [http://localhost:8080](http://localhost:8080) 查看应用。

### 自定义构建

```bash
# 构建镜像
npm run docker:push

# 带版本号构建
./scripts/build-docker-simple.sh 2.1.0

# 构建并推送到 Docker Hub
npm run docker:push-and-upload
```

📖 详细部署指南请查看 [DOCKER_DEPLOY.md](DOCKER_DEPLOY.md)

## 技术工具

- ⚡ **TypeScript**: 编程语言
- 🔨 **React**: UI 库
- 🧑‍🚀 **Astro**: 元框架
- 🎨 **CSS Modules**: 样式方案
- 🐻 **Zustand**: 状态管理
- 🎭 **Framer Motion**: 动画库
- ⚙️ **Radix**: 无障碍组件
- 📕 **Storybook**: 组件文档
- 🧪 **Vitest**: 单元测试（即将推出）
- 🔭 **Playwright**: 端到端测试（即将推出）
- 🔍 **ESLint**: 代码检查
- 🧹 **Prettier**: 代码格式化
- 🧼 **Stylelint**: CSS 检查
- 🐶 **Husky**: Git 钩子
- 📝 **Lint Staged**: 暂存文件检查器
- 🧽 **Commitlint**: Git 提交信息检查
- 🧭 **Commitizen**: Git 提交信息助手
- 📓 **Standard Version**: 版本管理和更新日志生成
- 🧰 **PostCSS**: CSS 转换

## 命令说明

- `npm run dev`: 运行开发服务器
- `npm run build`: 构建生产版本
- `npm run preview`: 预览构建的应用
- `npm run lint`: 使用 ESLint 检查代码
- `npm run lint:fix`: 使用 ESLint 检查并修复代码
- `npm run lint:style`: 使用 Stylelint 检查样式
- `npm run lint:style:fix`: 使用 Stylelint 检查并修复样式
- `npm run format`: 使用 Prettier 格式化文件
- `npm run commit`: 使用 Commitizen 提交代码
- `npm run release:major`: 发布主版本
- `npm run release:minor`: 发布次版本
- `npm run release:patch`: 发布补丁版本
- `npm run storybook`: 运行 Storybook

## 贡献指南

🚧 请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 文件。

## 支持 Moodist

⭐ 如果您喜欢这个项目，请给它一个星标。

☕ [请我喝杯咖啡](https://buymeacoffee.com/remvze) 来帮助我维护 Moodist。

## 许可证

本项目基于 **MIT 许可证** - 详情请查看 [LICENSE](LICENSE) 文件。

### ⚠️ 第三方资源

本项目使用的部分声音来源于第三方提供商，并**遵循不同的许可证**：

- 遵循 **Pixabay 内容许可证** 的声音：[Pixabay 内容许可证](https://pixabay.com/service/license-summary/)
- 遵循 **CC0** 的声音：[知识共享署名许可协议](https://creativecommons.org/publicdomain/zero/1.0/)