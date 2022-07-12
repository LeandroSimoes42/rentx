import React, { useState, ReactNode, createContext, useContext, useEffect } from 'react'
import { Alert } from 'react-native';
import { database } from '../database';
import { User as ModelUser } from '../database/model/user';
import api from '../services/api'

interface User {
    id: string;
    user_id: string;
    name: string;
    password?: string;
    email: string;
    driver_license: string;
    avatar: string;
    token: string;
}

interface Response{
    user: User,
    token: string;
}


interface Credentials{
    email: string;
    password: string;
}

interface AuthContextData{
    user: User;
    signIn: (data: Credentials) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps{
    children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({children}: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [account, setAccount] = useState<User>({} as User)

    const signIn = async(data: Credentials) => {
        try {
            const response = await api.post<Response>('/sessions',{
                email: data.email,
                password: data.password
            })
            const { token, user } = response.data
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            const userCollection = await database.get<ModelUser>('users')
            await database.write(async () => {
                const response = await userCollection.create(( newUser ) => {
                    newUser.user_id = user.id,
                    newUser.name = user.name,
                    newUser.email = user.email,
                    newUser.driver_license = user.driver_license,
                    newUser.avatar = user.avatar,
                    newUser.token = token
                })
                const userData = response._raw as unknown as User
                setAccount({ password: user.password, ...userData, token })
            })
        } catch (error) {
            Alert.alert('Não foi possivel fazer o login, tente novamente!')
        }
    }

    const signOut = async () => {
        try {
            const userCollection = await database.get<ModelUser>('users')
            await database.write(async () => {
                const userSelected = await userCollection.find(account.id)
                await userSelected.destroyPermanently()
            })
            setAccount({} as User)
        } catch (error) {
            Alert.alert('Não foi possível deslogar, tente novamente!')
        }
    }

    const updateUser = async (user: User) => {
        try {
            const userCollection = await database.get<ModelUser>('users')
            database.write(async () => {
                const userSelected = await userCollection.find(user.id)
                await userSelected.update(( userData ) => {
                    userData.name = user.name,
                    userData.driver_license = user.driver_license,
                    userData.avatar = user.avatar
                })
            })
            setAccount(user)
        } catch (error) {
            Alert.alert('Não foi possível atualizar o perfil, tente novamente!')
        }
    }

    useEffect(() => {
        const loadUserData = async() => {
            const usersCollection = await database.get('users')
            const users = await usersCollection.query().fetch()
            if(users.length > 0){
                const userData = users[0]._raw as unknown as User
                api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
                setAccount(userData)
                setIsLoading(false)
            }
        }
        loadUserData()
    },[])

    return (
        <AuthContext.Provider value={{
            user: account,
            signIn,
            signOut,
            updateUser,
            isLoading
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