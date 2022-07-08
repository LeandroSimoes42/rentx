import React, { useState, ReactNode, createContext, useContext } from 'react'
import api from '../services/api'

interface User {
    id: string;
    name: string;
    password: string;
    email: string;
    driver_license: string;
    avatar: string;
}

interface AuthState{
    token: string;
    user: User
}

interface Credentials{
    email: string;
    password: string;
}

interface AuthContextData{
    user: User;
    signIn: (data: Credentials) => Promise<void>
}

interface AuthProviderProps{
    children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({children}: AuthProviderProps) => {
    const [account, setAccount] = useState<AuthState>({} as AuthState)

    const signIn = async(data: Credentials) => {
        const response = await api.post('/sessions',{
            email: data.email,
            password: data.password
        })
        const { token, user } = response.data
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setAccount({ token, user })
    }

    return (
        <AuthContext.Provider value={{
            user: account.user,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext)
    return context
}

export { useAuth, AuthProvider }