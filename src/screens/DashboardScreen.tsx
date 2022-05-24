import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Background from '../components/Background'
import WhiteLogo from '../components/WhiteLogo'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import loginStyles from '../theme/loginTheme'
import { useContext } from 'react'
import { TransactionsContext } from '../context/TransactionsContext'

interface Props extends NativeStackScreenProps<any, any> {}

const DashboardScreen = ({ navigation }: Props) => {

  const { bitcoin } = useContext( TransactionsContext)

  return (
    <View style={styles.container}>
      <Background />
      <WhiteLogo />
      <View>
        <Text style={styles.item}>Bitcoin: {bitcoin}</Text>
        
      </View>
      <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={ () => navigation.navigate('Register') }
          >
            <Text style={loginStyles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={ () => navigation.navigate('Login') }
          >
            <Text style={loginStyles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  item: {
    fontSize: 30,
    color: 'white'
  },
})