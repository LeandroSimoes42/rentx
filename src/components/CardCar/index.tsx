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
import { Cars } from '../../model/cars';
import getAcessories from '../../utils/getAcessories';

interface Props extends TouchableOpacityProps{
    data: Cars
}

export default function CardCar({ data, ...rest }:Props) {
    const MotorIcon = getAcessories(data.fuel_type)
  return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>
            <About>
                <Rent>
                    <Period>{data.period}</Period>
                    <Price>R$ {data.price}</Price>
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