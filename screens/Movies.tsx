import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';

import { BlurView } from 'expo-blur';

import styled from 'styled-components/native';

import Swiper from 'react-native-web-swiper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TMDB_API_KEY } from '@env';


const Container = styled.ScrollView``;

const Loader = styled.ActivityIndicator`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const View = styled.View`flex: 1;`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BgImg = styled.Image``;

const Title = styled.Text``;

type MoviesScreenProps = NativeStackScreenProps<any, 'Movies'>;

export default function Movies({ navigation: { navigate }}: MoviesScreenProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [nowPlaying, setNowPlaying] = useState<any>([]);

    const getNowPlaying = async () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`;
        const {results} = await (await fetch(url)).json();

        setNowPlaying(results);
        setLoading(false);
    }

    useEffect(() => {
        getNowPlaying();
    }, [])

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
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
                
                {nowPlaying.map((movie: any) => (
                    <View key={movie.id}>
                        <BgImg 
                            source={{uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}} 
                            style={StyleSheet.absoluteFill} 
                        />
                        <BlurView 
                            intensity={10}
                            style={StyleSheet.absoluteFill}
                        >
                            <Title>{movie.original_title}</Title>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </Container>
    );
}