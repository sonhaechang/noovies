import React from 'react';
import { useColorScheme } from 'react-native';

import styled from 'styled-components/native';


const Text = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.8)')};
    font-size: 10px;
`;

interface VotesProps {
    votes: number;
}

export default function Votes({ votes }: VotesProps): JSX.Element {
    const isDark = useColorScheme() === 'dark';

    return (
        <Text isDark={isDark}>
            {votes > 0 ? `⭐️ ${votes}/10` : `Coming soon`}
        </Text>
    );
}