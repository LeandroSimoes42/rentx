import React from 'react'
import { 
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CardImage,
} from './styles'
import Gasoline from '../../assets/gasoline.svg'
import { TouchableOpacityProps } from 'react-native';
import { Cars } from '../../database/model/car';
import getAcessories from '../../utils/getAcessories';
import { useNetInfo } from '@react-native-community/netinfo';

interface Props extends TouchableOpacityProps{
    data: Cars
}

export default function CardCar({ data, ...rest }:Props) {
    const netInfo = useNetInfo()
    const MotorIcon = getAcessories(data.fuel_type)
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? data.price : "..."}</Price>
                    </Rent>
                    <Type>
                        <MotorIcon/>
                    </Type>
                </About>
            </Details>
            <CardImage source={{ uri: data.thumbnail }} resizeMode='contain'/>
        </Container>
    )
}