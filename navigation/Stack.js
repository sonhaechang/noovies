import React from 'react';
import { useColorScheme } from 'react-native';

import Detail from '../screens/Detail';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../colors';


const NativeStack = createNativeStackNavigator();

export default function Stack() {
    const isDark = useColorScheme() == 'dark';

    return (
        <NativeStack.Navigator
            screenOptions={{ 
                headerBackTitleVisible: false, 
                headerStyle: { backgroundColor: isDark ? colors.dark : 'white', },
                headerTitleStyle: { color: isDark ? 'white' : colors.dark, },
            }}
        >
            <NativeStack.Screen name='Detail' component={Detail} />
        </NativeStack.Navigator>
    );
}