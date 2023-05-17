import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons'
import { Asset, useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

// const loadImages = (images) => images.map((image) => {
// 	if (typeof image === 'string') {
// 		return Image.prefetch(image);
// 	} else {
// 		return Asset.loadAsync(image);
// 	}
// })

export default function App() {
	// const [ready, setReady] = useState(false);
	
	// useEffect(() => {
	// 	async function prepare() {
	// 		try {
	// 			const fonts = loadFonts([Ionicons.font]);
	// 			const images = loadImages([require('./bus.jpg')]);

	// 			await Promise.all([...fonts, images]);
	// 		} catch (e) {
	// 			console.warn(e);
	// 		} finally {
	// 			setReady(true);
	// 		}
	// 	}

	// 	prepare();
	// }, []);
	
	// const onLayoutRootView = useCallback(async () => {
	// 	if (ready) { await SplashScreen.hideAsync(); }
	// }, [ready]);
	
	// if (!ready) { return null; }

	// // only use image and font
	const [asset] = useAssets([require('./bus.jpg')]);
	const [loaded] = Font.useFonts(Ionicons.font)

	const onLayoutRootView = useCallback(async () => {
		if (asset || loaded) { await SplashScreen.hideAsync(); }
	}, [asset, loaded]);

	if (!asset || !loaded) { return null; }

	return (
		<View onLayout={onLayoutRootView}>
		  	<Text>Open up App.js to start working on your app!</Text>
		</View>
	  );
}