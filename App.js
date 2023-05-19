import React, { useCallback } from 'react';
import { useColorScheme } from 'react-native';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Root from './navigation/Root';
import { darkTheme, lightTheme } from './Styled';


const queryClient = new QueryClient();

export default function App() {
	const isDark = useColorScheme() == 'dark';
	const [loaded] = Font.useFonts(Ionicons.font)

	const onLayoutRootView = useCallback(async () => {
		if (loaded) { await SplashScreen.hideAsync(); }
	}, [loaded]);

	if (!loaded) { return null; }

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<NavigationContainer onLayout={onLayoutRootView}>
					<Root />
				</NavigationContainer>
			</ThemeProvider>
		</QueryClientProvider>
	);
}