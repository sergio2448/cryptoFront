import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import { Navigator } from './src/navigator/Navigator'
import { TransactionsProvider } from './src/context/TransactionsContext';

const Stack = createNativeStackNavigator()

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <TransactionsProvider>{ children }</TransactionsProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}

export default App;