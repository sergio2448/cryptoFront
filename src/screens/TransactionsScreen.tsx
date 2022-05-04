import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { TransactionsContext } from '../context/TransactionsContext'
import { TransactionsStackParams } from '../navigator/TransactionsNavigator'

interface Props extends NativeStackScreenProps<TransactionsStackParams, 'TransactionsScreen'>{};

const TransactionsScreen = ({ navigation }: Props) => {

  const { transactions } = useContext( TransactionsContext )
  
  return (
    <View style={{ flex: 1, marginHorizontal: 10, backgroundColor: "#5856D6" }}>
      <FlatList
        data={ transactions }
        keyExtractor={ (t) => t.id.toString()}
        renderItem={ ({item}) => (
          <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ 
              () => navigation.navigate('TransactionScreen', {
                id: item.id,
                type_transaction: item.type_transaction,
                type_coin_send: item.type_coin_send,
                type_coin_get: item.type_coin_get,
                amont_to_send: item.amont_to_send,
                amont_to_get: item.amont_to_get,
                user_id: item.user_id,
                created_at: item.created_at.split('T')[0]
            })}
          >
            <Text style={styles.transactionDate}>{ item.created_at.split('T')[0] } {item.type_transaction}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={ () => (
          <View style={ styles.itemSeparator} />
        )}
      />
    </View>
  )
}

export default TransactionsScreen

const styles = StyleSheet.create({
  transactionDate: {
    fontSize: 20,
    color: 'white'
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  }
})