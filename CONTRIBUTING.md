# Contributing to Moodist

Thanks for your interest in contributing! Moodist is built by the community, and every contribution matters - from fixing typos to building new features.

## Before You Start

1. **Check [open issues](https://github.com/elvistranhere/moodist-mobile/issues)** to see if someone is already working on what you have in mind
2. **For new features or large changes**, open an issue first to discuss the approach
3. **Set up your environment** using [DEVELOPMENT.md](DEVELOPMENT.md)

## Workflow

```
Fork -> Branch -> Code -> Commit -> Push -> Pull Request
```

### Step by Step

1. **Fork** the repository and clone your fork
2. **Create a branch** from `capacitor-adaptation`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Make your changes** - keep commits focused and atomic
5. **Test your changes**:
   ```bash
   npm run lint          # Check for lint errors
   npm run lint:style    # Check CSS lint errors
   npm run format        # Format code
   npm run test          # Run tests
   ```
6. **Commit using Conventional Commits**:
   ```bash
   npm run commit        # Interactive commit helper
   ```
7. **Push** your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** against `capacitor-adaptation`

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Commits are linted automatically via Husky + Commitlint.

| Prefix | Use for |
|--------|---------|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation changes |
| `style:` | Formatting, missing semicolons (not CSS changes) |
| `refactor:` | Code changes that neither fix a bug nor add a feature |
| `perf:` | Performance improvements |
| `test:` | Adding or updating tests |
| `chore:` | Build process, tooling, or dependency updates |

**Examples:**
```
feat: add wind chimes sound to nature category
fix: resolve audio playback issue on iOS Safari
docs: update development setup instructions
refactor: extract volume slider into reusable component
```

## Code Standards

- **TypeScript** - all new code should be typed
- **CSS Modules** - use `.module.css` files for component styles
- **ESLint + Prettier + Stylelint** - pre-commit hooks enforce these automatically
- **No unnecessary dependencies** - discuss in the issue before adding new packages

## Pull Request Guidelines

- **Keep PRs focused** - one feature or fix per PR
- **Write a clear description** of what changed and why
- **Include screenshots or recordings** for UI changes
- **Reference the related issue** (e.g., "Closes #42")
- **Make sure CI passes** before requesting review

## Types of Contributions

### Adding New Sounds

1. Place the audio file in the appropriate directory
2. Add the sound definition in `src/data/sounds/` (match the existing pattern)
3. Use a React Icon for the sound's icon
4. Ensure the audio file license is compatible (CC0 or Pixabay Content License preferred)

### UI/UX Improvements

- Follow existing patterns in `src/components/`
- Use CSS Modules for styling
- Use Radix UI primitives for accessible interactive elements
- Test across viewport sizes

### Native (iOS/Android) Features

- Use the platform abstraction layer in `src/lib/platform/`
- Ensure changes are backward-compatible with the web version
- Test on both web and native if possible

## Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs. actual behavior
- Platform/browser info
- Screenshots if applicable

## Requesting Features

Open an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you considered

## For Teams and Outsource Contributors

We welcome contributions from development teams and freelancers. If you're interested in taking on larger scoped work:

1. Browse open issues labeled with `help wanted` or `good first issue`
2. Open an issue describing the scope of work you'd like to take on
3. We'll discuss requirements, timelines, and any questions
4. Once aligned, proceed with the standard PR workflow

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
