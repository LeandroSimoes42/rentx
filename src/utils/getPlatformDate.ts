import React from 'react'
import { Platform } from 'react-native';
import { addDays } from 'date-fns';

export default function getPlatformDate(date: Date) {
    return addDays(date, 1)
}