import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/sessionStore";
import { router } from "expo-router";
import { useRefreshStore } from "@/store/refreshStore";

const AddNewWallet = () => {
  const [walletName, setWalletName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { user_id } = useSessionStore();
  const { toggleRefreshFlag } = useRefreshStore();

  const addWalletHandler = async () => {
    setLoading(true);
    try {
      if (!walletName && !amount) {
        Alert.alert("Fill the Necessary Information.");
        return;
      }
      const { data, error } = await supabase
        .from("wallets")
        .insert([
          {
            wallet_name: walletName,
            expense: 0,
            income: 0,
            total_amount: amount,
            user_id: user_id
          }
        ])
        .select();
      if (data) {
        toggleRefreshFlag();
        router.back();
      }
    } catch (err) {
      Alert.alert("Error while creating wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(38,39,39,255)", "rgba(29,28,29,255)"]}
        style={styles.background}
      />
      <View style={styles.main}>
        <View style={styles.content}>
          <View>
            <Text style={styles.labelText}>Name</Text>
            <CustomInput
              placeholder="Enter Wallet Name"
              value={walletName}
              onChange={setWalletName}
              inputMode="text"
            />
          </View>
          <View>
            <Text style={styles.labelText}>Amount</Text>
            <CustomInput
              placeholder="Enter Amount"
              value={amount}
              onChange={setAmount}
              inputMode="text"
            />
          </View>
        </View>
        <View>
          <CustomButton
            title={loading ? "Creating..." : "Create Wallet"}
            onPress={addWalletHandler}
            customStyle={{ width: "100%" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  main: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingTop: 20,
    alignItems: "center"
  },
  content: {
    gap: 15,
    width: "100%"
  },
  labelText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "park-m",
    padding: 3
  }
});
export default AddNewWallet;
