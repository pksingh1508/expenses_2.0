import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";
import Dialog from "react-native-dialog";
import { useRefreshStore } from "@/store/refreshStore";

interface WalletListProps {
  wallet_id: number;
  wallet_name: string;
  expense: number;
  income: number;
  total_amount: number;
  created_at: string;
  user_id: string;
  update: () => void;
}

const WalletList = ({
  wallet_name,
  total_amount,
  wallet_id,
  update
}: WalletListProps) => {
  const [visible, setVisible] = useState(false);
  const [walletName, setWalletName] = useState(wallet_name || "");
  const [amount, setAmount] = useState(String(total_amount) || "");
  const [loading, setLoading] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { toggleRefreshFlag } = useRefreshStore();

  const showDialog = () => {
    setConfirmationVisible(true);
  };

  const handleCancel = () => {
    setConfirmationVisible(false);
  };

  const handleDelete = async () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    setDeleteLoading(true);
    const { error } = await supabase
      .from("wallets")
      .delete()
      .eq("wallet_id", wallet_id);
    if (error) {
      Alert.alert("Error while deleting the wallet");
      setDeleteLoading(false);
      return;
    }
    update();
    toggleRefreshFlag();
    walletDeletedToast();
    setDeleteLoading(false);
    setConfirmationVisible(false);
  };

  const walletUpdatedToast = () => {
    Toast.show({
      type: "success",
      text1: "Wallet Updated Successfully✔️✔️"
    });
  };
  const walletDeletedToast = () => {
    Toast.show({
      type: "success",
      text1: "Wallet Deleted Successfully✔️✔️"
    });
  };

  const updateHandler = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("wallets")
        .update({
          wallet_name: walletName,
          total_amount: amount
        })
        .eq("wallet_id", wallet_id)
        .select();
      if (error) {
        Alert.alert("Error while updating the wallet");
        return;
      }
      update();
      toggleRefreshFlag();
      setVisible(false);
      walletUpdatedToast();
    } catch (err) {
      Alert.alert("Error on Update Handler");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setVisible(!visible);
  };

  return (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <View style={styles.container}>
        <View style={styles.leftBox}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/wallet.png")}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.name}>{wallet_name}</Text>
            <Text style={styles.amount}>₹ {total_amount}</Text>
          </View>
        </View>
        <View>
          <FontAwesome6
            name="greater-than"
            size={20}
            color={Colors.whiteFade}
          />
        </View>
      </View>
      <Modal
        visible={visible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.top}>
            <Text style={{ color: "white", fontSize: 28, fontFamily: "nsb" }}>
              Update or Delete
            </Text>
          </View>
          <View style={styles.bottom}>
            <LinearGradient
              colors={["rgba(38,38,38,255)", "rgba(19,18,19,255)"]}
              style={styles.background}
            />
            <View style={styles.upperContainer}>
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
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.deleteBtn} onPress={showDialog}>
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ textAlign: "center" }}
                />
              </TouchableOpacity>
              <CustomButton
                title={loading ? "Updating..." : "Update Wallet"}
                onPress={updateHandler}
                customStyle={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Dialog.Container
          visible={confirmationVisible}
          onBackdropPress={handleCancel}
          onRequestClose={handleCancel}
          contentStyle={{
            backgroundColor: Colors.lightblack,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.blackFade
          }}
        >
          <Dialog.Title style={{ color: Colors.white, fontFamily: "park-m" }}>
            Delete Wallet?
          </Dialog.Title>
          <Dialog.Description style={{ color: Colors.whiteFade }}>
            Do you want to delete this Wallet? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={handleCancel}
            style={{ color: Colors.white, fontFamily: "nb", fontSize: 18 }}
          />
          <Dialog.Button
            label={deleteLoading ? "Deleting..." : "Delete"}
            onPress={handleDelete}
            style={{ fontFamily: "nb", fontSize: 18 }}
          />
        </Dialog.Container>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9
  },
  imageContainer: {
    width: 46,
    height: 46,
    backgroundColor: "white",
    borderRadius: 7,
    paddingHorizontal: 4,
    paddingVertical: 3
  },
  image: {
    width: 40,
    height: 40
  },
  leftBox: {
    flexDirection: "row",
    gap: 16
  },
  name: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "nsb"
  },
  amount: {
    color: Colors.whiteFade,
    fontSize: 15,
    fontFamily: "nm"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  top: {
    height: "25%",
    alignItems: "center",
    justifyContent: "center"
  },
  bottom: {
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  labelText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "park-m",
    padding: 3
  },
  upperContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 12
  },
  bottomContainer: {
    backgroundColor: "rgba(19,18,19,255)",
    borderWidth: 1,
    borderTopColor: Colors.blackFade,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  deleteBtn: {
    backgroundColor: "red",
    width: 65,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default WalletList;
