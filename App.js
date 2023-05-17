import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {

        		await Font.loadAsync(Ionicons.font);
				// import { Asset } from 'expo-asset';
				// await Asset.loadAsync(require(url)); // In local file system 

				// inport { Image } from 'react-native'
				// await Image.prefetch(url); // on the Web
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