//import
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from "@react-native-community/netinfo"
import { useEffect } from 'react';
//import Firebase functions
import { initializeApp } from "firebase/app"
import { disableNetwork, enableNetwork, initializeFirestore } from "firebase/firestore"
//import React Native functions
import { Alert, StyleSheet } from 'react-native';

//import components
import { Start } from './components/Start/Start';
import { Chat } from './components/Chat/Chat';

const App = () => {
  // Create the navigator
  const Stack = createNativeStackNavigator();

  // App's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBWsuTLZ-nlzvdEc4LoD0XX8GA2rgWhm7c",
    authDomain: "chat-app-cfff2.firebaseapp.com",
    projectId: "chat-app-cfff2",
    storageBucket: "chat-app-cfff2.appspot.com",
    messagingSenderId: "672617452320",
    appId: "1:672617452320:web:325616e3f3369556387d45"
  };

  //Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
  })

  //Network Connection Status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if(connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!")
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


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
        >
          {props => <Chat 
            db={db} 
            {...props} 
            isConnected={connectionStatus.isConnected} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;