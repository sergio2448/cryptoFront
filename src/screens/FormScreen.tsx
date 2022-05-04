import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import loginStyles from '../theme/loginTheme'
import useForm from '../hooks/useForm'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'
import { TransactionsContext } from '../context/TransactionsContext'
import { AuthContext } from '../context/AuthContext'

interface Props extends NativeStackScreenProps<any, any>{};

const FormScreen = ({ navigation }: Props) => {
  
  const { loadTransactions, bitcoin } = useContext( TransactionsContext )
  const { ...state } = useContext( AuthContext )
  
  var pricebit = parseFloat(bitcoin) * 1000
  
  const {
    type_transaction,
    type_coin_send,
    type_coin_get,
    amont_to_send,
    amont_to_get,
    onChange,
    onValueChange
    } = useForm({
    type_transaction: '',
    type_coin_send: '',
    type_coin_get: '',
    amont_to_send: '',
    amont_to_get: '',
 });

 const handleChangeCoin = async() => {

  if ((type_transaction === 'sell' && type_coin_send === 'usd') || (type_transaction === 'buy' && type_coin_get === 'btc')) {

    var change = parseFloat(amont_to_get)
    var change1 = parseFloat(amont_to_get) * pricebit

    var change2 = amont_to_send !== '' ? parseFloat(amont_to_send) : change1

    var val1 = change2 <= parseFloat(state.usd) ? (
       await axios({
        url: `http://localhost:3000/user/update/${state.id}`,
        method: "Put",
        headers: {
         'Authorization': `Bearer ${state.auth_token}`,
         'Content-Type': 'application/json'
        },
        data: {
          btc: parseFloat(state.btc) + change,
          usd: parseFloat(state.usd) - change2
        },
      }),
      data1(),
      alert('Transacción exitosa')
      ) : (
        alert('fondos insuficientes')
        )

  } else if ((type_transaction === 'sell' && type_coin_send === 'btc') || (type_transaction === 'buy' && type_coin_get === 'usd')) {

    var change3 = parseFloat(amont_to_get)
    var change4 = parseFloat(amont_to_get) / pricebit
    var change5 = amont_to_send !== '' ? parseFloat(amont_to_send) : change4

    var val2 = change5 <= parseFloat(state.btc) ? (await axios({
      url: `http://localhost:3000/user/update/${state.id}`,
      method: "Put",
      headers: {
       'Authorization': `Bearer ${state.auth_token}`,
       'Content-Type': 'application/json'
      },
      data: {
        btc: parseFloat(state.btc) - change5,
        usd: parseFloat(state.usd) + change3
      },
    }),
    data1(),
    alert('Transacción exitosa')
    ) : (alert('fondos insuficientes'))
  } else {
    alert('Ha ocurrido un error, intente más tarde')
  }

}

 const handleTransaction = (value:any) => {
  onChange(value, 'type_transaction')
 }

 const handleCoin = (value:any) => {
  if (type_transaction === 'sell') {
    value === 'btc' ? onValueChange('usd', value, 'type_coin_get', 'type_coin_send') : onValueChange('btc', value, 'type_coin_get', 'type_coin_send')
  } else {
    value === 'btc' ? onValueChange(value, 'usd', 'type_coin_get', 'type_coin_send') : onValueChange(value, 'btc', 'type_coin_get', 'type_coin_send')
  }
 }

 const handleAmont = async(value:any) => {

  var p1 = parseFloat(value) * pricebit
  var p2 = parseFloat(value) / pricebit

  if (type_transaction === 'sell') {
    type_coin_send === 'btc' ? onValueChange(p1, parseFloat(value), 'amont_to_get', 'amont_to_send') : onValueChange(p2, parseFloat(value), 'amont_to_get', 'amont_to_send')
  } else {
    type_coin_get === 'btc' ? onValueChange(parseFloat(value), p1, 'amont_to_get', 'amont_to_send') : onValueChange(parseFloat(value), p2, 'amont_to_get', 'amont_to_send')
  }
 }

 const data1 = async() => {
  let bala = await axios({
   url: "http://localhost:3000/transactions",
   method: "Post",
   headers: {
    'Authorization': `Bearer ${state.auth_token}`,
    'Content-Type': 'application/json'
   },
   data: {
     transaction: {
      type_transaction,
      type_coin_send,
      type_coin_get,
      amont_to_send,
      amont_to_get,      
     }
   },
 });
 loadTransactions(state.id)
 }

 const handleSearch = () => {
  loadTransactions(state.id)
  navigation.navigate('TransactionsScreen')
 }

  return (
    <View style={ loginStyles.formContainer }>                

                    <Text style={ loginStyles.title }>Transaction</Text>

                    <Text style={ loginStyles.label }>Type of transaction:</Text>
                    <Picker
                      selectedValue={type_transaction}
                      onValueChange={( value ) => handleTransaction(value)}>
                      <Picker.Item label="Select" value="Select" />
                      <Picker.Item label="BUY" value="buy" />
                      <Picker.Item label="SELL" value="sell" />
                    </Picker>

                    <Text style={ loginStyles.label }>Type of coin:</Text>
                    <Picker
                      selectedValue={type_coin_send}
                      onValueChange={( value ) => handleCoin(value)}>
                      <Picker.Item label="Select" value="Select" />
                      <Picker.Item label="BTC" value="btc" />
                      <Picker.Item label="USD" value="usd" />
                    </Picker>

                    <Text style={ loginStyles.label }>Amont:</Text>
                    <Picker
                      selectedValue={amont_to_send}
                      onValueChange={(value) => handleAmont(value) }>
                      <Picker.Item label="Select" value="Select" />
                      <Picker.Item label="0.001 btc" value="0.001" />
                      <Picker.Item label="0.01 btc" value="0.01" />
                      <Picker.Item label="0.1 btc" value="0.1" /> 
                      <Picker.Item label="10 usd" value="10" />
                      <Picker.Item label="20 usd" value="20" />
                      <Picker.Item label="50 usd" value="50" />
                      <Picker.Item label="100 usd" value="100" />
                      <Picker.Item label="200 usd" value="200" />
                    </Picker>

                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={() => handleChangeCoin()}
                        >
                            <Text style={ loginStyles.buttonText } >Create</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                    >
                      
                        <Text style={{...loginStyles.buttonText,
                        top: 12,
                        bottom: 12
                        }}>Bitcoin: {bitcoin}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ () => handleSearch() }
                        activeOpacity={ 0.8 }
                        style={loginStyles.button}
                    >
                        <Text style={ loginStyles.buttonText  }>Search Trans</Text>
                    </TouchableOpacity>
                </View>
  )
}

export default FormScreen