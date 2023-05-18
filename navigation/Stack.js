import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ScreenOne = ({ navigation: { navigate } }) => (
    <TouchableOpacity 
        onPress={() => navigate('Two')}
    >
        <Text>Go to two</Text>
    </TouchableOpacity>
);

const ScreenTwo = ({ navigation: { navigate } }) => (
    <TouchableOpacity 
        onPress={() => navigate('Three')}
    >
        <Text>Go to three</Text>
    </TouchableOpacity>
);

// const ScreenThree = ({ navigation: { goBack } }) => (
const ScreenThree = ({ navigation: { setOptions } }) => (
    <TouchableOpacity 
        // onPress={() => goBack()}
        onPress={() => setOptions({ title: 'Hello!' })}
    >
        <Text>Change title</Text>
    </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

export default function Stack() {
    return (
        <NativeStack.Navigator>
            <NativeStack.Screen name='One' component={ScreenOne} />
            <NativeStack.Screen name='Two' component={ScreenTwo} />
            <NativeStack.Screen name='Three' component={ScreenThree} />
        </NativeStack.Navigator>
    );
}