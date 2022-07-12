import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

interface Props{
    active: boolean;
}

export const Container = styled.View`
    width: 100%;
`
export const ImageIndexes = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 24px;

`
export const ImageIndex = styled.View<Props>`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-left: 8px;
    background-color: ${({ theme, active }) => active ? theme.colors.title : theme.colors.shape};

`
export const ImageWrapper = styled.View`
    width: ${Dimensions.get("window").width}px;
    height: 132px;
    justify-content: center;
    align-items: center;

`
export const CardImage = styled(FastImage)`
    width: 280px;
    height: 132px;
`