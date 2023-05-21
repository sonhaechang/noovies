import React from 'react';
import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import Poster from './Poster';
import Votes from './Votes';
import { Movie } from '../api';
import { makeImgPath } from '../utils';



const Title = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;

const HMovie = styled.View`
    flex-direction: row;
    padding: 0px 20px;
`;

const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;

const Release = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.8)')};
    font-size: 12px;
    margin-vertical: 10px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.8)')};
    width: 80%;
`;

interface HMediaProps {
    posterPath: string;
    originalTitle: string;
    overview: string;
    releaseDate?: string;
    voteAverage?: number;
    fullData: Movie;
    isDark: boolean;
}

export default function HMedia({ 
    posterPath, 
    originalTitle, 
    overview, 
    releaseDate, 
    voteAverage,
    fullData,
    isDark
}: HMediaProps): JSX.Element {
    const navigation = useNavigation();

    const goToDetail = () => {
        //@ts-ignore
        navigation.navigate(
            'Stack', 
            { 
                screen: 'Detail',
                params: { ...fullData,},
            }
        );
    };

    return (
        <TouchableOpacity onPress={goToDetail}>
            <HMovie>
                <Poster path={posterPath} />

                <HColumn>
                    <Title isDark={isDark}>
                        {
                            originalTitle !== '' && originalTitle.length > 25 ? 
                            `${originalTitle.slice(0, 25)}...` : 
                            originalTitle
                        }
                    </Title>

                    {
                        releaseDate ? (
                            <Release isDark={isDark}>
                                {new Date(releaseDate).toLocaleDateString('ko')}
                            </Release> 
                        ) : null
                    }
                        
                    {voteAverage ? <Votes votes={voteAverage} /> : null}

                    <Overview isDark={isDark}>
                        {
                            overview !== '' && overview.length > 130 ? 
                            `${overview.slice(0, 130)}...` : 
                            overview
                        }
                    </Overview>
                </HColumn>
            </HMovie>
        </TouchableOpacity>
    )
}