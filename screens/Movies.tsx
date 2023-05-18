import React from 'react';
import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

import Swiper from 'react-native-web-swiper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TMDB_API_KEY } from '@env';


const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
    flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type MoviesScreenProps = NativeStackScreenProps<any, 'Movies'>;

export default function Movies({ navigation: { navigate }}: MoviesScreenProps) {
    const getNowPlaying = () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`;
        fetch(url);
    }

    return (
        <Container>
            <Swiper 
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{ 
                    width: '100%', 
                    height: SCREEN_HEIGHT / 4 
                }}
            >
                <View style={{ backgroundColor: 'red' }}></View>
                <View style={{ backgroundColor: 'blue' }}></View>
                <View style={{ backgroundColor: 'red' }}></View>
                <View style={{ backgroundColor: 'blue' }}></View>
            </Swiper>
        </Container>
    );
}