import React from 'react';
import { Dimensions, FlatList, useColorScheme } from 'react-native';

import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useQuery, useQueryClient } from '@tanstack/react-query'

import Slide from '../components/Slide';
import HMedia from '../navigation/HMidia';
import VMedia from '../navigation/VMedia';
import { Movie, MovieResponse, moviesApi } from '../api';
import Loader from '../components/Loader';


const ListTitle = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
`;

const TrendingScroll = styled(FlatList<Movie>)`
    margin-top: 20px;
`;

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`

const VSeperator = styled.View`
    width: 20px;
`;

const HSeperator = styled.View`
    height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type MoviesScreenProps = NativeStackScreenProps<any, 'Movies'>;

export default function Movies({ navigation: { navigate }}: MoviesScreenProps): JSX.Element {
    const isDark = useColorScheme() === 'dark';
    const queryClient = useQueryClient();

    const { 
        isInitialLoading: nowPlayingLoading, 
        data: nowPlayingData, 
        isRefetching: isRefetchingNowPlaying
    } = useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.getNowPlaying);

    const { 
        isInitialLoading: upcomingLoading, 
        data: upcomingData,
        isRefetching: isRefetchingUpcoming
    } = useQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.getUpcommig);
    
    const { 
        isInitialLoading: trendingLoading, 
        data: trendingData,
        isRefetching: refetchingTrending
    } = useQuery<MovieResponse>(['movies', 'trending'], moviesApi.getTrending);

    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || refetchingTrending;

    const onRefresh = async () => {
        queryClient.refetchQueries(['movies']);
    };

    const renderVMedia = ({ item }: {item: Movie}) => (
        <VMedia
            posterPath={item.poster_path || ''}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
            isDark={isDark}
        />
    );

    const renderHMedia = ({ item }: {item: Movie}) => (
        <HMedia
            posterPath={item.poster_path || ''}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            isDark={isDark}
        />
    );

    return loading ? (
        <Loader />
    ) : upcomingData ? (
        <FlatList 
            onRefresh={onRefresh}
            refreshing={refreshing}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <>
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
                        
                        {nowPlayingData?.results?.map((movie: any) => (
                            <Slide 
                                key={movie.id} 
                                backdropPath={movie.backdrop_path}
                                posterPath={movie.poster_path}
                                originalTitle={movie.original_title}
                                voteAverage={movie.vote_average}
                                overview={movie.overview}
                                isDark={isDark}
                            />
                        ))}
                    </Swiper>

                    <ListContainer>
                        <ListTitle isDark={isDark}>Tranding Movies</ListTitle>
                        { 
                            trendingData ? (
                                <TrendingScroll 
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 20 }}
                                    ItemSeparatorComponent={VSeperator}
                                    data={trendingData.results}
                                    keyExtractor={(item) => String(item.id)}
                                    renderItem={renderVMedia}
                                />
                            ) : null
                        }
                    </ListContainer>

                    <ComingSoonTitle isDark={isDark}>Cooming soon</ComingSoonTitle>
                </>
            }
            ItemSeparatorComponent={HSeperator}
            data={upcomingData.results}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderHMedia}
        />
    ) : <></>;
}