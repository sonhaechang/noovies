import React from 'react';
import { FlatList, ScrollView, useColorScheme } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import { tvApi } from '../api';
import Loader from '../components/Loader';
import VMedia from '../navigation/VMedia';


export default function Tv(): JSX.Element {
    const isDark = useColorScheme() === 'dark';

    const {
        isInitialLoading: todayLoading, 
        data: todayData, 
    } = useQuery(['tv', 'today'], tvApi.getAiringToday);

    const {
        isInitialLoading: topLoading, 
        data: topData, 
    } = useQuery(['tv', 'top'], tvApi.getTopRated);

    const {
        isInitialLoading: trendingLoading, 
        data: trendingData, 
    } = useQuery(['tv', 'trending'], tvApi.getTrending);

    const loading = todayLoading || topLoading || trendingLoading;

    if (loading) { return <Loader />; }

    return (
        <ScrollView>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={trendingData.results}
                renderItem={({ item }) => (
                    <VMedia 
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                        isDark={isDark}
                    />
                )}
            />

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={todayData.results}
                renderItem={({ item }) => (
                    <VMedia 
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                        isDark={isDark}
                    />
                )}
            />

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={topData.results}
                renderItem={({ item }) => (
                    <VMedia 
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                        isDark={isDark}
                    />
                )}
            />
        </ScrollView>
    );
}