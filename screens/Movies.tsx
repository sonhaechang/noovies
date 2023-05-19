import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';

import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TMDB_API_KEY } from '@env';
import Slide from '../components/Slide';


const Container = styled.ScrollView``;

const Loader = styled.ActivityIndicator`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type MoviesScreenProps = NativeStackScreenProps<any, 'Movies'>;

export default function Movies({ navigation: { navigate }}: MoviesScreenProps): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const [nowPlaying, setNowPlaying] = useState<any>([]);
    const [upcommig, setUpcommig] = useState<any>([]);
    const [trending, setTrending] = useState<any>([]);

    const getNowPlaying = async () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`;
        const {results} = await (await fetch(url)).json();

        setNowPlaying(results);
    }

    const getUpcommig = async () => {
        const url = `https://api.themoviedb.org/3/movie/upcommig?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`;
        const {results} = await (await fetch(url)).json();

        setUpcommig(results);
    }

    const getTrending = async () => {
        const url = `https://api.themoviedb.org/3/trending/movie/week/?api_key=${TMDB_API_KEY}`;
        const {results} = await (await fetch(url)).json();

        setTrending(results);
    }

    const getData = async () => {
        await Promise.all([
            getNowPlaying(), 
            getUpcommig(),
            getTrending(),
        ])
        
        setLoading(false);
    }

    useEffect(() => {
        getData();
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
                    <Slide 
                        key={movie.id} 
                        backdropPath={movie.backdrop_path}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average}
                        overview={movie.overview}
                    />
                ))}
            </Swiper>
        </Container>
    );
}