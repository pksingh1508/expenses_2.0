import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import TopHeader from "@/components/Home/TopHeader";
import IncomeCard from "@/components/Home/IncomeCard";
import PlusButton from "@/components/Home/PlusButton";
import RecentTransaction from "@/components/Home/RecentTransaction";
import { useRefreshStore } from "@/store/refreshStore";
import { useWalletStore } from "@/store/walletStore";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/sessionStore";
import LottieView from "lottie-react-native";

const Home = () => {
  const { refreshFlag } = useRefreshStore();
  const { updateTotal, addWalletData } = useWalletStore();
  const { user_id } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef<LottieView>(null);

  async function getAllWallet() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user_id);
      if (error) {
        Alert.alert("Supabase error.");
        return;
      }
      if (data) {
        addWalletData(data);
        updateTotal();
      }
    } catch (err) {
      Alert.alert("Error while fetching wallet data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllWallet();
  }, [refreshFlag]);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["rgba(38,38,38,255)", "rgba(19,18,19,255)"]}
          style={styles.background}
        />
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(23,22,22,255)", "rgba(19,18,18,255)"]}
        style={styles.background}
      />
      <PlusButton />
      <TopHeader />
      <IncomeCard />
      <RecentTransaction />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  }
});
export default Home;
