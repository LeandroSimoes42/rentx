import { View, Text, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Container, Form, FormTitle, Header, StepIndex, Steps, Subtitle, Title } from './styles'
import BackButton from '../../../components/BackButton'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import * as Yup from 'yup'

export default function FirstStepSignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cnh, setCnh] = useState('')
    const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation()

    const handleNext = async () => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatório'),
                email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
                cnh: Yup.string().required('CNH é obrigatória'),
            })
            const data = { name, email, cnh }
            await schema.validate(data)
            navigate('SecondStepSignUp', { user: data })
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
                            <StepIndex active={true}/>
                            <StepIndex active={false}/>
                        </Steps>
                    </Header>
                    <Title>Crie a sua{'\n'}conta</Title>
                    <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>
                    <Form>
                        <FormTitle>1. Dados</FormTitle>
                        <Input 
                            iconName='user' 
                            placeholder='Nome' 
                            autoCapitalize='none' 
                            autoCorrect={false}
                            onChangeText={setName}
                            value={name}
                        />
                        <Input 
                            iconName='mail' 
                            placeholder='E-mail' 
                            keyboardType='email-address' 
                            autoCorrect={false} 
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input 
                            iconName='credit-card' 
                            placeholder='CNH' 
                            autoCorrect={false} 
                            autoCapitalize='none'
                            keyboardType='numeric'
                            onChangeText={setCnh}
                            value={cnh}
                        />
                        <Button title='Proximo' onPress={() => handleNext()} />
                    </Form>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}