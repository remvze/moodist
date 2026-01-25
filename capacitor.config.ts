import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'net.mvze.moodist',
  appName: 'Moodist',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#09090b',
    preferredContentMode: 'mobile',
  },
  android: {
    backgroundColor: '#09090b',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#09090b',
      showSpinner: false,
      launchAutoHide: true,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#09090b',
    },
  },
  // Server config only for development - remove for production
  // server: {
  //   url: 'http://YOUR_LOCAL_IP:4321',
  //   cleartext: true,
  // },
};

export default config;
