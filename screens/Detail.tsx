
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';

import styled from 'styled-components/native';

import { useQuery } from '@tanstack/react-query';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { LinearGradient } from 'expo-linear-gradient';

import { Movie, TV, moviesApi, tvApi } from '../api';
import { makeImgPath } from '../utils';
import { colors } from '../colors';
import Poster from '../components/Poster';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView<{ isDark: boolean }>`
    background-color: ${(props) => (props.isDark ? props.theme.mainBgColor : 'white')};
`;

const Header = styled.View`
    height: ${SCREEN_HEIGHT/4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
    flex-direction: row;
    width: 75%;
`;

const Title = styled.Text`
    color: white;
    font-size: 32px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: 500;
`;

const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    margin-top: 20px;
    padding: 0px 20px;
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

    const { isInitialLoading: moviesLoading, data: moviesData, } = useQuery({
        queryKey: ['movies', params.id], 
        queryFn: moviesApi.getDetail,
        enabled: 'original_title' in params,
    });

    const { isInitialLoading: tvLoading, data: tvData, } = useQuery({
        queryKey: ['movies', params.id], 
        queryFn: tvApi.getDetail,
        enabled: 'original_name' in params,
    });

    useEffect(() => {
        setOptions({
            title: 'original_title' in params ? 'Movie' : 'TV Show',
        })
    }, []);

    return (
        <Container isDark={isDark}>
            <Header>
                <Background 
                    source={{ uri: makeImgPath(params.backdrop_path || '') }} 
                    style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                    colors={['transparent', colors.dark]}
                    style={StyleSheet.absoluteFill}
                />
                <Column>
                    <Poster path={params.poster_path || ''} />
                    <Title>
                        {
                            'original_title' in params ?
                            params.original_title : 
                            params.original_name
                        }
                    </Title>
                </Column>
            </Header>
            <Overview>
                {params.overview}
            </Overview>
        </Container>
    );
}