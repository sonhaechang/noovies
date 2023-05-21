
import React, { useEffect } from 'react';
import { Dimensions, Linking, StyleSheet, useColorScheme } from 'react-native';

import styled from 'styled-components/native';

import { useQuery } from '@tanstack/react-query';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import { Movie, TV, moviesApi, tvApi } from '../api';
import { makeImgPath } from '../utils';
import { colors } from '../colors';
import Poster from '../components/Poster';
import Loader from '../components/Loader';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView<{ isDark: boolean }>`
    background-color: ${(props) => (props.isDark ? props.theme.mainBgColor : 'white')};
`;

const Header = styled.View`
    height: ${SCREEN_HEIGHT/4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
    flex-direction: row;
    width: 75%;
`;

const Title = styled.Text`
    color: white;
    font-size: 32px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: 500;
`;

const Data = styled.View`
    padding: 0px 20px;
`

const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
    flex-direction: row;
`;

const BtnText = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 24px;
    margin-left: 10px;
`;

type RootStackParamList = {
    Detail: Movie | TV;
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({ 
    navigation: { setOptions },
    route: { params,}, 
}: DetailScreenProps): JSX.Element {
    const isDark = useColorScheme() === 'dark';
    const isMovie = 'original_title' in params;

    const { isInitialLoading, data } = useQuery(
        [isMovie ? 'movies' : 'tv', params.id], 
        isMovie ? moviesApi.getDetail : tvApi.getDetail,
    );

    const openLink =  async (videoID: string) => {
        const baseUrl = `https://youtube.com/watch?v=${videoID}`;
        await WebBrowser.openBrowserAsync(baseUrl);

        // react-native의 Linking 컴포넌트를 활용한 앱 외부에서 링크 열기
        // await Linking.openURL(baseUrl);


    }

    useEffect(() => {
        setOptions({
            title: 'original_title' in params ? 'Movie' : 'TV Show',
        })
    }, []);

    return (
        <Container isDark={isDark}>
            <Header>
                <Background 
                    source={{ uri: makeImgPath(params.backdrop_path || '') }} 
                    style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                    colors={['transparent', colors.dark]}
                    style={StyleSheet.absoluteFill}
                />
                <Column>
                    <Poster path={params.poster_path || ''} />
                    <Title>
                        {
                            'original_title' in params ?
                            params.original_title : 
                            params.original_name
                        }
                    </Title>
                </Column>
            </Header>

            <Data>
                <Overview>
                    {params.overview}
                </Overview>

                {isInitialLoading ? <Loader/> : <></>}

                {data?.videos?.results?.map(video => (
                    <VideoBtn 
                        key={video.key}
                        onPress={() => openLink(video.key)}
                    >
                        <Ionicons 
                            name='logo-youtube' 
                            color={isDark ? 'white' : colors.dark}
                            size={24}
                        />

                        <BtnText>
                            {video.name}
                        </BtnText>
                    </VideoBtn>
                ))}
            </Data>
        </Container>
    );
}