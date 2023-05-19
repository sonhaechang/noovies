import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl, useColorScheme } from 'react-native';

import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TMDB_API_KEY } from '@env';
import Slide from '../components/Slide';
import Poster from '../components/Poster';


const Container = styled.ScrollView``;

const Loader = styled.ActivityIndicator`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
`;

const TrendingScroll = styled.ScrollView`
    margin-top: 20px;

`;

const Movie = styled.View`
    margin-right: 20px;
    align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;

const Votes = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.8)')};
    font-size: 10px;
`;

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`

const HMovie = styled.View`
    flex-direction: row;
    padding: 0px 30px;
    margin-bottom: 30px;
`;

const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;

const Overview = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.8)')};
    width: 80%;
`;

const Release = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.8)')};
    font-size: 12px;
    margin-vertical: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type MoviesScreenProps = NativeStackScreenProps<any, 'Movies'>;

export default function Movies({ navigation: { navigate }}: MoviesScreenProps): JSX.Element {
    const isDark = useColorScheme() === 'dark';

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [nowPlaying, setNowPlaying] = useState<any>([]);
    const [upcomig, setUpcomig] = useState<any>([]);
    const [trending, setTrending] = useState<any>([]);

    const getNowPlaying = async () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`;
        const {results} = await (await fetch(url)).json();

        setNowPlaying(results);
    }

    const getUpcommig = async () => {
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=KR`;
        const {results} = await (await fetch(url)).json();

        setUpcomig(results);
    }

    const getTrending = async () => {
        const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`;
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

    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };

    useEffect(() => {
        getData();
    }, [])

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing} 
                    onRefresh={onRefresh}
                />
            }
        >
            <Swiper 
                loop
                horizontal
                autoplay
                autoplayTimeout={3.5}
                showsButtons={false}
                showsPagination={false}
                containerStyle={{ 
                    width: '100%', 
                    height: SCREEN_HEIGHT / 4,
                    marginBottom: 30
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

            <ListContainer>
                <ListTitle isDark={isDark}>Tranding Movies</ListTitle>

                <TrendingScroll 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 30 }}
                >
                    {trending.map((movie: any) => (
                        <Movie key={movie.id}>
                            <Poster path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />

                            <Title isDark={isDark}>
                                {movie.original_title.slice(0, 13)}
                                {movie.original_title.length > 13 ? '...' : null}
                            </Title>

                            <Votes isDark={isDark}>
                                {
                                    movie.vote_average > 0 ?
                                    `⭐️ ${movie.vote_average}/10` : 
                                    'Coming soon'
                                }
                             </Votes>
                        </Movie>
                    ))}
                </TrendingScroll>
            </ListContainer>

            <ListContainer>
                <ComingSoonTitle isDark={isDark}>Cooming soon</ComingSoonTitle>

                {upcomig.map((movie: any) => (
                    <HMovie key={movie.id}>
                        <Poster path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        <HColumn>
                            <Title isDark={isDark}>
                                {
                                    movie.original_title !== '' && movie.original_title.length > 25 ? 
                                    `${movie.original_title.slice(0, 25)}...` : 
                                    movie.original_title
                                }
                            </Title>

                            <Release isDark={isDark}>
                                {new Date(movie.release_date).toLocaleDateString('ko')}
                            </Release>

                            <Overview isDark={isDark}>
                                {
                                    movie.overview !== '' && movie.overview.length > 130 ? 
                                    `${movie.overview.slice(0, 130)}...` : 
                                    movie.overview
                                }
                            </Overview>
                        </HColumn>
                    </HMovie>
                ))}
            </ListContainer>
        </Container>
    );
}