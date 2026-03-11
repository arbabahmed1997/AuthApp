import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User as AuthUser,
  AuthContextData as AuthContextValue,
} from '../types';

type StoredUser = AuthUser & {
  password: string;
};

const USERS_KEY = '@app_users';
const CURRENT_USER_KEY = '@app_current_user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadInitialAuthState = useCallback(async () => {
    try {
      const storedUserJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (storedUserJson) {
        const parsed: AuthUser = JSON.parse(storedUserJson);
        setUser(parsed);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialAuthState();
  }, [loadInitialAuthState]);

  const persistCurrentUser = useCallback(async (user: AuthUser | null) => {
    if (!user) {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      return;
    }
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }, []);

  const readUsers = useCallback(async (): Promise<StoredUser[]> => {
    const json = await AsyncStorage.getItem(USERS_KEY);
    if (!json) {
      return [];
    }
    try {
      const parsed: StoredUser[] = JSON.parse(json);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  }, []);

  const writeUsers = useCallback(async (users: StoredUser[]) => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const trimmedEmail = email.trim().toLowerCase();
      const users = await readUsers();
      const existing = users.find(
        u => u.email.trim().toLowerCase() === trimmedEmail,
      );

      if (!existing) {
        throw new Error('USER_NOT_FOUND');
      }
      if (existing.password !== password) {
        throw new Error('INCORRECT_PASSWORD');
      }
      const nextUser: AuthUser = {
        id: existing.id,
        name: existing.name,
        email: existing.email,
      };
      setUser(nextUser);
      await persistCurrentUser(nextUser);
    },
    [persistCurrentUser, readUsers],
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const trimmedEmail = email.trim().toLowerCase();
      const users = await readUsers();
      const alreadyExists = users.some(
        u => u.email.trim().toLowerCase() === trimmedEmail,
      );

      if (alreadyExists) {
        const error = new Error('EMAIL_ALREADY_IN_USE');
        throw error;
      }

      const newUser: StoredUser = {
        id: `${Date.now()}`,
        name: name.trim(),
        email: trimmedEmail,
        password,
      };

      const nextUsers = [...users, newUser];
      await writeUsers(nextUsers);
    },
    [readUsers, writeUsers],
  );

  const logout = useCallback(async () => {
    setUser(null);
    await persistCurrentUser(null);
  }, [persistCurrentUser]);

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, isLoading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
