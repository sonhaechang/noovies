import React from 'react';
import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import Poster from './Poster';
import Votes from './Votes';


const Movie = styled.View`
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
    isDark: boolean;
}

export default function VMedia({ 
    posterPath, 
    originalTitle, 
    voteAverage, 
    isDark 
}: VMediaProps): JSX.Element {
    const navigation = useNavigation();

    const goToDetail = () => {
        //@ts-ignore
        navigation.navigate(
            'Stack', 
            { 
                screen: 'Detail',
                params: {
                    originalTitle,
                },
            }
        );
    };

    return (
        <TouchableOpacity onPress={goToDetail}>
            <Movie>
                <Poster path={`https://image.tmdb.org/t/p/w500${posterPath}`} />

                <Title isDark={isDark}>
                    {
                        originalTitle !== '' && originalTitle.length > 12 ? 
                        `${originalTitle.slice(0, 12)}...` : 
                        originalTitle
                    }
                </Title>

                <Votes votes={voteAverage} />
            </Movie>
        </TouchableOpacity>
    )
}