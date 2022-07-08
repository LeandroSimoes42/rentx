import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { 
        Container, 
        Header, 
        Title,
        RentalPeriod,
        DateInfo,
        DateTitle,
        DateValue,
        Content,
        Footer
    } from './styles'
import { useTheme } from 'styled-components'
import ArrowSvg from '../../assets/arrow.svg'
import Button from '../../components/Button'
import Calendar, { DayProps, MarkedDatesProps } from '../../components/Calendar'
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import generateInteval from '../../components/Calendar/generateInteval'
import { format } from 'date-fns'
import getPlatformDate from '../../utils/getPlatformDate'
import { Cars } from '../../model/cars'

interface RentPeriod{
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface Params {
  car: Cars
}

export default function Schedules() {
  const [lastDateSelected, setLastDateSelected] = useState({} as DayProps)
  const [rentPeriod, setRentPeriod] = useState<RentPeriod>({} as RentPeriod)
  const [markedDate, setMarkedDate] = useState({} as MarkedDatesProps)
  const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params;
  const theme = useTheme()


  const handleChooseSchedule = () => {
      navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDate)
      })
  }

  const handleChangeDate = (day: DayProps) => {
    let start = !lastDateSelected.timestamp ? day : lastDateSelected;
    let end = day

    if(start.timestamp > end.timestamp){
      start = end;
      end = start
    }
    setLastDateSelected(end)
    let interval = generateInteval(start, end)
    setMarkedDate(interval)
    const startDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]
    setRentPeriod({
      start: start.timestamp,
      startFormatted: format(getPlatformDate(new Date(startDate)), 'dd/MM/yyyy'),
      end: end.timestamp,
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }
  return (
    <Container>
      <Header>
          <BackButton onPress={() => goBack()} color={theme.colors.shape}/>
          <Title>
            Escolha uma{'\n'}
            data de início e{'\n'}
            fim do aluguel{'\n'}
          </Title>
          <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={!!rentPeriod.startFormatted}>{rentPeriod.startFormatted}</DateValue>
                </DateInfo>
                <ArrowSvg/>
                <DateInfo>
                    <DateTitle>ATE</DateTitle>
                    <DateValue selected={!!rentPeriod.endFormatted}>{rentPeriod.endFormatted}</DateValue>
                </DateInfo>
          </RentalPeriod>
      </Header>
      <Content>
        <Calendar onDayPress={handleChangeDate} markedDates={markedDate}/>
      </Content>
      <Footer>
        <Button title='Confirmar' onPress={() => handleChooseSchedule()} disabled={!rentPeriod.startFormatted}/>
      </Footer>
    </Container>
  )
}