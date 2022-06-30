import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import WhiteLogo from "../components/WhiteLogo";
import useForm from "../hooks/useForm";
import loginStyles from "../theme/loginTheme";
import axios from "axios";

interface Props extends NativeStackScreenProps<any, any> {}

const RegisterScreen = ({ navigation }: Props) => {
  const { email, password, username, onChange, onValueChanged } = useForm({
    email: "",
    username: "",
    password: "",
  });

  const onRegister = () => {
    //Keyboard.dismiss()
    //signIn({ email, password })
  };

  const register = async () => {
    let userData = await axios({
      url: `https://guarded-cliffs-22069.herokuapp.com/user`,
      method: "Post",
      data: {
        user: {
          email,
          username,
          btc: 0.1,
          usd: 1000,
          password,
        },
      },
    });
    onValueChanged("", "", "", "password", "username", "email");
    alert("User created");
  };

  return (
    <>
      <View style={loginStyles.formContainer}>
        <WhiteLogo />
        <Text style={loginStyles.title}>Register</Text>

        <Text style={loginStyles.label}>Username:</Text>
        <TextInput
          placeholder="Enter your username:"
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid="white"
          selectionColor="white"
          onChangeText={(value) => onChange(value, "username")}
          value={username}
          onSubmitEditing={onRegister}
          autoCapitalize="words"
          autoCorrect={false}
          style={{ color: "white" }}
        />

        <Text style={loginStyles.label}>Email:</Text>
        <TextInput
          placeholder="Enter your email:"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="email-address"
          underlineColorAndroid="white"
          selectionColor="white"
          onChangeText={(value) => onChange(value, "email")}
          value={email}
          onSubmitEditing={onRegister}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ color: "white" }}
        />

        <Text style={loginStyles.label}>Password:</Text>
        <TextInput
          placeholder="***********"
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid="white"
          secureTextEntry
          selectionColor="white"
          onChangeText={(value) => onChange(value, "password")}
          value={password}
          onSubmitEditing={onRegister}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ color: "white" }}
        />
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={() => register()}
          >
            <Text style={loginStyles.buttonText}>Create Acount</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={loginStyles.buttonReturn}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={loginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterScreen;
