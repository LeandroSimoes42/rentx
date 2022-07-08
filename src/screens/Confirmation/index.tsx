import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { 
    Container,
    Content,
    Title,
    Message,
    Footer
 } from './styles'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import ConfirmButton from '../../components/ConfirmButton'
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native'

interface Params{
    nextPage: string;
    title: string;
    message: string;
}

export default function Confirmation() {
    const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation()
    const route = useRoute()
    const { nextPage, title, message } = route.params as Params
    const { width } = useWindowDimensions()
    
    const handleConfirm = () => {
        navigate(nextPage)
    }
    return (
      <Container>
          <LogoSvg width={width}/>
          <Content>
              <DoneSvg width={80} height={80}/>
              <Title>{title}</Title>

              <Message>
                {message}
              </Message>
          </Content>
          <Footer>
              <ConfirmButton title='OK' onPress={() => handleConfirm()}/>
          </Footer>
      </Container>
    )
}