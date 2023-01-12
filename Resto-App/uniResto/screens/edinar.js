import { StatusBar } from 'expo-status-bar';
import {Image, KeyboardAvoidingView,SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { useState } from 'react';


export default function Edinar() {
  

  return (

    <SafeAreaView style={{flex:1 , justifyContent : "center",backgroundColor:"#E93C49"}}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""} enabled style={{flex:1,justifyContent : "center"}}>

      <View style={{flex:2,backgroundColor:"#E93C49"}}>
      <View style={{alignItems:'center'}}>
        <Image style={{resizeMode : "stretch",height: 200, width: 300,marginTop:80}} source = {require('../images/jeuneCard.png')} />
      </View>
      </View>

      <View style={{flex:3,backgroundColor:"#fff" ,borderTopLeftRadius: 50,borderTopRightRadius: 50}}>
        <View style={{marginTop:40,marginHorizontal:40,}}>
            <View style={{flexDirection:"row"}}>
              <Text style={{fontWeight:'600',fontSize:16}}>Next Payement</Text>
              <MaterialCommunityIcons  name='plus-box' size={30} color="#666" style={{marginLeft:130}}/>
            </View>
            <Text style={{marginTop:16,fontSize:15,fontWeight:'500',color:'#666'}}>Card Number</Text>
            <View style={{ flexDirection:"row", backgroundColor:"#ccc",borderRadius:12,marginTop:12,paddingBottom:20}}>
              <TextInput 
                    placeholder='' 
                    keyboardType="numeric"
                    style={{flex:1,marginLeft:12}}/>
            </View>
            
            <Text style={{marginTop:16,fontSize:15,fontWeight:'500',color:'#666'}}>Password</Text>
            <View style={{ flexDirection:"row", backgroundColor:"#ccc",borderRadius:12,marginTop:12,paddingBottom:20}}>
              <TextInput 
                    placeholder='' 
                    secureTextEntry={true}
                    style={{flex:1,marginLeft:12}}/>
            </View>


            <View style={{flexDirection:"row"}}>


              <View>
                <Text style={{marginTop:16,fontSize:14,fontWeight:'500',color:'#666',marginLeft:12}}>CVV</Text>
                <View style={{flexDirection:"row"}}>

                   <View style={{backgroundColor:"#ccc",borderRadius:12,marginTop:12,height:50,width:80}}>
                      <TextInput 
                        placeholder='' 
                       keyboardType="numeric"
                       secureTextEntry={true}
                       style={{flex:1,marginLeft:12}}/>
                    </View>
                </View>
              </View>

              <View style={{marginLeft:15}}>
                <Text style={{marginTop:16,fontSize:14,fontWeight:'500',color:'#666'}}>Expire Date</Text>
                <View style={{flexDirection:"row"}}>

                  <View style={{backgroundColor:"#ccc",borderRadius:12,marginTop:12,height:50,width:100}}>
                      <TextInput 
                        placeholder='' 
                        style={{flex:1,marginLeft:12}}/>
                  </View>
              
                </View>
              </View>

              <View style={{marginLeft:15}}>
                <Text style={{marginTop:16,fontSize:13,fontWeight:'500',color:'#666'}}>Number of Tickets</Text>
                <View style={{flexDirection:"row"}}>

                  <View style={{backgroundColor:"#ccc",borderRadius:12,marginTop:12,height:50,width:150,marginRight:5}}>
                      <TextInput 
                        placeholder='' 
                        keyboardType="numeric"
                        style={{flex:1,marginLeft:12}}/>
                  </View>
              
                </View>
              </View>
            </View>
        <TouchableOpacity style={{
        paddingVertical:10,
        marginTop:40,
        backgroundColor:"#E93C49",
        borderRadius:10,
        }}>
        <Text style={{color:"#fff",textAlign:"center"}}>Proceed Payement</Text>
        </TouchableOpacity>
        
        </View>
      </View>
      </KeyboardAvoidingView>

    </SafeAreaView>

 
  );
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#E93C49',
    alignItems: 'center',
   
    

    
  },
});
