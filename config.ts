import Constants from 'expo-constants';
export const API_BASE = (Constants.expoConfig?.extra as any)?.apiBase || 'https://api.usadi.app';
export const OAUTH_REDIRECT = 'usadi://oauth-callback';
