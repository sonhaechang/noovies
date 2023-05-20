import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Alert, useColorScheme } from 'react-native';

import styled from 'styled-components/native';
import { moviesApi, tvApi } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';


const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
    margin-bottom: 40px;
`;

export default function Search(): JSX.Element {
    const isDark = useColorScheme() === 'dark';

    const [query, setQuery] = useState<string>('');

    const { isInitialLoading: moviesLoading, data: moviesData, refetch: searchMovies } = useQuery({
        queryKey: ['searchMovies', query],
        queryFn: moviesApi.getSearch,
        enabled: false,
    });

    const { isInitialLoading: tvLoading, data: tvData, refetch: searchTv } = useQuery({
        queryKey: ['searchTv', query],
        queryFn: tvApi.getSearch,
        enabled: false,
    });

    const onChangeText = (text: string) => setQuery(text);

    const onSubmit = () => {
        if (query == '') {
            return;
        }

        searchMovies();
        searchTv();
    };

    return (
        <Container>
            <SearchBar 
                placeholder='Search for Movie or Tv Show' 
                placeholderTextColor='grey'
                returnKeyType='search'
                returnKeyLabel='search'
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />

            { moviesLoading || tvLoading ? <Loader /> : <></>}

            {
                moviesData ? (
                    <HList 
                        title='Movie Results' 
                        data={moviesData.results} 
                        isDark={isDark} 
                    /> 
                ): <></>
            }

            {
                tvData ? (
                    <HList 
                        title='Tv Results' 
                        data={tvData.results} 
                        isDark={isDark} 
                    /> 
                ): <></>
            }
        </Container>
    );
}