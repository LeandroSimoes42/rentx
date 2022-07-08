import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};

`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    margin-top: ${getStatusBarHeight() + 18}px;
    margin-left: 24px;
`

export const CardImages = styled.View`
    margin-top: ${getStatusBarHeight() + 32}px;
`

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: "center",
        padding: 24
    },
    showsVerticalScrollIndicator: false,
})``

export const Details = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 38px;

`


export const Description = styled.View``



export const Brand = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
    color: ${({ theme }) => theme.colors.text_detail};
    text-transform: uppercase;
`


export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(25)}px;
    color: ${({ theme }) => theme.colors.title};
`

export const Rent = styled.View`
    margin-right: 24px;
`


export const Period = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
    color: ${({ theme }) => theme.colors.text_detail};
    text-transform: uppercase;
`


export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(25)}px;
    color: ${({ theme }) => theme.colors.main};

`

export const About = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text};
    text-align: justify;
    margin-top: 23px;
    line-height: ${RFValue(25)}px;;

`

export const AcessoriesContainer = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

`

export const Footer = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background_primary};
    padding: 24px;
    padding-bottom: ${getBottomSpace() + 24}px;
`