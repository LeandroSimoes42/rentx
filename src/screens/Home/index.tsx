import React, { useEffect, useState } from 'react'
import { CardList, Container, Header, HeaderContent, TotalCars, MyCarsButtom } from './styles'
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import CardCar from '../../components/CardCar'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import { Cars } from '../../model/cars'
import LoadAnimated from '../../components/LoadAnimated'
import { useNetInfo } from '@react-native-community/netinfo'
import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../../database'
import { Cars as ModelCars } from '../../database/model/car'

export default function Home() {
    const netInfo = useNetInfo()
    const [cars, setCars] = useState<ModelCars[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { navigate }: NavigationProp<ParamListBase> = useNavigation()

    const handleChooseCar = (car: Cars) => {
        navigate('CardDatails', { car })
    }

    const offlineSynchronize = async () => {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
                const { changes, latestVersion } = response.data
                return {changes, timestamp: latestVersion}
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users
                await api.post('/users/sync', user)
            } 

        })
    }

    useEffect(() => {
        let isMounted = true
        const getCars = async () => {
            try{
                const carsCollection = await database.get<ModelCars>('cars')
                const cars = await carsCollection.query().fetch()
                if(isMounted){
                    setCars(cars)
                }

            }catch(error){
                console.error(error)
            }finally{
                if(isMounted){
                    setIsLoading(false)
                }
            }
        }
        getCars()
        return () => {
            isMounted = false
        }
    },[])

    useEffect(() => {
        if(netInfo.isConnected === true){
            offlineSynchronize()
        }
    },[netInfo.isConnected])
    

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
