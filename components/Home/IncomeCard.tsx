import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo, Feather } from '@expo/vector-icons';

const IncomeCard = () => {
  return (
    <View style={styles.container}>
        <Image 
            source={require('../../assets/images/card.png')}
            style={styles.card}
        />
        <View style={styles.balanceContainer}>
            <View style={styles.top}>
                <Text style={styles.totalText}>Total Balance</Text>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
            </View>
            <View style={styles.middle}>
                <Text style={styles.total}>₹ 3433.00</Text>
            </View>
            <View style={styles.bottom}>
                <View>
                    <View style={styles.incomeBox}>
                        <Feather name="arrow-down-circle" size={22} color="black" />
                        <Text style={styles.incomeBoxText}>Income</Text>
                    </View>
                    <Text style={styles.incomeText}>₹ 323.00</Text>
                </View>
                <View>
                    <View style={styles.incomeBox}>
                        <Feather name="arrow-up-circle" size={22} color="black" />
                        <Text style={styles.incomeBoxText}>Expense</Text>
                    </View>
                    <Text style={styles.expenseText}>₹ 323.00</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center'
    },
    card: {
        width: '90%',
        height: 250,
        resizeMode: 'contain',
    },
    balanceContainer: {
        position: 'absolute',
        width: '90%',
        top: 30,
        gap: 15
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 19
    },
    middle: {
        paddingHorizontal: 20
    },
    totalText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'nm'
    },
    total: {
        fontSize: 30,
        fontFamily: 'park-b',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    incomeBox: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    incomeBoxText: {
        fontFamily: 'nm',
        fontSize: 18
    },
    incomeText: {
        fontSize: 19,
        fontFamily: 'park-b',
        color: 'green'
    },
    expenseText: {
        fontSize: 19,
        fontFamily: 'park-b',
        color: 'red'
    }
});
export default IncomeCard
