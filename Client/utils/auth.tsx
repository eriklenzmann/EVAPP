import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from './apiService';
import * as types from '../types/types';

type AuthContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    user: types.TUser | null;
    setUser: React.Dispatch<React.SetStateAction<types.TUser | null>>;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const defaultAuthContext: AuthContextType = {
    token: null,
    setToken: () => { },
    user: null,
    setUser: () => { },
    login: async () => { },
    logout: async () => { },
    isAuthenticated: false,
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<types.TUser | null>(null);

    useEffect(() => {
        if (token) {
            getUser(token).then((data) => {
                setUser(data)
            })
        }
    }, [token])

    const login = async (token: string): Promise<void> => {
        try {
            await AsyncStorage.setItem('token', token)
            setToken(token);
        } catch (error) {
            console.error('Error storing token:', error);

        }
    };

    const logout = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem('token')
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Error removing token:', error)
        }
    };

    const getData = async (): Promise<void> => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                // value previously stored
                setToken(value);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const isAuthenticated: boolean = !!token;

    return <AuthContext.Provider value={{
        token,
        setToken,
        login,
        logout,
        isAuthenticated,
        user,
        setUser
    }}>
        {children}
    </AuthContext.Provider>;
};
