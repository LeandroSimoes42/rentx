import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Mycars from '../screens/Mycars'
import AppStackRoutes from './appRoutes.stack.routes'
import { useTheme } from 'styled-components'
import HomeSvg from '../assets/home.svg'
import PeopleSvg from '../assets/people.svg'
import CarSvg from '../assets/car.svg'
import Profile from '../screens/Profile'

export default function AppTabRoutes() {
    const { Navigator, Screen } = createBottomTabNavigator()
    const theme = useTheme()
    return (
      <Navigator 
      screenOptions={{ 
          headerShown: false,
          tabBarActiveTintColor: theme.colors.main,
          tabBarInactiveTintColor: theme.colors.text_detail,
          tabBarShowLabel: false,
          tabBarStyle: {
            padding: Platform.OS === 'ios' ? 20 : 0,
            height: 78,
            backgroundColor: theme.colors.background_primary
          }
        }} 
      
      >
          <Screen 
            name='HomeStart' 
            component={AppStackRoutes}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <HomeSvg width={size} height={size} fill={color}/>
              }
            }}
          />
          <Screen 
            name='MyCars' 
            component={Mycars}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <CarSvg width={size} height={size} fill={color}/>
              }
            }}
          />
          <Screen 
            name='Profile' 
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <PeopleSvg width={size} height={size} fill={color}/>
              }
            }}
          />
      </Navigator>
    )
}