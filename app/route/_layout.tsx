import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import CustomBackButton from "@/components/common/CustomBackButton";

const RouteLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="addNewWallet"
        options={{
          title: "Add Wallet",
          headerStyle: {
            backgroundColor: "black"
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: Colors.white,
            fontSize: 21,
            fontFamily: "nsb"
          },
          headerLeft: () => <CustomBackButton />
        }}
      />
    </Stack>
  );
};

export default RouteLayout;
