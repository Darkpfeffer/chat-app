//import
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import components
import { Start } from './components/Start/Start';
import { Chat } from './components/Chat/Chat';

const App = () => {
  // Create the navigator
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'  
      >
        <Stack.Screen 
          name='Home'
          component={Start}
        />
        <Stack.Screen 
          name='Chat'
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;