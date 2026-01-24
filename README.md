<div align="center">
  <img src="/assets/banner.png" alt="Moodist Logo Banner" />
  <h2>Moodist 🌲</h2>
  <p>Ambient sounds for focus and calm.</p>
  <a href="https://moodist.mvze.net">Visit <strong>Moodist</strong></a> | <a href="https://buymeacoffee.com/remvze">Buy Me a Coffee</a>
</div>

## Table of Contents

- ⚡ [Features](#features)
- 🧰 [Tools](#tools)
- 🔮 [Commands](#commands)
- 📱 [iOS App](#ios-app)
- 🚧 [Contributing](#contributing)
- ⭐ [Support](#support-moodist)
- 📜 [License](#license)

## Features

1. 🎵 Over 75 ambient sounds.
1. 📝 Persistent sound selection.
1. ✈️ Sharing sound selections with others.
1. 🧰 Custom sound presets.
1. 🌙 Sleep timer for sounds.
1. 📓 Notepad for quick notes.
1. 🍅 Pomodoro timer.
1. ✅ Simple to-do list (soon).
1. ⏯️ Media controls.
1. ⌨️ Keyboard shortcuts for everything.
1. 🥷 Privacy focused: no data collection.
1. 💰 Completely free, open-source, and self-hostable.

## Tools

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

## Commands

### Web Development
- `npm run dev`: run development server
- `npm run build`: build for production
- `npm run preview`: preview the built app

### iOS Development (with Capacitor)
- `npm run build:ios`: build and sync to iOS
- `npm run dev:ios`: build, sync, and open in Xcode
- `npm run cap:sync`: sync web assets to native platforms
- `npm run cap:ios`: open iOS project in Xcode

### Code Quality
- `npm run lint`: lint files using ESLint
- `npm run lint:fix`: lint and fix using ESLint
- `npm run lint:style`: lint styles using Stylelint
- `npm run lint:style:fix`: lint and fix styles using Stylelint
- `npm run format`: format files using Prettier

### Git & Versioning
- `npm run commit`: commit message using Commitizen
- `npm run release:major`: release major version
- `npm run release:minor`: release minor version
- `npm run release:patch`: release patch version

### Development Tools
- `npm run storybook`: run Storybook

## iOS App

Moodist is now available as a native iOS app using Capacitor! The same codebase powers both the web app and iOS app.

### Features on iOS
- ✅ Full feature parity with web app
- ✅ Background audio playback
- ✅ Native share sheet integration
- ✅ Offline-first with all sounds bundled
- ✅ No data collection or tracking

### For Developers

**Quick Start:**
```bash
npm install
npm run build:ios
# Opens in Xcode - requires macOS with Xcode installed
```

**Documentation:**
- 📖 [Full Implementation Guide](CAPACITOR_IMPLEMENTATION.md)
- 🚀 [Quick Reference](CAPACITOR_QUICK_REFERENCE.md)

**Status:** Code complete. Remaining tasks require:
- App icons (design)
- Xcode for testing
- Apple Developer account for App Store submission

The iOS-specific code uses platform abstraction layers and is fully compatible with the web version. All changes are backward compatible.

## Contributing

🚧 Please check [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Support Moodist

⭐ Give a star if you liked this project.

☕ [Buy Me a Coffee](https://buymeacoffee.com/remvze) to help me maintain Moodist.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### ⚠️ Third-Party Assets

Some sounds used in this project are sourced from third-party providers and **are subject to different licenses**:

- Sounds licensed under the **Pixabay Content License**: [Pixabay Content License](https://pixabay.com/service/license-summary/)
- Sounds licensed under **CC0**: [Creative Commons Zero License](https://creativecommons.org/publicdomain/zero/1.0/)
