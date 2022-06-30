import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Balance = () => {
  const { ...state } = useContext(AuthContext);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderBottomColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 2,
      }}
    >
      <Text style={styles.container}>
        <Text style={styles.title}>Username:</Text> {"\n"}
        {state.username}
      </Text>
      <Text style={styles.container}>
        <Text style={styles.title}>Founds:</Text> {"\n"}
        {state.btc} {"\n"}
        {state.usd}
      </Text>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 20,
    left: -20,
    position: "relative",
  },
  container: {
    fontSize: 10,
    color: "white",
  },
});
