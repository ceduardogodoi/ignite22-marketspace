import AsyncStorage from '@react-native-async-storage/async-storage';

import { Session } from '../services/SessionService';
import { STORAGE_USER } from './keys';

type User = Session['user'];

export async function saveUser(user: User): Promise<void> {
  const value = JSON.stringify(user);
  await AsyncStorage.setItem(STORAGE_USER, value);
}

export async function getUser(): Promise<User | null> {
  const response = await AsyncStorage.getItem(STORAGE_USER);
  const user: User | null = response ? JSON.parse(response) : null;

  return user;
}
