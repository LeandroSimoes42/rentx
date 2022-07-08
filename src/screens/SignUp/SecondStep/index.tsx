import { View, Text, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Container, Form, FormTitle, Header, StepIndex, Steps, Subtitle, Title } from './styles'
import BackButton from '../../../components/BackButton'
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import InputPassword from '../../../components/InputPass'
import { useTheme } from 'styled-components'
import * as Yup from 'yup'
import api from '../../../services/api'


interface Params {
    user: {
        name: string;
        email: string;
        cnh: string
    }
}

export default function SecondStepSignUp() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation()
    const route = useRoute()
    const { user } = route.params as Params
    const theme = useTheme()

    const handleRegistration = async () => {
        try {
            const schema = Yup.object().shape({
                password: Yup.string().required('Senha é obrigatória'),
                confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Senhas tem que ser Iguais')
            })
            await schema.validate({ password, confirmPassword })
            await api.post('/users', {
                name: user.name,
                email: user.email,
                driver_license: user.cnh,
                password
            }).then(() => {
                navigate('Confirmation', {
                    nextPage: 'SignIn',
                    title: 'Conta criada!',
                    message: `Agora é so fazer login\ne aproveitar`,
                })
            }).catch(() => {
                Alert.alert('Opa', 'Não foi possível fazer o cadastro, tente novamente')
            })
            
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                return Alert.alert('Opa', error.message)
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent/>
                    <Header>
                        <BackButton onPress={() => goBack()}/>
                        <Steps>
                            <StepIndex active={false}/>
                            <StepIndex active={true}/>
                        </Steps>
                    </Header>
                    <Title>Crie a sua{'\n'}conta</Title>
                    <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>
                    <Form>
                        <FormTitle>02. Senha</FormTitle>
                        <InputPassword 
                            iconName='lock' 
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                        <InputPassword 
                            iconName='lock' 
                            placeholder='Repetir Senha'
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                        />
                        <Button title='Cadastrar' color={theme.colors.success} onPress={() => handleRegistration()} />
                    </Form>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}