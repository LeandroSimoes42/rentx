import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 109px;
    height: 92px;
    justify-content: center;
    align-items: center;

    background-color: ${({theme}) => theme.colors.background_primary};

    padding: 16px 10px;
    margin-bottom: 8px;
`

export const Name = styled.Text`
    width: 100%;
    text-align:center;
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(13)}px;
    color: ${({ theme }) => theme.colors.text};
`