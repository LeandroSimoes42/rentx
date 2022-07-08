import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from 'styled-components'
import { Container } from './styles'
import LottieView from 'lottie-react-native'
import LoadCar from '../../assets/loadCar.json'

export default function LoadAnimated() {
  return (
    <Container>
      <LottieView
        source={LoadCar}
        style={{ height: 200 }}
        resizeMode='contain'
        autoPlay
        loop
      />
    </Container>
  )
}