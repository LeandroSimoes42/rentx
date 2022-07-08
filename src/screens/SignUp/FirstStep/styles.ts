import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props{
    active: boolean;
}

export const Container = styled.View`
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${getStatusBarHeight() + 31}px;
`

export const StepIndex = styled.View<Props>`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-left: 8px;
    background-color: ${({ theme, active }) => active ? theme.colors.title : theme.colors.shape};
`

export const Steps= styled.View`
    flex-direction: row;
    align-items: center;
`

export const Title = styled.Text`
    font-size: ${RFValue(40)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-top: ${RFValue(60)}px;
`

export const Subtitle = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${RFValue(25)}px;
    margin-top: ${RFValue(16)}px;
`

export const Form = styled.View`
    width: 100%;
    margin-top: 64px;
    margin-bottom: 16px;
`

export const FormTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-bottom: ${RFValue(24)}px;
`