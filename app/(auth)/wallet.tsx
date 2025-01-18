import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import WalletList from "@/components/wallet/WalletList";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { useSessionStore } from "@/store/sessionStore";
import { supabase } from "@/lib/supabase";
import { useWalletStore } from "@/store/walletStore";
import { useRefreshStore } from "@/store/refreshStore";

const Wallet = () => {
  const loadingRef = useRef<LottieView>(null);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<any>(null);
  const { user_id } = useSessionStore();
  const [totalAmount, setTotalAmount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [flag, setFlag] = useState(false);
  const { addWalletData } = useWalletStore();
  const { refreshFlag } = useRefreshStore();

  const toggleFlag = () => {
    setFlag(!flag);
  };

  const calculateAmount = (data: any) => {
    const n = data.length;
    let amount: number = 0;
    for (let i = 0; i < n; i++) {
      amount = amount + data[i].total_amount;
    }
    setTotalAmount(amount);
  };

  async function getAllWallet() {
    setLoading(true);
    setRefreshing(true);
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
        setWallet(data);
        addWalletData(data);
        calculateAmount(data);
      }
    } catch (err) {
      Alert.alert("Error while fetching wallet data");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllWallet();
  }, [flag, refreshFlag]);

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
      <View style={styles.top}>
        <Text style={styles.amount}>₹ {totalAmount}.00</Text>
        <Text style={styles.amountText}>Total Balance</Text>
      </View>
      <View style={styles.bottom}>
        <LinearGradient
          colors={["rgba(38,39,39,255)", "rgba(29,28,29,255)"]}
          style={styles.background}
        />
        <View style={styles.walletContainer}>
          <Text style={styles.myWalletText}>My Wallets</Text>
          <TouchableOpacity onPress={() => router.push("/route/addNewWallet")}>
            <AntDesign name="pluscircle" size={30} color={Colors.parrotgreen} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={wallet}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getAllWallet} />
          }
          keyExtractor={(item) => item.wallet_id}
          renderItem={({ item }) => (
            <WalletList {...item} update={toggleFlag} />
          )}
          style={{ paddingHorizontal: 20, marginTop: 15 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black
  },
  top: {
    width: "100%",
    height: "30%",
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center"
  },
  bottom: {
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  amount: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 46,
    fontFamily: "nsb"
  },
  amountText: {
    color: Colors.whiteFade,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "park-r"
  },
  walletContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 15
  },
  myWalletText: {
    color: Colors.white,
    fontSize: 23,
    fontFamily: "park-m"
  }
});
export default Wallet;
