import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '@/constants/Colors'
import CustomButton from '@/components/common/CustomButton'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'

const Profile = () => {

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      Alert.alert("Error while Logout");
    } else {
      router.replace('/');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <LinearGradient 
          colors={['rgba(38,38,38,255)', 'rgba(19,18,19,255)']}
          style={styles.background}
        />
        <View style={styles.imageContainer}>
          <Image 
            source={{
              uri: 'https://cdn.pixabay.com/photo/2024/06/21/14/19/house-8844430_960_720.jpg'
            }}
            style={styles.image}
          />
          <Text style={styles.name}>Pawan Kumar</Text>
          <Text style={styles.email}>pawankumarlearner@gmail.com</Text>
        </View>
        <View style={styles.btnContainer}>
          <CustomButton title='Logout' onPress={handleSignout}/>
        </View>
      </View>
    </SafeAreaView>
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
    height: '100%',
    zIndex: -10
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 50
  },
  name: {
    fontSize: 20,
    fontFamily: 'nb',
    color: Colors.white
  },
  email: {
    fontSize: 17,
    fontFamily: 'park-r',
    color: Colors.whiteFade
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  }
})
export default Profile
