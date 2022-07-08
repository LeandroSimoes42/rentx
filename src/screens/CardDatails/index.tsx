import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { 
  CardImages,
  Container,
  Header,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  AcessoriesContainer,
  Footer
} from './styles'
import BackButton from '../../components/BackButton'
import ImageSlider from '../../components/ImageSlider'
import Acessory from '../../components/Acessory'
import Button from '../../components/Button'
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { Cars } from '../../model/cars'
import getAcessories from '../../utils/getAcessories'
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useTheme } from 'styled-components'

interface Params {
  car: Cars
}

export default function CardDatails() {
  const theme = useTheme()
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
    console.log(event.contentOffset.y)
  })
  const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params;

  const handleConfirmCar = () => {
    navigate('Schedules', {car})
  }

  const headerStyleAnimated = useAnimatedStyle(() => {
    return{
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP)
    }
  })

  const carStyleAnimated = useAnimatedStyle(() => {
    return{
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    }
  })

  return (
    <Container>
      <Animated.View style={[headerStyleAnimated, styles.header, {backgroundColor: theme.colors.background_secondary}]}>
        <Header>
          <BackButton onPress={() => goBack()} style={{ zIndex: 1 }}/>
        </Header>
        <Animated.View style={[carStyleAnimated]}>
          <CardImages>
            <ImageSlider imageUrl={car.photos}/>
          </CardImages>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
      contentContainerStyle = {{
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 160
      }}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        <AcessoriesContainer>
          {
            car.accessories.map((acessory, index) => (
              <Acessory name={acessory.name} icon={getAcessories(acessory.type)} key={index}/>
            ))
          }
        </AcessoriesContainer>
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button title='Escolher período do aluguel' onPress={() => handleConfirmCar()}/>
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },
})