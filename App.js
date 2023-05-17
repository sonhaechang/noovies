import React, { useCallback } from 'react';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native';

import Tabs from './navigation/Tabs';

export default function App() {
	const [loaded] = Font.useFonts(Ionicons.font)

	const onLayoutRootView = useCallback(async () => {
		if (loaded) { await SplashScreen.hideAsync(); }
	}, [loaded]);

	if (!loaded) { return null; }

	return (
		<NavigationContainer onLayout={onLayoutRootView}>
			<Tabs />
		</NavigationContainer>
	);
}