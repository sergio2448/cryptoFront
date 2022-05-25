import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import loginStyles from "../theme/loginTheme";
import useForm from "../hooks/useForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { TransactionsContext } from "../context/TransactionsContext";
import { AuthContext } from "../context/AuthContext";

interface Props extends NativeStackScreenProps<any, any> {}

const FormScreen = ({ navigation }: Props) => {
  const { loadTransactions, bitcoin, transactions } =
    useContext(TransactionsContext);
  const { ...state } = useContext(AuthContext);

  const [coin, setCoin] = useState("");
  const [amont, setAmont] = useState("");

  const {
    type_transaction,
    type_coin_send,
    type_coin_get,
    onChange,
    onValueChange,
    form,
  } = useForm({
    type_transaction: "",
    type_coin_send: "",
    type_coin_get: "",
  });

  const handleTransaction = (value: any) => {
    onChange(value, "type_transaction");
  };

  const handleCoin = (value: any) => {
    setCoin(value);
    if (type_transaction === "sell") {
      value === "btc"
        ? onValueChange("usd", value, "type_coin_get", "type_coin_send")
        : onValueChange("btc", value, "type_coin_get", "type_coin_send");
    } else {
      value === "btc"
        ? onValueChange(value, "usd", "type_coin_get", "type_coin_send")
        : onValueChange(value, "btc", "type_coin_get", "type_coin_send");
    }
  };

  const data1 = async () => {
    let bala = await axios({
      url: `https://guarded-cliffs-22069.herokuapp.com/user/update/${state.id}`,
      method: "Put",
      headers: {
        Authorization: `Bearer ${state.auth_token}`,
        "Content-Type": "application/json",
      },
      data: {
        user: {
          type_transaction,
          type_coin_send,
          type_coin_get,
          btc: parseFloat(amont),
          usd: parseFloat(amont),
        },
      },
    });

    setAmont("");
    setCoin("");
    handleTransaction("");
    alert(bala.data.message);
  };

  const handleSearch = () => {
    loadTransactions(state.id);
    navigation.navigate("TransactionsScreen");
  };

  return (
    <View style={loginStyles.formContainer}>
      <Text style={loginStyles.title}>Transaction</Text>

      <Text style={loginStyles.label}>Type of transaction:</Text>
      <Picker
        selectedValue={type_transaction}
        onValueChange={(value) => handleTransaction(value)}
      >
        <Picker.Item label="Select" value="Select" />
        <Picker.Item label="BUY" value="buy" />
        <Picker.Item label="SELL" value="sell" />
      </Picker>

      <Text style={loginStyles.label}>Type of coin:</Text>
      <Picker selectedValue={coin} onValueChange={(value) => handleCoin(value)}>
        <Picker.Item label="Select" value="Select" />
        <Picker.Item label="BTC" value="btc" />
        <Picker.Item label="USD" value="usd" />
      </Picker>

      <Text style={loginStyles.label}>Amount:</Text>
      <TextInput
        placeholder="Input the amount"
        placeholderTextColor="rgba(255,255,255,0.4)"
        underlineColorAndroid="white"
        selectionColor="white"
        onChangeText={(value) => setAmont(value)}
        value={amont}
        autoCapitalize="none"
        autoCorrect={false}
        style={{ color: "white", justifyContent: "center" }}
      />

      <View style={{ alignItems: "center" }}>
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={() => data1()}
          >
            <Text style={loginStyles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleSearch()}
          activeOpacity={0.8}
          style={{
            borderWidth: 2,
            borderColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 100,
            marginTop: 20,
          }}
        >
          <Text style={loginStyles.buttonText}>Search Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Text
            style={{
              marginTop: 50,
              fontSize: 30,
              color: "white",
            }}
          >
            Bitcoin: {bitcoin}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormScreen;
