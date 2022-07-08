import { Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Container } from './styles'
import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'

export default function Splash() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation()
  const splashAnimation = useSharedValue(0)

  const brandStyleAnimated = useAnimatedStyle(() => {
    return{
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [{
        translateX: interpolate(splashAnimation.value, [0, 50], [0, -50], Extrapolate.CLAMP)
      }]
    }
  })

  const LogoStyleAnimated = useAnimatedStyle(() => {
    return{
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
      transform: [{
        translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0], Extrapolate.CLAMP)
      }]
    }
  })

  const startApp = () => {
    navigate('SignIn')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, {
      duration: 1000,
      
    },
    () => {
      'worklet'
      runOnJS(startApp)()
    }
    )
  },[])
  

  return (
    <Container>
      <Animated.View style={[brandStyleAnimated, {position: 'absolute'}]}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>
      <Animated.View style={[LogoStyleAnimated, {position: 'absolute'}]}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>
    </Container>
  )
}