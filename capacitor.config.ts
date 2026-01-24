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
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#09090b',
      showSpinner: false,
      launchAutoHide: false,
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
