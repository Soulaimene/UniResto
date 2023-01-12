import { StatusBar } from 'expo-status-bar';
import {Image, SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useState } from 'react';


export default function App() {
  
const [IsSecureEntry,setIsSecure]=useState(true);
const [IsSecureEntry2,setIsSecure2]=useState(true);

  return (

    <SafeAreaView style={{flex:1 , justifyContent : "center"}}>

      <View style={{paddingHorizontal:0}}>
        <View style={{backgroundColor:"#ccc",paddingTop:25,paddingBottom:35}}>
          <Text style={{textAlign:'center',fontSize:25,fontWeight:'500'}}>
            Scan QR Code 
          </Text>
          <Text style={{color:"#666",marginLeft:15,marginTop:15}}>You affirm that you are paying for your meal by scanning this QR code.</Text>
        </View>
      </View>
      <View style={{alignItems:'center'}}>
        <Image style={{resizeMode : "center",height: 300, width: 300,marginTop:40}} source = {require('../images/QRCODe.png')} />
      </View>
      <View style={{marginHorizontal:25}}>
        <TouchableOpacity style={{
          paddingVertical:20,
          marginHorizontal:15,
          marginTop:40,
          backgroundColor:"#E93C49",
          borderRadius:10,
          }}>
          <Text style={{color:"#fff",textAlign:"center"}}> Scan </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
 
  );
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#fff',
    alignItems: 'center',
   
    

    
  },
});
