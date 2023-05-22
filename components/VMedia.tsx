import React from 'react';
import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import Poster from './Poster';
import Votes from './Votes';
import { Movie, TV } from '../api';


const Container = styled.View`
    align-items: flex-start;
`;

const Title = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;

interface VMediaProps {
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    fullData: Movie | TV;
    isDark: boolean;
}

export default function VMedia({ 
    posterPath, 
    originalTitle, 
    voteAverage, 
    fullData,
    isDark 
}: VMediaProps): JSX.Element {
    const navigation = useNavigation();

    const goToDetail = () => {
        navigation.navigate(
            //@ts-ignore
            'Stack', 
            { 
                screen: 'Detail',
                params: { ...fullData, },
            }
        );
    };

    return (
        <TouchableOpacity onPress={goToDetail}>
            <Container>
                <Poster path={posterPath} />

                <Title isDark={isDark}>
                    {
                        originalTitle !== '' && originalTitle.length > 12 ? 
                        `${originalTitle.slice(0, 12)}...` : 
                        originalTitle
                    }
                </Title>

                <Votes votes={voteAverage} />
            </Container>
        </TouchableOpacity>
    )
}