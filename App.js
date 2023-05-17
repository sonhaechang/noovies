import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
        await new Promise(resolve => setTimeout(resolve, 2000));
				setReady(true);
			} catch (e) {
				console.log(e);
			} 
		}
	
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (ready) {
			await SplashScreen.hideAsync();
		}
	}, [ready]);

	if (!ready) {
		return null;
	}

	return (
		<View onLayout={onLayoutRootView}>
		  	<Text>Open up App.js to start working on your app!</Text>
		</View>
	  );
}