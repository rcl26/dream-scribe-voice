import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3494823281924feeb9f4edb80eeb2d56',
  appName: 'DreamJournal',
  webDir: 'dist',
  server: {
    url: 'https://34948232-8192-4fee-b9f4-edb80eeb2d56.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;