import { StatusBar } from 'expo-status-bar';
import {Image, KeyboardAvoidingView,SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import axios from 'axios';
import { useState ,useEffect} from 'react';
import { url } from './config';
import COLORS from '../constants/colors';


export default function Edinar({navigation}) {
const [nb_tickets,setnb]=useState(0)
const [password,setpass]=useState('')
const [name,setname]=useState('')
//   const data = new FormData();

// data.append('nb_tickets', nb_tickets);
// data.append('accountPassword', password);
// data.append('accountName', name);
data = {"nb_tickets":nb_tickets,
        "accountName":name,
        "accountPassword":password
        }

  return (

    <ScrollView >
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""} enabled style={{flex:1,justifyContent : "center"}}>

      <View style={{flex:2,backgroundColor:COLORS.dark}}>
      <View style={{alignItems:'center'}}>
        <Image style={{resizeMode : "stretch",height:150, width: 300,marginTop:10}} source = {require('../images/jeuneCard.png')} />
      </View>
      </View>

      <View style={{flex:3,backgroundColor:"#fff" ,borderTopLeftRadius: 50,borderTopRightRadius: 50}}>
        <View style={{marginTop:40,marginHorizontal:40,}}>

                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight:'600',fontSize:16}}>Next Payement</Text>
                  <MaterialCommunityIcons  name='plus-box' size={30} color="#666" style={{marginLeft:130}}/>
                </View>

            <TextInput style={{borderBottomWidth:1,borderBottomColor:"#ccc",marginTop:16,fontSize:15,fontWeight:'500',color:'#666'}}
            placeholder='  Account Name' 
             value={name}
          onChangeText={text=>setname(text)}
        />

            <TextInput style={{borderBottomWidth:1,borderBottomColor:"#ccc",marginTop:20,fontSize:15,fontWeight:'500',color:'#666'}}
                        placeholder='  Password' 
                        value={password}
                        secureTextEntry={true}
                        onChangeText={text=>setpass(text)}      />
       
        
            



            <View style={{alignItems:"center"}}>


             

              <View style={{marginLeft:15}}>
                
                <TextInput style={{marginTop:16,fontSize:13,fontWeight:'500',borderBottomWidth:1,borderBottomColor:"#ccc"}}
                        placeholder='  Number of Tickets ' 
                        value={nb_tickets}
                        keyboardType="numeric"
                        onChangeText={a=>setnb(a)}
                />
                <View style={{flexDirection:"row"}}>

           
              
                </View>
              </View>
            </View>
        <TouchableOpacity 
        onPress={()=>axios.post(url+'/purchase/',data,{ headers: { 'Content-Type': 'application/json' } }).then(resp => navigation.navigate("HomeStudent"))}
        style={{
        paddingVertical:10,
        marginTop:40,
        backgroundColor:COLORS.red,
        borderRadius:10,
        }}>
        <Text style={{color:"#fff",textAlign:"center"}}>Proceed Payement</Text>
        </TouchableOpacity>
        
        </View>
      </View>
      </KeyboardAvoidingView>

    </ScrollView>

 
  );
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#E93C49',
    alignItems: 'center',
   
    

    
  },
});
