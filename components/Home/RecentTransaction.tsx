import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

const RecentTransaction = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.recentText}>Recent Transactions</Text>
        <View>
            <Text>Hello</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    recentText: {
        color: Colors.white,
        fontSize: 23,
        fontFamily: 'park-m',
        paddingLeft: 15
    }
});
export default RecentTransaction
