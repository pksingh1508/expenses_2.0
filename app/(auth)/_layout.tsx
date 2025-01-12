import React from 'react'
import { Tabs } from 'expo-router';
import { AntDesign, Entypo } from '@expo/vector-icons'
import Colors from '@/constants/Colors';

const TabLayout = () => {
  return (
    <Tabs 
        screenOptions={{
            tabBarStyle: {
                backgroundColor: Colors.blackFade,
                height: 60,
                paddingTop: 8,
                borderTopWidth: 0,
            },
            tabBarShowLabel: false,
            tabBarInactiveTintColor: Colors.whiteFade,
            tabBarActiveTintColor: Colors.parrotgreen
        }}
    >
        <Tabs.Screen name='home' options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (
                <Entypo name="home" size={size} color={color} />
            )
        }}/>
        <Tabs.Screen name='statistics' options={{
            tabBarIcon: ({size, color}) => (
                <Entypo name="bar-graph" size={size} color={color} />
            )
        }}/>
        <Tabs.Screen name='wallet' options={{
            tabBarIcon: ({size, color}) => (
                <Entypo name="wallet" size={size} color={color} />
            )
        }}/>
        <Tabs.Screen name='profile' options={{
            title: "Profile",
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#262626',
              borderBottomWidth: 0
            },
            headerTitleStyle: {
                color: Colors.white,
                fontSize: 25,
                fontFamily: 'nsb'
            },
            tabBarIcon: ({size, color}) => (
                <AntDesign name="user" size={size} color={color} />
            )
        }}/>
    </Tabs>
  )
}

export default TabLayout;