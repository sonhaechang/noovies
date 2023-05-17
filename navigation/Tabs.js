import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator 
            initialRouteName='Movies'
            screenOptions={{ 
                tabBarStyle: { paddingTop: 10 },
                tabBarActiveTintColor: '#4F46E5',
            }}
        >
            <Tab.Screen name='Movies' component={Movies} />
            <Tab.Screen name='Tv' component={Tv} />
            <Tab.Screen name='Search' component={Search} />
        </Tab.Navigator>
    )
};