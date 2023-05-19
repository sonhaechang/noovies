import React from "react";

import styled from 'styled-components/native';

import Poster from "../components/Poster";
import Votes from "./Votes";


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
    isDark: boolean;
}

export default function HMedia({ 
    posterPath, 
    originalTitle, 
    overview, 
    releaseDate, 
    voteAverage,
    isDark
}: HMediaProps): JSX.Element {
    return (
        <HMovie>
            <Poster path={`https://image.tmdb.org/t/p/w500${posterPath}`} />

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
    )
}