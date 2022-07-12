import { TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props{
    active: boolean
}

export const Container = styled.View`
`

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(250)}px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.header};
    padding: 0 24px;
`

export const HeaderTop = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${getStatusBarHeight() + 32}px;
`

export const HeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(25)}px;
    color: ${({ theme }) => theme.colors.background_secondary};
`


export const LogoutButton = styled(TouchableOpacity)``


export const PhotoContainer = styled.View`
    width: 180px;
    height: 180px;
    border-radius: 90px;
    background-color: ${({ theme }) => theme.colors.shape};
    margin-top: 80px;
`


export const Photo = styled.Image`
    width: 180px;
    height: 180px;
    border-radius: 90px;
`

export const PhotoButton = styled(TouchableOpacity)`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.main};
    position: absolute;
    bottom: 10px;
    right: 10px;

`

export const Content = styled.View`
    padding: 0 24px;
    margin-top: 122px;
`


export const ContentHeader = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.line};
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 24px;

`
export const Option = styled(TouchableOpacity)<Props>`
    padding-bottom: 14px;
    ${({ theme, active }) => active && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `}
`


export const OptionTitle = styled.Text<Props>`
    font-family: ${({ theme, active }) => active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
    font-size: ${RFValue(20)}px;
    color: ${({ theme, active }) => active ? theme.colors.header : theme.colors.text_detail};

`

export const Section = styled.View`

`
