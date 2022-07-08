import React, { useEffect, useState } from 'react'
import { CardList, Container, Header, HeaderContent, TotalCars, MyCarsButtom } from './styles'
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import CardCar from '../../components/CardCar'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import { Cars } from '../../model/cars'
import LoadAnimated from '../../components/LoadAnimated'


export default function Home() {
    const [cars, setCars] = useState<Cars[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { navigate }: NavigationProp<ParamListBase> = useNavigation()

    const handleChooseCar = (car: Cars) => {
        navigate('CardDatails', { car })
    }

    const handleMyCars = () => {
        navigate('MyCars')
    }

    useEffect(() => {
        const getCars = async () => {
            try{
                const response = await api.get('/cars')
                setCars(response.data)
            }catch(error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        }
        getCars()
    },[])

  return (
    <Container>
        <Header>
            <HeaderContent>
                <Logo width={RFValue(108)} height={RFValue(12)}/>
                {
                    !isLoading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                }
            </HeaderContent>
        </Header>
        {
            isLoading ? 
                <LoadAnimated/> 
                :
                <CardList
                    data={cars}
                    keyExtractor={item  => item.id}
                    renderItem={({ item }) => <CardCar data={item} onPress={() => handleChooseCar(item)}/>}
                />
        }
    </Container>
  )
}
