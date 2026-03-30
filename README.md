<div align="center">
  <img src="/assets/banner.png" alt="Moodist Banner" />
  <h1>Moodist</h1>
  <p><strong>Ambient sounds for focus and calm.</strong></p>
  <p>An open-source, privacy-first ambient sound mixer built with React, Astro, and Capacitor - available on web, iOS, and Android.</p>

  <a href="https://moodist.mvze.net">Live Demo</a> &bull;
  <a href="#contributing">Contribute</a> &bull;
  <a href="DEVELOPMENT.md">Dev Setup</a> &bull;
  <a href="https://buymeacoffee.com/remvze">Buy Me a Coffee</a>

  <br /><br />

  ![License](https://img.shields.io/badge/license-MIT-blue)
  ![Version](https://img.shields.io/badge/version-2.4.0-green)
  ![Platform](https://img.shields.io/badge/platform-web%20%7C%20iOS%20%7C%20Android-lightgrey)
  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
</div>

---

## What is Moodist?

Moodist is a free, open-source ambient sound mixer that helps you focus, relax, or sleep. Mix and match 75+ high-quality sounds across categories like nature, rain, animals, urban, and more. No accounts, no tracking, no ads - just sound.

**Web app:** [moodist.mvze.net](https://moodist.mvze.net)

## Features

- **75+ ambient sounds** across 8 categories (nature, rain, animals, urban, places, transport, things, noise)
- **Custom presets** - save and load your favorite sound combinations
- **Sleep timer** - fall asleep to your favorite mix
- **Pomodoro timer** - stay productive with timed focus sessions
- **Notepad** - jot down quick notes without leaving the app
- **Share mixes** - send your sound selection to others via URL
- **Keyboard shortcuts** - control everything without touching the mouse
- **Offline-first** - all sounds bundled, works without internet
- **Privacy focused** - zero data collection or tracking
- **Cross-platform** - web (PWA), native iOS, and Android via Capacitor

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | TypeScript |
| UI | React 18 |
| Framework | Astro |
| Styling | CSS Modules + PostCSS |
| State | Zustand |
| Animation | Framer Motion |
| Audio | Howler.js |
| Components | Radix UI |
| Native | Capacitor v8 |
| Testing | Vitest |
| Docs | Storybook |
| Quality | ESLint, Prettier, Stylelint, Husky, Commitlint |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/elvistranhere/moodist-mobile.git
cd moodist-mobile

# Install dependencies
npm install

# Start development server
npm run dev
```

For iOS/Android development and full setup instructions, see [DEVELOPMENT.md](DEVELOPMENT.md).

### Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start web dev server |
| `npm run build` | Build for production |
| `npm run build:ios` | Build and sync to iOS |
| `npm run dev:ios` | Build, sync, and open Xcode |
| `npm run build:android` | Build and sync to Android |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |
| `npm run test` | Run tests |
| `npm run storybook` | Launch Storybook |
| `npm run commit` | Commit with Commitizen |

## Project Structure

```
moodist-mobile/
├── src/
│   ├── components/       # React & Astro components
│   ├── data/sounds/      # Sound definitions by category
│   ├── stores/           # Zustand state stores
│   ├── hooks/            # Custom React hooks
│   ├── lib/platform/     # Platform abstraction (web/native)
│   ├── helpers/          # Utility functions
│   ├── contexts/         # React context providers
│   └── styles/           # Global styles and variables
├── ios/                  # iOS native project (Capacitor)
├── android/              # Android native project (Capacitor)
├── .storybook/           # Storybook configuration
└── .github/workflows/    # CI/CD pipelines
```

## Contributing

**We actively welcome contributions from the community.** Whether you're fixing a bug, adding a feature, improving docs, or refactoring code - your help makes Moodist better for everyone.

### Why Contribute?

- **Real-world experience** with a production React + Astro + Capacitor codebase
- **Cross-platform development** - work on web, iOS, and Android from one codebase
- **Modern tooling** - TypeScript, Zustand, Framer Motion, Radix UI, and more
- **Mentorship-friendly** - clear code structure, conventional commits, and CI checks to guide you
- **Portfolio-worthy** - contributions to a polished, user-facing open-source product

### Areas Open for Contribution

| Area | Examples | Difficulty |
|------|----------|------------|
| **New Sounds** | Add ambient sounds to existing or new categories | Beginner |
| **UI/UX** | Improve accessibility, responsive design, animations | Beginner - Intermediate |
| **Features** | To-do list, new timer modes, sound visualizations | Intermediate |
| **Testing** | Unit tests with Vitest, E2E tests with Playwright | Intermediate |
| **Performance** | Audio loading optimization, bundle size reduction | Advanced |
| **Native** | iOS/Android-specific features via Capacitor plugins | Advanced |
| **Infrastructure** | CI/CD improvements, Docker optimization, deployment | Advanced |

### Getting Started

1. Read the [Contributing Guidelines](CONTRIBUTING.md) for the full workflow
2. Check [open issues](https://github.com/elvistranhere/moodist-mobile/issues) for something that interests you
3. Set up your dev environment with [DEVELOPMENT.md](DEVELOPMENT.md)
4. Pick an issue, comment that you're working on it, and submit a PR

We use **Conventional Commits** and have pre-commit hooks to keep code quality consistent. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### For Teams and Freelancers

If you're a development team or freelance developer looking to contribute larger features or take on outsourced work, we'd love to hear from you. Open an issue or reach out to discuss scope, timelines, and collaboration.

## iOS & Android

Moodist runs natively on iOS and Android through Capacitor, sharing the same codebase as the web app.

**Native capabilities:**
- Background audio playback
- Native share sheet
- Local notifications
- Offline-first with bundled sounds
- Platform-adaptive UI

See [DEVELOPMENT.md](DEVELOPMENT.md) for build instructions.

## Self-Hosting

Moodist can be self-hosted using Docker:

```bash
docker build -t moodist .
docker run -p 80:80 moodist
```

## Support

If you find Moodist useful, consider:

- Giving the repo a star
- [Buying me a coffee](https://buymeacoffee.com/remvze)
- Sharing the project with others
- Contributing code or reporting bugs

## License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) for details.

**Third-party assets:** Some sounds are sourced from third-party providers under the [Pixabay Content License](https://pixabay.com/service/license-summary/) and [Creative Commons Zero (CC0)](https://creativecommons.org/publicdomain/zero/1.0/).
