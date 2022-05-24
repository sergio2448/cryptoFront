import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionsScreen from "../screens/TransactionsScreen";
import TransactionScreen from "../screens/TransactionScreen";
import FormScreen from "../screens/FormScreen";

export type TransactionsStackParams = {
  TransactionsScreen: undefined;
  TransactionScreen: {
    id: number;
    type_transaction: string;
    type_coin_send: string;
    type_coin_get: string;
    amont_to_send: number;
    amont_to_get: number;
    user_id: number;
    created_at: string;
  };
  FormScreen: undefined;
};

const Stack = createNativeStackNavigator<TransactionsStackParams>();

export const TransactionsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FormScreen" component={FormScreen} />
      <Stack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{ title: "Transactions by date" }}
      />
      <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
    </Stack.Navigator>
  );
};
