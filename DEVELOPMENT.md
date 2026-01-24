# Development Setup

Before developing the app, you need to configure the following settings for your environment.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Xcode 15+ (for iOS development)
- Apple Developer Account (free or paid)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build and sync to iOS
npm run build:ios

# Open in Xcode
npm run cap:ios
```

## Configuration Required

### 1. Bundle Identifier

Update the bundle identifier in the following files to match your Apple Developer account:

| File                   | Line | Current Value                                  |
| ---------------------- | ---- | ---------------------------------------------- |
| `capacitor.config.ts`  | 4    | `appId: 'net.mvze.moodist'`                    |
| `ios/debug.xcconfig`   | 22   | `PRODUCT_BUNDLE_IDENTIFIER = net.mvze.moodist` |
| `ios/release.xcconfig` | 22   | `PRODUCT_BUNDLE_IDENTIFIER = net.mvze.moodist` |

The bundle ID must be unique and follow reverse-domain format (e.g., `com.yourname.moodist`).

**Note:** If you're forking this project, you must change these to your own unique bundle ID.

### 2. Development Team (iOS)

When you first open the project in Xcode:

1. Open `ios/App/App.xcworkspace` in Xcode
2. Select the "App" target
3. Go to "Signing & Capabilities" tab
4. Select your Team from the dropdown
5. Xcode will automatically manage signing

If you have a paid Apple Developer account, you can distribute to TestFlight and the App Store.
With a free account, you can only install on your own devices.

### 3. App Name (Optional)

To change the app name displayed on the device:

| File                   | Setting                  |
| ---------------------- | ------------------------ |
| `capacitor.config.ts`  | `appName: 'Moodist'`     |
| `ios/debug.xcconfig`   | `PRODUCT_NAME = Moodist` |
| `ios/release.xcconfig` | `PRODUCT_NAME = Moodist` |

## iOS Development

### Building for Device

```bash
# Build web app and sync to iOS
npm run build:ios

# Open Xcode
npm run cap:ios
```

Then in Xcode:

1. Select your device from the device dropdown
2. Click the Play button (or Cmd+R)

See `ios/INSTALL_ON_DEVICE.md` for detailed instructions.

### Live Reload (Development)

For faster development with live reload:

1. Find your Mac's local IP address
2. Uncomment and update the `server` section in `capacitor.config.ts`:

```typescript
server: {
  url: 'http://YOUR_LOCAL_IP:4321',
  cleartext: true,
},
```

3. Run `npm run dev` to start the dev server
4. Run `npx cap sync ios` to update the config
5. Build and run from Xcode

Remember to remove/comment the `server` config before production builds.

## Project Structure

```
moodist-mobile/
├── src/                  # Web app source (Astro + React)
├── dist/                 # Built web assets (gitignored)
├── ios/                  # iOS native project
│   ├── App/              # Xcode project
│   ├── debug.xcconfig    # Debug build settings
│   └── release.xcconfig  # Release build settings
├── capacitor.config.ts   # Capacitor configuration
└── package.json          # Dependencies and scripts
```

## Troubleshooting

### "Signing requires a development team"

- Open Xcode, go to Signing & Capabilities, and select your Team

### "Bundle identifier already in use"

- Change the bundle ID to something unique in the files listed above

### Build fails after pulling changes

```bash
npm install
npm run build:ios
```

### iOS simulator not showing app updates

```bash
npx cap sync ios
```

Then clean build in Xcode: Product > Clean Build Folder (Shift+Cmd+K)
