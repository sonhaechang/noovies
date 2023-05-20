import React, { useState } from 'react';
import { useColorScheme } from 'react-native';

import styled from 'styled-components/native';


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

    const onChangeText = (text: string) => setQuery(text);

    console.log(query);

    return (
        <Container>
            <SearchBar 
                placeholder='Search for Movie or Tv Show' 
                placeholderTextColor='grey'
                returnKeyType='search'
                returnKeyLabel='search'
                onChangeText={onChangeText}
            />
        </Container>
    );
}