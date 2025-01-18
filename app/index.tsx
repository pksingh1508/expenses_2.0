import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LoginForm from "@/components/Login/LoginForm";
import RegisterForm from "@/components/Login/RegisterForm";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { useSessionStore } from "@/store/sessionStore";

const AuthenticatePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const animation = useRef<LottieView>(null);
  const loadingRef = useRef<LottieView>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const { addDetails } = useSessionStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    if (session && session.user) {
      addDetails({
        user_id: session.user?.id,
        email: session.user.email || "",
        name: session.user.user_metadata.name
      });
      router.replace("/(auth)/home");
    }
    setLoading(false);
  }, [session]);

  const toggle = () => {
    setIsLogin(!isLogin);
  };
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.blackFade,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LottieView
          autoPlay
          ref={loadingRef}
          style={{
            width: "30%",
            height: "30%"
          }}
          source={require("../assets/images/loading.json")}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: "100%",
            height: isLogin ? 360 : 300,
            padding: 12,
            backgroundColor: "black"
          }}
          source={require("../assets/images/hello.json")}
        />
      </View>
      <Animated.View
        style={styles.bottom}
        entering={FadeInDown.duration(900).springify()}
        exiting={FadeInUp.duration(800).springify()}
      >
        <LinearGradient
          colors={["rgba(31,31,31,255)", "rgba(19,18,19,255)"]}
          style={styles.background}
        />
        {isLogin ? (
          <LoginForm onPress={toggle} />
        ) : (
          <RegisterForm onPress={toggle} />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  bottom: {
    borderWidth: 1,
    height: "80%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    padding: 15
  }
});
export default AuthenticatePage;
