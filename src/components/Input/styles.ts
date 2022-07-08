import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props{
    focused: boolean
}

export const Container = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
`

export const InputText = styled(TextInput)<Props>`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    padding: 0 23px;
    ${({ theme, focused }) => focused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `}
`

export const IconContainer = styled.View<Props>`
    width: 56px;
    height: 55px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    margin-right: 2px;
    ${({ theme, focused }) => focused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `}
`