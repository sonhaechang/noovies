import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { BlurView } from 'expo-blur';

import styled from 'styled-components/native';
import Poster from './Poster';


const View = styled.View`flex: 1;`;

const BgImg = styled.Image``;

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;

const Title = styled.Text<{ isDark: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;

const Overview = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.8)')};
    margin-top: 10px;
`;

const Votes = styled(Overview)`
    font-size: 12px;
`;

interface SlideProps {
    backdropPath: string; 
    posterPath: string;
    originalTitle: string; 
    voteAverage: number; 
    overview: string;
    isDark: boolean;
}

export default function Slide({ 
    backdropPath, 
    posterPath,
    originalTitle, 
    voteAverage, 
    overview, 
    isDark
}: SlideProps): JSX.Element {
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
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View style={{ flex: 1 }}>
                <BgImg 
                    source={{uri: `https://image.tmdb.org/t/p/w500${backdropPath}`}} 
                    style={StyleSheet.absoluteFill} 
                />
                <BlurView 
                    intensity={95}
                    tint={isDark ? 'dark' : 'light'}
                    style={StyleSheet.absoluteFill}
                >
                    <Wrapper>
                        <Poster path={`https://image.tmdb.org/t/p/w500${posterPath}`} />

                        <Column>
                            <Title isDark={isDark}>
                                {originalTitle}
                            </Title>
                            {
                                voteAverage > 0 ? (
                                    <Votes isDark={isDark}>
                                        ⭐️ {voteAverage}/10
                                    </Votes>
                                ) : null
                            }
                            <Overview isDark={isDark}>
                                {
                                    overview !== '' &&overview.length > 130 ? 
                                    `${overview.slice(0, 130)}...` : 
                                    overview
                                }
                            </Overview>                                
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>
        </TouchableWithoutFeedback>
    );
}