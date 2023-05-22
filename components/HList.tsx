import React from 'react';
import { FlatList } from 'react-native';

import styled from 'styled-components/native';

import VMedia from '../components/VMedia';

import { Movie, TV } from '../api';


const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
    margin-bottom: 20px;
`;

export const VSeperator = styled.View`
    width: 20px;
`;

interface HListProps  {
    title: string;
    data: Movie[] | TV[];
    isDark: boolean;
}

export default function HList({ title, data, isDark }: HListProps): JSX.Element {
    return (
        <ListContainer>
            <ListTitle isDark={isDark}>
                {title}
            </ListTitle>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ItemSeparatorComponent={VSeperator}
                data={data}
                keyExtractor={(item: Movie | TV) => String(item.id)}
                renderItem={({ item }: { item: Movie | TV }) => (
                    <VMedia 
                        posterPath={item.poster_path || ''}
                        originalTitle={
                            "original_title" in item ? item.original_title : item.original_name
                          }
                        voteAverage={item.vote_average}
                        fullData={item}
                        isDark={isDark}
                    />
                )}
            />
        </ListContainer>
    );
}