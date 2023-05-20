import React from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';

import styled from 'styled-components/native';


const Wrapper = styled.ActivityIndicator`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default function Loader(): JSX.Element {
    return (
        <Wrapper>
            <ActivityIndicator />
        </Wrapper>
    )
}