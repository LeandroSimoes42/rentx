import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
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
  AcessoriesContainer,
  Footer,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  CalenderIcon,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'
import BackButton from '../../components/BackButton'
import ImageSlider from '../../components/ImageSlider'
import Acessory from '../../components/Acessory'
import { Feather } from '@expo/vector-icons'
import Button from '../../components/Button'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { Cars } from '../../model/cars'
import getAcessories from '../../utils/getAcessories'
import getPlatformDate from '../../utils/getPlatformDate'
import { format } from 'date-fns'
import api from '../../services/api'


interface Params {
  car: Cars,
  dates: string[];
}

interface RentPeriod{
  start: string;
  end: string;
}

export default function SchedulingDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [rentPeriod, setRentPeriod] = useState<RentPeriod>({} as RentPeriod)
  const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation()
  const route = useRoute()
  const { car, dates } = route.params as Params;
  const rentTotal = dates.length * car.rent.price
  const theme = useTheme()

  const handleConfirmSchedule = async () => {
    setIsLoading(true)
    const response = await api.get(`/schedules_bycars/${car.id}`)
    const datesUnavailable = response.data.unavailable_dates ? response.data.unavailable_dates : []
    const unvailable_dates = [
      ...datesUnavailable,
      ...dates
    ]
    try {
      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unvailable_dates
      })
      await api.post(`/schedules_byuser`, {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
      })
      setIsLoading(false)
      navigate('Confirmation', {
        nextPage: 'Home',
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX`,
      })
    } catch (error) {
      setIsLoading(false)
      Alert.alert('Erro ao cadastrar o agendamento. Tente novamente!')
    }
  }

  useEffect(() => {
    setRentPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])
  
  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}/>
      </Header>
      <CardImages>
        <ImageSlider imageUrl={car.photos}/>
      </CardImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <AcessoriesContainer>
        {
            car.accessories.map((acessory, index) => (
              <Acessory name={acessory.name} icon={getAcessories(acessory.type)} key={index}/>
            ))
        }
        </AcessoriesContainer>
        <RentalPeriod>
          <CalenderIcon>
            <Feather name='calendar' size={RFValue(24)} color={theme.colors.shape}/>
          </CalenderIcon>
            <DateInfo>
                <DateTitle>DE</DateTitle>
                <DateValue>{rentPeriod.start}</DateValue>
            </DateInfo>
            <Feather name='chevron-right' size={RFValue(10)} color={theme.colors.text}/>
            <DateInfo>
                <DateTitle>ATE</DateTitle>
                <DateValue>{rentPeriod.end}</DateValue>
            </DateInfo>
          </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button title='Alugar agora' color={theme.colors.success} onPress={() => handleConfirmSchedule()} loading={isLoading} disabled={isLoading}/>
      </Footer>
    </Container>
  )
}