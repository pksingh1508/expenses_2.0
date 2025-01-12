import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../common/CustomInput';
import Colors from '@/constants/Colors';
import CustomButton from '../common/CustomButton';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { supabase } from '@/lib/supabase';

const RegisterForm = ({onPress}:{onPress: () => void}) => {
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [loading, setLoading] = useState(false);

    const RegisterHandler = async () => {
        setLoading(true);
        try {
            if(!name && !email && !password){
                Alert.alert("Fill all the data");
                return;
            }
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name
                    }
                }
            });
            onChangeName('');
            onChangeEmail('');
            onChangePassword('');
            if(error) {
              Alert.alert("User already registered, Please Login");
              onPress();
            }
        } catch(err) {
            Alert.alert("Error while SignUp");
        } finally {
            setLoading(false);
        }
        console.log('Data',name, email, password);
    }

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(700).springify()}
      >
        <Text style={styles.text}>Name</Text>
        <CustomInput placeholder='Enter Your Name' value={name} onChange={onChangeName} inputMode='text'/>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.duration(600).springify()}
      >
        <Text style={styles.text}>Email</Text>
        <CustomInput placeholder='Enter Email' value={email} onChange={onChangeEmail} inputMode='email'/>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.duration(500).springify()}
      >
        <Text style={styles.text}>Password</Text>
        <CustomInput placeholder='Enter Password' value={password} onChange={onChangePassword} inputMode='text'/>
      </Animated.View>
      <Animated.View style={styles.btnContainer}
        entering={FadeInDown.duration(400).springify()}
      >
        <CustomButton title={loading ? 'Registering...': 'Register'} onPress={RegisterHandler}/>
      </Animated.View>
      <Animated.View style={styles.newUserContainer}
        entering={FadeInDown.duration(300).springify()}
      >
        <Text style={styles.user}>Already Register,</Text>
        <TouchableOpacity onPress={onPress} disabled={loading}>
            <Text style={styles.register}>Please Login.</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        padding: 10
    },
    text: {
        color: Colors.whiteFade,
        fontSize: 20,
        fontFamily: 'nsb',
        paddingLeft: 3
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    newUserContainer: {
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'center'
    },
    user: {
        color: Colors.whiteFade,
        fontSize: 18,
        fontFamily: 'nm'
    },
    register: {
        color: Colors.blue,
        fontSize: 18,
        fontFamily: 'nm',
        textDecorationLine: 'underline'
    }
});
export default RegisterForm
