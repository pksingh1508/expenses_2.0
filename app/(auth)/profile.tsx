import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import CustomButton from "@/components/common/CustomButton";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { Session } from "@supabase/supabase-js";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef<LottieView>(null);
  const [session, setSession] = useState<Session | null>(null);

  const handleSignout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error while Logout");
    } else {
      router.replace("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LinearGradient
          colors={["rgba(38,38,38,255)", "rgba(19,18,19,255)"]}
          style={styles.background}
        />
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
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(38,38,38,255)", "rgba(19,18,19,255)"]}
          style={styles.background}
        />
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/defaultAvatar.png")}
            style={styles.image}
          />
          <Text style={styles.name}>{session?.user?.user_metadata.name}</Text>
          <Text style={styles.email}>{session?.user?.email}</Text>
        </View>
        <View style={styles.btnContainer}>
          <CustomButton
            title={loading ? "Logout..." : "Logout"}
            onPress={handleSignout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    zIndex: -10
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20
  },
  name: {
    fontSize: 20,
    fontFamily: "nb",
    color: Colors.white
  },
  email: {
    fontSize: 17,
    fontFamily: "park-r",
    color: Colors.whiteFade
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100
  }
});
export default Profile;
