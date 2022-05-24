import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from "../screens/LoginScreen";
import { TransactionsNavigator } from "./TransactionsNavigator";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const { status } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {status !== "authenticated" ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="TransactionsNavigator"
            component={TransactionsNavigator}
          />
        </>
      ) : (
        <Stack.Screen
          name="TransactionsNavigator"
          component={TransactionsNavigator}
        />
      )}
    </Stack.Navigator>
  );
};
