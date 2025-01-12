import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';


SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [loaded] = useFonts({
    "park-r": require('../assets/fonts/Parkinsans-Regular.ttf'),
    "park-m": require('../assets/fonts/Parkinsans-Medium.ttf'),
    "park-b": require('../assets/fonts/Parkinsans-Bold.ttf'),
    "nb": require('../assets/fonts/Nunito-Bold.ttf'),
    "nm": require('../assets/fonts/Nunito-Medium.ttf'),
    "nr": require('../assets/fonts/Nunito-Regular.ttf'),
    "nsb": require('../assets/fonts/Nunito-SemiBold.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if(!loaded) return;

  return (
    <>
      <Stack>
        <Stack.Screen name='index' options={{
          headerShown: false
        }}/>
        <Stack.Screen name='(auth)' options={{
          headerShown: false
        }}/>
      </Stack>
      <StatusBar style='light'/>
    </>
  )
}

export default Layout;