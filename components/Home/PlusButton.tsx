import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomButton from "../common/CustomButton";
import { expenseCategory, expenseTypes, wallets } from "@/constants/data";
import DropDown from "../common/DropDown";
import DatePicker from "../common/DatePicker";
import CustomInput from "../common/CustomInput";
import { useWalletStore } from "@/store/walletStore";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/sessionStore";
import Toast from "react-native-toast-message";
import { useRefreshStore } from "@/store/refreshStore";
import { LinearGradient } from "expo-linear-gradient";

const width = Dimensions.get("window").width;

const PlusButton = () => {
  const [visible, setVisible] = useState(false);
  const [expenseType, setExpenseType] = useState("");
  const [expensesCategory, setExpensesCategory] = useState("");
  const [wallet, setWallet] = useState("");
  const [walletId, setWalletId] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { walletData } = useWalletStore();
  const { user_id } = useSessionStore();
  const { toggleRefreshFlag } = useRefreshStore();

  // @ts-ignore
  const id: number = walletData[walletId - 1]?.wallet_id || 0;

  interface WalletDataProps {
    id: number;
    label: string;
    value: string;
    key: number;
    color: string;
  }
  const walletsData: WalletDataProps[] = [];

  interface WalletProps {
    wallet_name: string;
    wallet_id: number;
  }

  walletData.forEach((wallet: WalletProps) => {
    walletsData.push({
      id: wallet.wallet_id,
      label: wallet.wallet_name || "Unnamed Wallet",
      value: wallet.wallet_name || "unknown",
      key: wallet.wallet_id || 0,
      color: "white"
    });
  });

  const transactionAddedToast = () => {
    Toast.show({
      type: "success",
      text1: "Transaction Added Successfully✔️✔️"
    });
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (
        !expensesCategory &&
        !expenseType &&
        !wallet &&
        !selectedDate &&
        !amount
      ) {
        Alert.alert("Fill all the necessary data.");
        return;
      }
      const { data, error } = await supabase
        .from("expenses")
        .insert([
          {
            user_id: user_id,
            type: expenseType,
            wallet_id: id,
            expense_category: expensesCategory,
            date: selectedDate,
            amount: Number(amount),
            description: description
          }
        ])
        .select();
      if (error) {
        Alert.alert("Error while adding the transaction.", error.message);
        return;
      }
      if (data) {
        await supabase.from("allMoney").insert([
          {
            user_id: user_id,
            wallet_id: id,
            income: expenseType === "income" ? amount : 0,
            expense: expenseType === "expense" ? amount : 0
          }
        ]);
      }
      transactionAddedToast();
      toggleRefreshFlag();
      setVisible(!visible);
    } catch (err) {
      Alert.alert("Error from the submit Handler.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.plus}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <AntDesign name="pluscircle" size={49} color={Colors.parrotgreen} />
      </TouchableOpacity>
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={["rgba(38,38,38,255)", "rgba(33,33,32,255)"]}
              style={styles.background}
            />
            <View style={styles.headingBar}>
              <TouchableOpacity onPress={() => setVisible(!visible)}>
                <Ionicons
                  name="arrow-back-circle"
                  size={34}
                  color={Colors.parrotgreen}
                />
              </TouchableOpacity>
              <Text style={styles.addText}>Add Transactions</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.expenseTypeContainer}>
                <Text style={styles.labelText}>Type</Text>
                <DropDown
                  data={expenseTypes}
                  onChange={setExpenseType}
                  text="Select Expense Types"
                />
              </View>
              <View style={styles.expenseTypeContainer}>
                <Text style={styles.labelText}>Wallet</Text>
                <DropDown
                  data={walletsData}
                  onChange={setWallet}
                  onChange2={setWalletId}
                  text="Choose Wallet"
                />
              </View>
              <View style={styles.expenseTypeContainer}>
                <Text style={styles.labelText}>Expense Category</Text>
                <DropDown
                  data={expenseCategory}
                  onChange={setExpensesCategory}
                  text="Select Expense Category"
                />
              </View>
              <View style={styles.expenseTypeContainer}>
                <Text style={[styles.labelText, { paddingBottom: 5 }]}>
                  Date
                </Text>
                <DatePicker setSelectedDate={setSelectedDate} />
              </View>
              <View style={styles.expenseTypeContainer}>
                <Text style={[styles.labelText, { paddingBottom: 5 }]}>
                  Amount
                </Text>
                <CustomInput
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={setAmount}
                  inputMode="text"
                  customStyle={{ height: 68 }}
                />
              </View>
              <View style={styles.expenseTypeContainer}>
                <Text style={[styles.labelText, { paddingBottom: 5 }]}>
                  Description (Optional)
                </Text>
                <CustomInput
                  placeholder="Write Description"
                  value={description}
                  onChange={setDescription}
                  inputMode="text"
                  customStyle={{ height: 68 }}
                />
              </View>
              <View
                style={[styles.expenseTypeContainer, { marginBottom: 190 }]}
              >
                <Text style={[styles.labelText, { paddingBottom: 5 }]}>
                  Receipt (optional)
                </Text>
                <View style={styles.uploadBox}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={35}
                    color={Colors.whiteFade}
                    style={{ textAlign: "center" }}
                  />
                  <Text style={{ color: Colors.white, fontFamily: "nr" }}>
                    Upload images
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.submitBtnContainer}>
              <CustomButton
                title={loading ? "Adding..." : "Submit"}
                onPress={submitHandler}
                customStyle={{ width: "100%" }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  plus: {
    position: "absolute",
    bottom: 10,
    left: width - 80,
    zIndex: 30
  },
  modalContainer: {
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
  modalContent: {
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden"
  },
  submitBtnContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "#1e1e1e",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.whiteFade
  },
  headingBar: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  addText: {
    fontSize: 25,
    fontFamily: "park-m",
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
    fontFamily: "park-r",
    padding: 2
  },
  uploadBox: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.whiteFade,
    borderRadius: 10,
    backgroundColor: "#373737",
    flexDirection: "row",
    gap: 10
  }
});
export default PlusButton;
