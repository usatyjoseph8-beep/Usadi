import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { startTdLogin } from './api';

const TOKEN_KEY = 'usadi.jwt';

export async function setToken(t: string){ await AsyncStorage.setItem(TOKEN_KEY, t); }
export async function getToken(){ return AsyncStorage.getItem(TOKEN_KEY); }
export async function clearToken(){ await AsyncStorage.removeItem(TOKEN_KEY); }

export function useAuthBootstrap(){
  const [ready, setReady] = React.useState(false);
  const [isAuthed, setAuthed] = React.useState(false);
  React.useEffect(()=>{ (async()=>{ setAuthed(!!(await getToken())); setReady(true); })(); }, []);
  return { ready, isAuthed, setAuthed };
}

export async function beginTdOAuth(){
  const { url } = await startTdLogin();
  const redirectUrl = Linking.createURL('oauth-callback');
  const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
  return result;
}
