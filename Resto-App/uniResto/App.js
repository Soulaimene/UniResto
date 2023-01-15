import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView,SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Platform } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './routes/HomeStack';


export default function App() {
  
const [IsSecureEntry,setIsSecure]=useState(true);
const [email,SetEmail]=useState('')
const [password,SetPassword]=useState('')
const behavior=Platform.OS === "ios" ? "position" : "";

  return (


    <Navigator/>
 
  );
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
});

