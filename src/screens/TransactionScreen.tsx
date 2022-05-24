import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { changecoin } from "../components/ChangeCoin";
import { TransactionsStackParams } from "../navigator/TransactionsNavigator";

interface Props
  extends NativeStackScreenProps<
    TransactionsStackParams,
    "TransactionScreen"
  > {}

const TransactionScreen = ({ navigation, route }: Props) => {
  const {
    type_transaction,
    type_coin_send,
    type_coin_get,
    amont_to_send,
    amont_to_get,
    created_at,
  } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: type_transaction.toUpperCase(),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type coin send: {type_coin_send}</Text>
      <Text style={styles.label}>Type coin get: {type_coin_get}</Text>
      <Text style={styles.label}>
        Amount sent:{" "}
        {type_coin_send === "usd"
          ? changecoin("usd", amont_to_send)
          : changecoin("btc", amont_to_send)}
      </Text>
      <Text style={styles.label}>
        Received amount:{" "}
        {type_coin_send === "usd"
          ? changecoin("btc", amont_to_get)
          : changecoin("usd", amont_to_get)}
      </Text>
      <Text style={styles.label}>Date: {created_at}</Text>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
    justifyContent: "space-evenly",
    backgroundColor: "#5856D6",
  },
  label: {
    fontSize: 18,
    borderBottomColor: "rgba(0,0,0,0.1)",
    color: "white",
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
});
