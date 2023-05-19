import React from 'react';
import { useColorScheme } from 'react-native';

import { Ionicons } from '@expo/vector-icons'

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
            sceneContainerStyle={{ backgroundColor: isDark ? colors.dark : 'white', }}
            initialRouteName='Movies'
            screenOptions={{ 
                tabBarStyle: { backgroundColor: isDark ? colors.dark : 'white', },
                tabBarActiveTintColor: colors.indigo,
                tabBarInactiveTintColor: isDark ? '#d3dae2' : '#808e9b',
                headerStyle: { backgroundColor: isDark ? colors.dark : 'white', },
                headerTitleStyle: { color: isDark ? 'white' : colors.dark, },
                tabBarLabelStyle: { fontWeight: '500', marginTop: -5 },
            }}
        >
            <Tab.Screen 
                name='Movies' 
                component={Movies} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="film-outline" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen 
                name='TV' 
                component={Tv} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="tv-outline" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen 
                name='Search' 
                component={Search} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
};