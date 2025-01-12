import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../common/CustomButton';
import { expenseCategory, expenseTypes, wallets } from '@/constants/data';
import DropDown from '../common/DropDown';
import DatePicker from '../common/DatePicker';
import CustomInput from '../common/CustomInput';


const width = Dimensions.get('window').width;

const PlusButton = () => {
    const [visible, setVisible] = useState(false);
    const [expenseType, setExpenseType] = useState('');
    const [expensesCategory, setExpensesCategory] = useState('');
    const [wallet, setWallet] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = () => {
        console.log('data', expenseType, expensesCategory, wallet, selectedDate,amount, description);
    }

  return (
    <View style={styles.plus}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <AntDesign name="pluscircle" size={59} color={Colors.parrotgreen} />
        </TouchableOpacity>
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <LinearGradient 
                        colors={['rgba(38,38,38,255)', 'rgba(33,33,32,255)']}
                        style={styles.background}
                    />
                    <View style={styles.headingBar}>
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Ionicons name="arrow-back-circle" size={34} color={Colors.parrotgreen} />
                        </TouchableOpacity>
                        <Text style={styles.addText}>Add Transactions</Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.expenseTypeContainer}>
                            <Text style={styles.labelText}>Type</Text>
                            <DropDown data={expenseTypes} onChange={setExpenseType} text='Select Expense Types'/>
                        </View>
                        <View style={styles.expenseTypeContainer}>
                            <Text style={styles.labelText}>Wallet</Text>
                            <DropDown data={wallets} onChange={setWallet} text='Choose Wallet'/>
                        </View>
                        <View style={styles.expenseTypeContainer}>
                            <Text style={styles.labelText}>Expense Category</Text>
                            <DropDown data={expenseCategory} onChange={setExpensesCategory} text='Select Expense Category'/>
                        </View>
                        <View style={styles.expenseTypeContainer}>
                            <Text style={[styles.labelText, {paddingBottom: 5}]}>Date</Text>
                            <DatePicker setSelectedDate={setSelectedDate}/>
                        </View>
                        <View style={styles.expenseTypeContainer}>
                            <Text style={[styles.labelText, {paddingBottom: 5}]}>Amount</Text>
                            <CustomInput placeholder='Enter Amount' value={amount} onChange={setAmount} inputMode='text' customStyle={{height: 68}}/>
                        </View>
                        <View style={styles.expenseTypeContainer}>
                            <Text style={[styles.labelText, {paddingBottom: 5}]}>Description (Optional)</Text>
                            <CustomInput placeholder='Write Description' value={description} onChange={setDescription} inputMode='text' customStyle={{height: 68}}/>
                        </View>
                        <View style={[styles.expenseTypeContainer, {marginBottom: 190}]}>
                            <Text style={[styles.labelText, {paddingBottom: 5}]}>Receipt (optional)</Text>
                        </View>
                        
                    </ScrollView>
                    <View style={styles.submitBtnContainer}>
                        <CustomButton title='Submit' onPress={submitHandler} customStyle={{width: '100%'}}/>
                    </View>
                </View>
            </View>
        </Modal>
      </View>
  )
}

const styles = StyleSheet.create({
    plus: {
        position: 'absolute',
        bottom: 10,
        left: width-80
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
    modalContent: {
        flex: 1,
        marginTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden'
    },
    submitBtnContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#1e1e1e',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Colors.whiteFade
    },
    headingBar: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    addText: {
        fontSize: 25,
        fontFamily: 'park-m',
        color: Colors.white,
        paddingLeft: 60
    },
    expenseTypeContainer: {
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    labelText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'park-r',
        padding: 2
    }
});
export default PlusButton
