import React from 'react';

import styled from 'styled-components/native';

import Poster from '../components/Poster';
import Votes from './Votes';


const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
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
    return (
        <Movie>
            <Poster path={`https://image.tmdb.org/t/p/w500${posterPath}`} />

            <Title isDark={isDark}>
                {originalTitle.slice(0, 13)}
                {originalTitle.length > 13 ? "..." : null}
            </Title>

            <Votes votes={voteAverage} />
        </Movie>
    )
}