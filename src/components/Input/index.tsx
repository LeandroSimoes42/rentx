import { View, Text, TextInputProps } from 'react-native'
import React, { useState } from 'react'
import { Container, IconContainer, InputText } from './styles'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export default function Input({ iconName, value, ...rest }:Props) {
    const [focused, setFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const theme = useTheme()

    const handleIsFocused = () =>{
        setFocused(true)
    }

    const handleOnBlur = () =>{
        if(value && value?.length > 0){
            setIsFilled(true)
        }
        setFocused(false)
    }
    return (
        <Container>
            <IconContainer focused={focused}>
                <Feather  name={iconName} size={24} color={(focused || isFilled) ? theme.colors.main : theme.colors.text_detail}/>
            </IconContainer>
            <InputText focused={focused} onFocus={() => handleIsFocused()} onBlur={() => handleOnBlur()} {...rest}/>
        </Container>
    )
}