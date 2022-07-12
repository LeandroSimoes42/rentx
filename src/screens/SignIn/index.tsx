import { View, Text, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container, Footer, Form, Header, Subtitle, Title } from './styles'
import Button from '../../components/Button'
import { useTheme } from 'styled-components'
import Input from '../../components/Input'
import InputPassword from '../../components/InputPass'
import * as Yup from 'yup'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const theme = useTheme()
    const { signIn } = useAuth()
    const { navigate }: NavigationProp<ParamListBase> = useNavigation()

    const handleLogin = async () => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
                password: Yup.string().required('Senha é obrigatória')
            })

            await schema.validate({ email, password })
            signIn({ email, password })
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message)
            }else{
                Alert.alert('Opa', 'Erro na autenticação, tente novamente!')
            }
        }
    }



    const newAccount = () => {
        navigate('FirstStepSignUp')
    }
    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent/>
                    <Header>
                        <Title>
                            Estamos{'\n'}quase lá
                        </Title>
                        <Subtitle>Faça seu login para começar{'\n'}uma experiência incrível</Subtitle>
                    </Header>
                    <Form>
                        <Input 
                            iconName='mail' 
                            placeholder='E-mail' 
                            keyboardType='email-address' 
                            autoCorrect={false} 
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />
                        <InputPassword 
                            iconName='lock' 
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>
                    <Footer>
                        <Button title='Login' onPress={() => handleLogin()} disabled={!email || !password && true}/>
                        <Button title='Criar conta gratuita' onPress={() => newAccount()} color={theme.colors.background_secondary} light/>
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}