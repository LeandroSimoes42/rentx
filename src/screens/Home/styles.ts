import { FlatList, FlatListProps, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Cars } from "../../model/cars";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    justify-content: flex-end;
    background-color:  ${({ theme }) => theme.colors.header};
    padding: 32px 24px;

`

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`

export const CardList = styled(FlatList as new (props: FlatListProps<Cars>) => FlatList<Cars>).attrs({
    contentContainerStyle: {
        padding: 24,
    },
    showsVerticalScrollIndicator: false
})``

export const MyCarsButtom = styled(TouchableOpacity)`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.main};
    bottom: 13px;
    right: 22px;
`