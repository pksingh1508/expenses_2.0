import {
  Alert,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useRef, useState } from "react";
import CustomInput from "../common/CustomInput";
import Colors from "@/constants/Colors";
import CustomButton from "../common/CustomButton";
import Animated, { FadeInDown } from "react-native-reanimated";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const LoginForm = ({ onPress }: { onPress: () => void }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef<LottieView>(null);

  const loginHandler = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      onChangeEmail("");
      onChangePassword("");
      if (error) {
        console.log(error);
        Alert.alert("Invalid email or password");
      }
    } catch (err) {
      Alert.alert("Error while login");
    } finally {
      setLoading(false);
    }
    console.log("Data", email, password);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LottieView
            autoPlay
            ref={loadingRef}
            style={{
              width: "30%",
              height: "30%"
            }}
            source={require("../../assets/images/loading.json")}
          />
        </View>
      ) : (
        <>
          <Animated.View entering={FadeInDown.duration(600).springify()}>
            <Text style={styles.text}>Email</Text>
            <CustomInput
              placeholder="Enter Email"
              value={email}
              onChange={onChangeEmail}
              inputMode="email"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).springify()}>
            <Text style={styles.text}>Password</Text>
            <CustomInput
              placeholder="Enter Password"
              value={password}
              onChange={onChangePassword}
              inputMode="text"
            />
          </Animated.View>
          <Animated.View
            style={styles.btnContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            <CustomButton
              title={loading ? "Loging In..." : "Login"}
              onPress={loginHandler}
            />
          </Animated.View>
          <Animated.View
            style={styles.newUserContainer}
            entering={FadeInDown.duration(300).springify()}
          >
            <Text style={styles.user}>New User,</Text>
            <TouchableOpacity onPress={onPress} disabled={loading}>
              <Text style={styles.register}>Register first.</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 10
  },
  text: {
    color: Colors.whiteFade,
    fontSize: 20,
    fontFamily: "nsb",
    paddingLeft: 3
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  newUserContainer: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center"
  },
  user: {
    color: Colors.whiteFade,
    fontSize: 18,
    fontFamily: "nm"
  },
  register: {
    color: Colors.blue,
    fontSize: 18,
    fontFamily: "nm",
    textDecorationLine: "underline"
  }
});
export default LoginForm;
