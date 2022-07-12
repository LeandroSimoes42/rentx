import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { 
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    ContentHeader,
    Option,
    OptionTitle,
    Section,
} from './styles'
import BackButton from '../../components/BackButton'
import { useTheme } from 'styled-components'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import Input from '../../components/Input'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import InputPassword from '../../components/InputPass'
import { useAuth } from '../../hooks/auth'
import * as ImagePicker from 'expo-image-picker';
import Button from '../../components/Button'
import * as Yup from 'yup'
import { useNetInfo } from '@react-native-community/netinfo'

export default function Profile() {
    const { user, signOut, updateUser } = useAuth()
    const [avatar, setAvatar] = useState(user.avatar)
    const [name, setName] = useState(user.name)
    const [driverLicense, setDriverLicense] = useState(user.driver_license)
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const { goBack }: NavigationProp<ParamListBase> = useNavigation()
    const theme = useTheme()
    const netInfo = useNetInfo()

    const handleSingOut = () => {

    }

    const HandleChangeEdit = (edit: 'dataEdit' | 'passwordEdit') => {
        if(netInfo.isConnected === false && edit === 'passwordEdit'){
            Alert.alert('Você está Offline', 'conecte-se a internet para mudar a senha')
        }else{
            setOption(edit)
        }
    }

    const handleSelectAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        })

        if (result.cancelled) {
            return
        }
        setAvatar(result.uri)
    }

    const handleSignOut = () => {
        Alert.alert(
            'Tem certeza?',
            'Ao sair irá precisar de internet para se conectar',
            [
                {
                    text: 'Cancelar',
                    onPress: () => {}
                },
                {
                    text: 'Sair',
                    onPress: () => signOut()
                }
            ]
        )
    }

    const handleUpdate = async () => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('nome é obrigatório'),
                driverLicense: Yup.string().required('CNH é obrigatória')
            })
            const data = { name, driverLicense }
            await schema.validate(data)
            await updateUser({
                id: user.id,
                user_id: user.user_id,
                name,
                avatar,
                email: user.email,
                token: user.token,
                driver_license: driverLicense,                
            })
            Alert.alert('Usuário atualizado!')
            
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message)
            }else{
                Alert.alert('Opa', 'Erro na atualização, tente novamente!')
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton onPress={() => goBack()} color={theme.colors.shape}/>
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={handleSingOut}>
                                <Feather name='power' size={24} color={theme.colors.shape} onPress={handleSignOut}/>
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            { !!avatar && <Photo source={{ uri: avatar }}/>}
                            <PhotoButton onPress={handleSelectAvatar}>
                                <Feather name='camera' size={24} color={theme.colors.shape}/>
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>
                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <ContentHeader>
                            <Option active={option === 'dataEdit'} onPress={() => HandleChangeEdit('dataEdit')}>
                                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                            </Option>
                            <Option active={option === 'passwordEdit'} onPress={() => HandleChangeEdit('passwordEdit')}>
                                <OptionTitle active={option === 'passwordEdit'}>Trocar Senha</OptionTitle>
                            </Option>
                        </ContentHeader>
                        { option === 'dataEdit' ?
                            <Section>
                                <Input 
                                    iconName='user' 
                                    placeholder='Nome' 
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                    onChangeText={setName}
                                    value={name}
                                />
                                <Input 
                                    iconName='mail'
                                    editable={false}
                                    defaultValue={user.email}
                                />
                                <Input 
                                    iconName='credit-card' 
                                    placeholder='CNH' 
                                    keyboardType='numeric'
                                    defaultValue={user.driver_license}
                                    onChangeText={setDriverLicense}
                                    value={driverLicense}
                                />
                            </Section>
                            :
                            <Section>
                                <InputPassword 
                                    iconName='lock' 
                                    placeholder='Senha Atual'
                                />
                                <InputPassword 
                                    iconName='lock' 
                                    placeholder='Senha'
                                />
                                <InputPassword 
                                    iconName='lock' 
                                    placeholder='Repetir Senha'
                                />
                            </Section>
                        }
                        <Button
                            title='Salvar alterações'
                            onPress={handleUpdate}
                        /> 
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}