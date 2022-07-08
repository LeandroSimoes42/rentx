import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Confirmation from '../screens/Confirmation'
import Splash from '../screens/Splash'
import SignIn from '../screens/SignIn'
import FirstStepSignUp from '../screens/SignUp/FirstStep'
import SecondStepSignUp from '../screens/SignUp/SecondStep'

export default function AuthRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator()
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash' >
        <Screen name='Splash' component={Splash}/>
        <Screen name='SignIn' component={SignIn}/>
        <Screen name='FirstStepSignUp' component={FirstStepSignUp}/>
        <Screen name='SecondStepSignUp' component={SecondStepSignUp}/>
        <Screen name='Confirmation' component={Confirmation}/>
    </Navigator>
  )
}