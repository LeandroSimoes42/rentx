import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/auth'
import AppTabRoutes from './appRoutes.tab.routes'
import AuthRoutes from './auth.routes'

export default function Routes() {
    const { user } = useAuth()
    return (
    <NavigationContainer>
        {user ? <AppTabRoutes/> : <AuthRoutes/> }
    </NavigationContainer>
    )
}