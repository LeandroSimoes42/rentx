import React from 'react'
import { DayProps, MarkedDatesProps } from '.';
import { eachDayOfInterval, format } from 'date-fns';
import getPlatformDate from '../../utils/getPlatformDate';
import theme from '../../theme/theme';

export default function generateInteval(start: DayProps, end: DayProps) {
    let interval: MarkedDatesProps = {}
    eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp) })
    .forEach((item)=>{
        const date = format(getPlatformDate(item),'yyyy-MM-dd')
 
        interval = {
            ...interval,
            [date]:{
                color:start.dateString===date||end.dateString===date
                ? theme.colors.main: theme.colors.main_light,
 
                textColor:start.dateString===date||end.dateString===date
                ? theme.colors.main_light: theme.colors.main,
            }
        }
    })
 
 
    return interval
}