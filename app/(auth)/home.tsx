import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import TopHeader from '@/components/Home/TopHeader'
import IncomeCard from '@/components/Home/IncomeCard'
import PlusButton from '@/components/Home/PlusButton'
import RecentTransaction from '@/components/Home/RecentTransaction'

const Home = () => {
  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['rgba(23,22,22,255)', 'rgba(19,18,18,255)']}
        style={styles.background}
      />
      <PlusButton />
      <TopHeader />
      <IncomeCard />
      <RecentTransaction />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%'
    },
    
})
export default Home
