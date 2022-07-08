import { View, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native'
import React from 'react'
import { Container, Title } from './styles';
import { useTheme } from 'styled-components';

interface Props extends TouchableOpacityProps{
    title: string;
    color?: string
    disabled?: boolean;
    loading?: boolean;
    light?: boolean;
}

export default function Button(
  { 
    title, 
    color, 
    disabled = false, 
    loading = false, 
    light = false, 
    ...rest 
  }:Props) {

  const theme = useTheme()
  return (
    <Container color={color} disabled={disabled} style={{ opacity: (disabled || loading) ? 0.5 : 1}} {...rest}>
      {
        loading ? <ActivityIndicator color={theme.colors.shape}/> : <Title light={light}>{title}</Title>
      }
    </Container>
  )
}