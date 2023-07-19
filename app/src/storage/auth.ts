import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_AUTH_TOKEN } from './keys'

type StorageAuthTokens = {
  token: string;
  refresh_token: string;
};

export async function saveAuthTokens({ token, refresh_token }: StorageAuthTokens): Promise<void> {
  const value = JSON.stringify({ token, refresh_token });
  await AsyncStorage.setItem(STORAGE_AUTH_TOKEN, value);
}

export async function getAuthTokens(): Promise<StorageAuthTokens | null> {
  const response = await AsyncStorage.getItem(STORAGE_AUTH_TOKEN);
  const authTokens: StorageAuthTokens | null = response ? JSON.parse(response) : null;

  return authTokens;
}

export async function removeAuthTokens(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_AUTH_TOKEN);
}

export async function signOut() {
  await AsyncStorage.clear();
}
