import React, { useContext, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'
import Background from '../components/Background'
import WhiteLogo from '../components/WhiteLogo'
import loginStyles from '../theme/loginTheme'
import useForm from '../hooks/useForm'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'

interface Props extends NativeStackScreenProps<any, any> {}

const LoginScreen = ({ navigation }: Props) => {

  const { signIn, errorMessage, removeError } = useContext(AuthContext)

  const { email, password, onChange, form } = useForm ({
    email: '',
    password: ''
  })

  useEffect(() => {
    if( errorMessage.length === 0 ) return;

    Alert.alert('Login incorrecto', errorMessage,
    [
      {
        text: 'Ok',
        onPress: removeError
      }
    ]
    )

  }, [ errorMessage ])
  

  const onLogin = () => {
    Keyboard.dismiss()

    signIn({ email, password })

  }

  const handleLogin = () => {
    signIn(form)
    navigation.navigate('TransactionsNavigator')
  }

  return (
    <>
      <Background />
      <View style={loginStyles.formContainer}>
        <WhiteLogo />
        <Text style={loginStyles.title}>Login</Text>
        <Text style={loginStyles.label}>Email:</Text>
        <TextInput
          placeholder='Ingrese su email:'
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType='email-address'
          underlineColorAndroid='white'
          selectionColor='white'
          onChangeText={(value) => onChange(value, 'email')}
          value={email}
          onSubmitEditing={onLogin}
          autoCapitalize='none'
          autoCorrect={false}
        />
        
        <Text style={loginStyles.label}>Password:</Text>
        <TextInput
          placeholder='***********'
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid='white'
          secureTextEntry
          selectionColor='white'
          onChangeText={(value) => onChange(value, 'password')}
          value={password}
          onSubmitEditing={onLogin}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={ () => handleLogin()}
          >
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default LoginScreen