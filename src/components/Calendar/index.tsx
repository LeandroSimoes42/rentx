import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Calendar as CustomerCalendar, LocaleConfig, CalendarProps } from 'react-native-calendars'
import { useTheme } from 'styled-components'

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
      ],
      monthNamesShort: ['jan.', 'fev.', 'mar', 'abr', 'maio', 'jun', 'jul.', 'ago', 'set.', 'out.', 'nov.', 'dez.'],
      dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feria', 'sexta-feria', 'sabado'],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      today: "Hoje"
    };

LocaleConfig.defaultLocale = 'pt-br';

export interface DayProps{
    dateString:string;
    day:number;
    month:number;
    timestamp:number;
    year:number;
  }

export interface MarkedDatesProps {
    [date:string]:{
        color:string;
        textColor:string;
        disabled?:boolean;
        disableTouchEvent?:boolean;
    }
}

export default function Calendar({ markedDates, onDayPress }:CalendarProps) {
    const theme = useTheme()
    return (
      <CustomerCalendar 
        renderArrow={( diraction ) => 
            <Feather 
                name={diraction === 'left' ? 'chevron-left' : 'chevron-right'} 
                size={24} 
                color={theme.colors.text}
            />
        }
        headerStyle={{
            backgroundColor: theme.colors.background_secondary,
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.text_detail,
            paddingBottom: 10,
            marginBottom: 10,
        }}
        theme={{
            textDayFontFamily: theme.fonts.primary_400,
            textDayHeaderFontFamily: theme.fonts.primary_500,
            textDayHeaderFontSize: 10,
            textMonthFontFamily: theme.fonts.secondary_600,
            textMonthFontSize: 20,
            monthTextColor: theme.colors.title,
            arrowStyle:{
                marginHorizontal: -15,
            }
        }}

        firstDay={1} 
        minDate={new Date().toString()}
        markingType='period'
        markedDates={markedDates}
        onDayPress={onDayPress}
        />
    )
}