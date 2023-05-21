
import React, { useEffect } from 'react';
import { Text, View, useColorScheme } from 'react-native';

import styled from 'styled-components/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Movie, TV } from '../api';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';


const Container = styled.ScrollView<{ isDark: boolean }>`
    background-color: ${(props) => (props.isDark ? props.theme.mainBgColor : 'white')};
`;

type RootStackParamList = {
    Detail: Movie | TV;
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({ 
    navigation: { setOptions },
    route: { params,}, 
}: DetailScreenProps): JSX.Element {
    const isDark = useColorScheme() === 'dark';

    useEffect(() => {
        setOptions({
            title: 'original_title' in params ?
            params.original_title : 
            params.original_name,
        })
    }, []);

    return (
        <Container isDark={isDark}>
            <Poster path={params.poster_path || ''} />
        </Container>
    );
}