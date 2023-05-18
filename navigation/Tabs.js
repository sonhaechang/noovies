import React from 'react';
import { useColorScheme } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { colors } from '../colors';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const isDark = useColorScheme() == 'dark';

    return (
        <Tab.Navigator 
            initialRouteName='Movies'
            screenOptions={{ 
                tabBarStyle: { 
                    paddingTop: 10,
                    backgroundColor: isDark ? colors.dark : 'white',
                },
                tabBarActiveTintColor: isDark ? colors.yellow : colors.dark,
                tabBarInactiveTintColor: isDark ? '#d3dae2' : '#808e9b',
                headerStyle: { backgroundColor: isDark ? colors.dark : 'white', },
                headerTitleStyle: { color: isDark ? 'white' : colors.dark, },
            }}
        >
            <Tab.Screen name='Movies' component={Movies} />
            <Tab.Screen name='Tv' component={Tv} />
            <Tab.Screen name='Search' component={Search} />
        </Tab.Navigator>
    )
};