import React, { useState } from 'react';
import { RefreshControl, ScrollView, useColorScheme } from 'react-native';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { tvApi, TVResponse } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';


export default function Tv(): JSX.Element {
    const isDark = useColorScheme() === 'dark';
    const queryClient = useQueryClient();

    const [refreshing, setRefreshing] = useState<boolean>(false);

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

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(['tv']);
        setRefreshing(false);
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
            {
                trendingData ? (
                    <HList 
                        title='Trendig TV' 
                        data={trendingData.results}
                        isDark={isDark}
                    />
                ) : <></>
            }

            {
                todayData ? (
                    <HList 
                        title='Airing Today' 
                        data={todayData.results}
                        isDark={isDark}
                    />
                ) : <></>
            }

            {
                topData ? (
                    <HList 
                        title='Top Rated TV' 
                        data={topData.results}
                        isDark={isDark}
                    />
                ) : <></>
            }
        </ScrollView>
    );
}