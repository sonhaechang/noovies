import React from 'react';
import styled from 'styled-components/native';

const Btn = styled.TouchableOpacity`
    flex: 1; 
    justify-content: center;
    align-items: center;
`;

const Title = styled.Text`
    color: #4F46E5;
`

export default function Movies({ navigation: { navigate } }) {
    return (
        <Btn 
            onPress={() => navigate('Stack', { screen: 'Three' })}
        >
            <Title>Movies</Title>
        </Btn>
    );
}