# iOS Build Configuration

This directory contains automated build configuration files that eliminate the need to manually configure Xcode project settings.

## Configuration Files

### `debug.xcconfig` & `release.xcconfig`

These files automatically configure build settings for Debug and Release builds:

- **Code Signing**: Set to `Automatic` (you only need to select your Team in Xcode once)
- **Deployment Target**: iOS 15.0
- **Bundle Identifier**: `net.mvze.moodist`
- **Swift Version**: 5.0
- **Device Support**: iPhone & iPad
- **Product Info**: Version numbers and app name

### How It Works

Xcode automatically reads these `.xcconfig` files when building. You don't need to:

- Manually set deployment targets
- Configure bundle identifiers
- Set Swift versions
- Adjust build settings

### What You Still Need to Do (One-Time Setup)

1. **Select Your Team in Xcode**:

   - Open the project in Xcode
   - Go to Signing & Capabilities
   - Select your Team (Personal Team or paid Developer account)
   - Xcode will automatically manage certificates and provisioning profiles

2. **That's it!** The `.xcconfig` files handle everything else.

### Updating Configuration

To change build settings (e.g., deployment target, bundle ID), edit the `.xcconfig` files directly. Changes will apply automatically on the next build.

**Note**: The bundle identifier in `.xcconfig` can be overridden in Xcode if needed, but it's set to match `capacitor.config.ts` by default.
