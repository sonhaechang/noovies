import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, useColorScheme } from 'react-native';

import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useQuery, useQueryClient } from '@tanstack/react-query'

import Slide from '../components/Slide';
import HMedia from '../navigation/HMidia';
import VMedia from '../navigation/VMedia';
import { moviesApi } from '../api';


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

const TrendingScroll = styled.FlatList`
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
    } = useQuery(['movies', 'nowPlaying'], moviesApi.getNowPlaying);

    const { 
        isInitialLoading: upcomingLoading, 
        data: upcomingData,
        isRefetching: isRefetchingUpcoming
    } = useQuery(['movies', 'upcoming'], moviesApi.getUpcommig);
    
    const { 
        isInitialLoading: trendingLoading, 
        data: trendingData,
        isRefetching: refetchingTrending
    } = useQuery(['movies', 'trending'], moviesApi.getTrending);

    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || refetchingTrending;

    const onRefresh = async () => {
        queryClient.refetchQueries(['movies']);
    };

    const renderVMedia = ({ item }) => (
        <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
            isDark={isDark}
        />
    );

    const renderHMedia = ({ item }) => (
        <HMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            isDark={isDark}
        />
    );

    const movieKeyExtractor = (item) => String(item.id);

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
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

                        <TrendingScroll 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            ItemSeparatorComponent={<VSeperator />}
                            data={trendingData?.results}
                            keyExtractor={movieKeyExtractor}
                            renderItem={renderVMedia}
                        />
                    </ListContainer>

                    <ComingSoonTitle isDark={isDark}>Cooming soon</ComingSoonTitle>
                </>
            }
            ItemSeparatorComponent={<HSeperator />}
            data={upcomingData?.results}
            keyExtractor={movieKeyExtractor}
            renderItem={(item) => renderHMedia(item)}
        />
    );
}