import React, { useEffect } from 'react';
import { Text, View, useColorScheme } from 'react-native';

import styled from 'styled-components/native';


const Container = styled.ScrollView<{ isDark: boolean }>`
    background-color: ${(props) => (props.isDark ? props.theme.mainBgColor : 'white')};
`;

export default function Detail({ 
    navigation: { setOptions },
    route: { 
        params: { originalTitle },
    }, 
}): JSX.Element {
    const isDark = useColorScheme() === 'dark';

    useEffect(() => {
        setOptions({
            title: originalTitle,
        })
    }, []);

    console.log(originalTitle);

    return (
        <Container isDark={isDark}>
            <Text>Detail</Text>
        </Container>
    );
}