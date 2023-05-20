import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Alert, useColorScheme } from 'react-native';

import styled from 'styled-components/native';
import { moviesApi, tvApi } from '../api';


const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
`;

export default function Search(): JSX.Element {
    const isDark = useColorScheme() === 'dark';

    const [query, setQuery] = useState<string>('');

    const { isLoading: moviesLoading, data: moviesData, refetch: searchMovies } = useQuery(
        ['searchMovies', query],
        moviesApi.getSearch,
        { enabled: false }
    );

    const { isLoading: tvLoading, data: tvData, refetch: searchTv } = useQuery(
        ['searchTv', query],
        tvApi.getSearch,
        { enabled: false }
    );

    const onChangeText = (text: string) => setQuery(text);

    const onSubmit = () => {
        if (query !== '') {
            searchMovies();
            searchTv();
        }
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
        </Container>
    );
}