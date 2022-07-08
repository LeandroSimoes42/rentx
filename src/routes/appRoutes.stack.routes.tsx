import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import CardDatails from '../screens/CardDatails'
import Schedules from '../screens/Schedules'
import SchedulingDetails from '../screens/SchedulingDetails'
import Confirmation from '../screens/Confirmation'
import Splash from '../screens/Splash'

export default function AppStackRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator()
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Home' >
        <Screen name='Home' component={Home}/>
        <Screen name='CardDatails' component={CardDatails}/>
        <Screen name='Schedules' component={Schedules}/>
        <Screen name='SchedulingDetails' component={SchedulingDetails}/>
        <Screen name='Confirmation' component={Confirmation}/>
    </Navigator>
  )
}