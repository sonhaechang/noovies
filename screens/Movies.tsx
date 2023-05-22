import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, useColorScheme } from 'react-native';

import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'

import Slide from '../components/Slide';
import HMedia from '../components/HMidia';
import { Movie, MovieResponse, moviesApi } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';


const ListTitle = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`

const HSeperator = styled.View`
    height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type MoviesScreenProps = NativeStackScreenProps<any, 'Movies'>;

export default function Movies({ navigation: { navigate }}: MoviesScreenProps): JSX.Element {
    const isDark = useColorScheme() === 'dark';
    const queryClient = useQueryClient();

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const { 
        isInitialLoading: nowPlayingLoading, 
        data: nowPlayingData
    } = useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.getNowPlaying);

    const { 
        isInitialLoading: upcomingLoading, 
        data: upcomingData,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery<MovieResponse>({
        queryKey: ['movies', 'upcoming'], 
        queryFn: moviesApi.getUpcoming,
        getNextPageParam: (currentPage) => {
            const  nextPage = currentPage.page + 1;
            return nextPage > currentPage.total_pages ? null : nextPage;
        },
    });
    
    const { 
        isInitialLoading: trendingLoading, 
        data: trendingData
    } = useQuery<MovieResponse>(['movies', 'trending'], moviesApi.getTrending);

    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(['movies']);
        setRefreshing(false);
    };

    const loadMore = () => {
        if (hasNextPage) { fetchNextPage(); }
    };

    const renderHMedia = ({ item }: {item: Movie}) => (
        <HMedia
            posterPath={item.poster_path || ''}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
            isDark={isDark}
        />
    );

    return loading ? (
        <Loader />
    ) : upcomingData ? (
        <FlatList 
            onEndReached={loadMore}
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
                                fullData={movie}
                                isDark={isDark}
                            />
                        ))}
                    </Swiper>

                    {
                        trendingData ? (
                            <HList title='Tranding Movies' data={trendingData.results} isDark={isDark}/>
                        ) : <></>
                    }

                    <ComingSoonTitle isDark={isDark}>Cooming soon</ComingSoonTitle>
                </>
            }
            ItemSeparatorComponent={HSeperator}
            data={upcomingData.pages.map(page => page.results).flat()}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderHMedia}
        />
    ) : <></>;
}