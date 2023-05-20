import React from 'react';
import { RefreshControl, ScrollView, useColorScheme } from 'react-native';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { tvApi } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';


export default function Tv(): JSX.Element {
    const isDark = useColorScheme() === 'dark';
    const queryClient = useQueryClient();

    const {
        isInitialLoading: todayLoading, 
        data: todayData, 
        isRefetching: todayRefetchingtoday,
    } = useQuery(['tv', 'today'], tvApi.getAiringToday);

    const {
        isInitialLoading: topLoading, 
        data: topData, 
        isRefetching: topRefetching
    } = useQuery(['tv', 'top'], tvApi.getTopRated);

    const {
        isInitialLoading: trendingLoading, 
        data: trendingData, 
        isRefetching: trendingRefetching
    } = useQuery(['tv', 'trending'], tvApi.getTrending);

    const loading = todayLoading || topLoading || trendingLoading;

    const refreshing = todayRefetchingtoday || topRefetching || trendingRefetching;

    const onRefresh = async () => {
        queryClient.refetchQueries(['tv']);
    };

    
    if (loading) { return <Loader />; }

    return (
        <ScrollView 
            contentContainerStyle={{ paddingVertical: 20 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing} 
                    onRefresh={onRefresh}
                />
            }
        >
            <HList 
                title='Trendig TV' 
                data={trendingData.results}
                isDark={isDark}
            />

            <HList 
                title='Airing Today' 
                data={todayData.results}
                isDark={isDark}
            />

            <HList 
                title='Top Rated TV' 
                data={topData.results}
                isDark={isDark}
            />
        </ScrollView>
    );
}