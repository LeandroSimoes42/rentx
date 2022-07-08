import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { 
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CardCarWrapper,
  CardCarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
 } from './styles'
import { Cars } from '../../model/cars'
import api from '../../services/api'
import BackButton from '../../components/BackButton'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import CardCar from '../../components/CardCar'
import { AntDesign } from '@expo/vector-icons'
import LoadAnimated from '../../components/LoadAnimated'

interface ScheduledCarsProps{
  car: Cars;
  id: number;
  user_id: number;
  startDate: string;
  endDate: string;
}

export default function Mycars() {
  const [cars, setCars] = useState<ScheduledCarsProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation()
  const theme = useTheme()

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await api.get('schedules_byuser?user_id=1')
        setCars(response.data ? response.data : []);
      } catch (error) {
        console.error
      }finally{
        setIsLoading(false)
      }
    }
    getCars()
  }, [])
  
  return (
    <Container>
      {
        isLoading ?
          <LoadAnimated/>
        :
          <>
            <Header>
              <BackButton onPress={() => goBack()} color={theme.colors.shape}/>
              <Title>
                Seus agendamentos,
                estão aqui.
              </Title>
              <Subtitle>
                Conforto, Segurança e praticidade
              </Subtitle>
            </Header>
            <Content>
              <Appointments>
                <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
              </Appointments>
              <FlatList<ScheduledCarsProps>
                data={cars}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => 
                  <CardCarWrapper>
                    <CardCar data={item.car}/>
                    <CardCarFooter>
                      <CarFooterTitle>Periodo</CarFooterTitle>
                      <CarFooterPeriod>
                        <CarFooterDate>{item.startDate}</CarFooterDate>
                        <AntDesign
                          name='arrowright'
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarFooterDate>{item.endDate}</CarFooterDate>
                      </CarFooterPeriod>
                    </CardCarFooter>
                  </CardCarWrapper>
                }
              />
            </Content>
          </>
      }
    </Container>
  )
}