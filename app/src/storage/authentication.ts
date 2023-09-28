import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_AUTHENTICATION_TOKEN } from './keys'

interface AuthenticationTokens {
  token: string;
  refresh_token: string;
};

export async function saveAuthenticationTokens({ token, refresh_token }: AuthenticationTokens): Promise<void> {
  const value = JSON.stringify({ token, refresh_token });
  await AsyncStorage.setItem(STORAGE_AUTHENTICATION_TOKEN, value);
}

export async function getAuthenticationTokens(): Promise<AuthenticationTokens | null> {
  const response = await AsyncStorage.getItem(STORAGE_AUTHENTICATION_TOKEN);
  const authenticationTokens: AuthenticationTokens | null = response ? JSON.parse(response) : null;

  return authenticationTokens;
}

export async function removeAuthenticationTokens(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_AUTHENTICATION_TOKEN);
}

export async function clearAuthentication(): Promise<void> {
  await AsyncStorage.clear();
}
