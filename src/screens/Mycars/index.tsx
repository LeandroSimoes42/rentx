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
import { Cars as ModelCar } from '../../database/model/car'
import api from '../../services/api'
import BackButton from '../../components/BackButton'
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import CardCar from '../../components/CardCar'
import { AntDesign } from '@expo/vector-icons'
import LoadAnimated from '../../components/LoadAnimated'
import { format, parseISO } from 'date-fns'

interface DataProps{
  car: ModelCar;
  id: number;
  user_id: number;
  start_date: string;
  end_date: string;
}

export default function Mycars() {
  const [cars, setCars] = useState<DataProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { goBack }: NavigationProp<ParamListBase> = useNavigation()
  const theme = useTheme()
  const screenIsFocus = useIsFocused()

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await api.get('/rentals')
        const dataFormatted = response.data.map((data: DataProps) => {
          return{
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
          }
        })
        setCars(dataFormatted);
      } catch (error) {
        console.error
      }finally{
        setIsLoading(false)
      }
    }
    getCars()
  }, [screenIsFocus])
  
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
              <FlatList<DataProps>
                data={cars}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => 
                  <CardCarWrapper>
                    <CardCar data={item.car}/>
                    <CardCarFooter>
                      <CarFooterTitle>Periodo</CarFooterTitle>
                      <CarFooterPeriod>
                        <CarFooterDate>{item.start_date}</CarFooterDate>
                        <AntDesign
                          name='arrowright'
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarFooterDate>{item.end_date}</CarFooterDate>
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