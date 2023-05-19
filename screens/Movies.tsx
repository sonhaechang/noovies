import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from 'react-native';

import { BlurView } from 'expo-blur';

import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';

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

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;

const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: white;
`;

const Overview = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    margin-top: 10px;
`;

const Votes = styled(Overview)`
    font-size: 12px;
`;

type MoviesScreenProps = NativeStackScreenProps<any, 'Movies'>;

export default function Movies({ navigation: { navigate }}: MoviesScreenProps) {
    const isDark = useColorScheme() === 'dark';
    
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
                horizontal
                autoplay
                autoplayTimeout={3.5}
                showsButtons={false}
                showsPagination={false}
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
                            intensity={95}
                            tint={isDark ? 'dark' : 'light'}
                            style={StyleSheet.absoluteFill}
                        >
                            <Wrapper>
                                <Poster source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}} />
                                <Column>
                                    <Title>{movie.original_title}</Title>
                                    {
                                        movie.vote_average > 0 ? (
                                            <Votes>⭐️ {movie.vote_average}/10</Votes>
                                        ) : null
                                    }
                                    <Overview>{movie.overview.slice(0, 90)}...</Overview>                                
                                </Column>
                            </Wrapper>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </Container>
    );
}