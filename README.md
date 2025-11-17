## 🌍 Language / 语言

**[English](README.en.md)** | **[简体中文](README.md)**

---

<div align="center">
  <img src="/assets/banner.png" alt="Moodist Logo Banner" />
  <h2>Moodist 🌲</h2>
  <p>环境音工具，助你专注与平静</p>
  <a href="https://moodist.mvze.net">访问 <strong>Moodist</strong></a> | <a href="https://calm.zlext.com/">在线体验地址</a> | <a href="https://buymeacoffee.com/remvze">支持开发者</a>
</div>

## 目录

- ⚡ [功能特性](#features)
- 🎮 [使用说明](#-使用说明)
- 🐳 [Docker 部署](#-docker-部署)
- 🌐 [在线体验](#-在线体验)
- 🧰 [技术栈](#tools)
- 🔮 [命令](#commands)
- 🚧 [贡献指南](#contributing)
- ⭐ [支持项目](#support-moodist)
- 📜 [许可证](#license)

## 功能特性

1. 🎵 75+ 种环境音效
2. 📝 声音选择持久化存储
3. ✈️ 分享声音组合给他人
4. 🧰 自定义声音预设
5. 🌙 声音睡眠定时器
6. 📓 便签快速记录
7. 🍅 番茄钟计时器
8. ✅ 简单待办事项（即将推出）
9. ⏯️ 媒体控制键
10. ⌨️ 全功能快捷键支持
11. 🥷 隐私保护：无数据收集
12. 💰 完全免费、开源、可自托管

## 🎮 使用说明

### 基本操作
- **播放/暂停声音**：点击声音卡片即可播放，再次点击暂停
- **音量调节**：拖动声音卡片下方的音量进度条
- **速度调节**：拖动第二条进度条调整播放速度
- **音调调节**：拖动第三条进度条调整音调（Rate）

### 高级功能
- **收藏功能**：点击声音卡片右上角的❤️图标收藏常用声音
- **随机效果**：点击❤️下方的🔀图标启用随机变化：
  - 每次只随机调整一个参数（速度/音调/音量）
  - 随机变化频率约为1分钟一次
  - 速度和音调：默认值 ±0.25 范围内随机
  - 音量：30%-70% 范围内随机
- **键盘快捷键**：
  - 空格键：播放/暂停
  - 方向键：调节选中声音的音量
  - 数字键：快速选择声音

### 主题切换
- **昼夜模式**：点击右上角的🌞/🌙按钮切换主题
- **自动适配**：系统会根据您的设备主题自动选择合适的颜色方案
- **全面适配**：主题切换会影响整个页面背景及所有组件的颜色

## 🐳 Docker 部署

### 使用 Docker Compose（推荐）

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/moodist.git
   cd moodist
   ```

2. **创建 docker-compose.yml 文件**
   ```yaml
   version: '3.8'

   services:
     moodist:
       build: .
       ports:
         - "4321:4321"
       environment:
         - NODE_ENV=production
       restart: unless-stopped
   ```

3. **启动服务**
   ```bash
   docker-compose up -d
   ```

4. **访问应用**

   打开浏览器访问：http://localhost:4321

### 使用 Docker 命令

1. **构建镜像**
   ```bash
   docker build -t moodist .
   ```

2. **运行容器**
   ```bash
   docker run -d -p 4321:4321 --name moodist moodist
   ```

3. **访问应用**

   打开浏览器访问：http://localhost:4321

### 生产环境部署

对于生产环境，建议使用反向代理（如 Nginx）并配置 HTTPS：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:4321;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 环境变量配置

- `NODE_ENV`: 设置为 `production` 以启用生产模式优化
- `PORT`: 应用运行端口（默认：4321）

## 🌐 在线体验

- **官方站点**：https://moodist.mvze.net
- **体验地址**：https://calm.zlext.com（可直接使用）
- **完全免费**：无需注册，即开即用

## 技术栈

- ⚡ **TypeScript**: Programming Language
- 🔨 **React**: UI Library
- 🧑‍🚀 **Astro**: Meta Framework
- 🎨 **CSS Modules**: Styling
- 🐻 **Zustand**: State Management
- 🎭 **Framer Motion**: Animation Library
- ⚙️ **Radix**: Accessible Components
- 📕 **Storybook**: Component Documentation
- 🧪 **Vitest**: Unit Testing (soon)
- 🔭 **Playwright**: End-To-End Testing (soon)
- 🔍 **ESLint**: Code Linting
- 🧹 **Prettier**: Code Formatting
- 🧼 **Stylelint**: CSS Linting
- 🐶 **Husky**: Git Hooks
- 📝 **Lint Staged**: Running Linters on Staged Files
- 🧽 **Commitlint**: Git Commit Linting
- 🧭 **Commitizen**: Git Commit Message Helper
- 📓 **Standard Version**: Versioning and CHANGLOG Generation
- 🧰 **PostCSS**: CSS Transformations

## 命令

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run preview`: 预览构建的应用
- `npm run lint`: 使用 ESLint 检查代码
- `npm run lint:fix`: 使用 ESLint 检查并修复代码
- `npm run lint:style`: 使用 Stylelint 检查样式
- `npm run lint:style:fix`: 使用 Stylelint 检查并修复样式
- `npm run format`: 使用 Prettier 格式化代码
- `npm run commit`: 使用 Commitizen 提交代码
- `npm run release:major`: 发布主版本
- `npm run release:minor`: 发布次版本
- `npm run release:patch`: 发布补丁版本
- `npm run storybook`: 运行 Storybook

## 贡献指南

🚧 请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 文件。

## 支持项目

⭐ 如果您喜欢这个项目，请给我们一个星标。

☕ [请我喝咖啡](https://buymeacoffee.com/remvze) 来帮助我维护 Moodist。

## 许可证

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### ⚠️ Third-Party Assets

Some sounds used in this project are sourced from third-party providers and **are subject to different licenses**:

- Sounds licensed under the **Pixabay Content License**: [Pixabay Content License](https://pixabay.com/service/license-summary/)
- Sounds licensed under **CC0**: [Creative Commons Zero License](https://creativecommons.org/publicdomain/zero/1.0/)
