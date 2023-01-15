import { StatusBar } from 'expo-status-bar';
import {Image, KeyboardAvoidingView,SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import axios from 'axios';
import { useState ,useEffect} from 'react';
import { url } from './config';
import COLORS from '../constants/colors';


export default function Menu({navigation}) {
  const [menurReq,setMenu]=useState('')
  useEffect(()=>{
    axios.get(url+"/restorantState/meal").then(resp=>
      setMenu(<View style={{flexDirection:"column",justifyContent: 'center'}}>
          <View>
      <View style={{}}>
        <Text style={styles.rowText1}>Principal :</Text>
        <Text style={styles.rowText}>{resp.data.principal}</Text>
     
      </View>
      <View style={{}}>
        <Text style={styles.rowText1}>Meat :</Text>
        <Text style={styles.rowText}>{resp.data.meat}</Text>
        
      </View>
      <View style={{}}>
        <Text style={styles.rowText1}>Desert :</Text>
        <Text style={styles.rowText}>{resp.data.desert}</Text>
        
      </View>
      <View style={{}}>
        <Text style={styles.rowText1 }>Salad :</Text>
        <Text style={styles.rowText}>{resp.data.salad}</Text>
        
      </View>
      <View style={{}}>
        <Text style={styles.rowText1 }>Suppliment :</Text>
        <Text style={styles.rowText}>{resp.data.supliment}</Text>
        
      </View>
    </View>
    </View>)
      )
  },[])

  return (
    <ScrollView style={styles.container}>
      <View>{menurReq}</View>
    
  </ScrollView>
);
}
 
  


const styles = StyleSheet.create({
  container: {
  
    backgroundColor: COLORS.dark,


    
  },
  rowText:{
    marginRight:20,
    marginLeft:20,
    marginTop:20,
    color:COLORS.white
    
  },
  rowText1:{
    marginRight:20,
    marginLeft:20,
    marginTop:20,
    fontWeight:"bold",
    color:COLORS.red
   
    
  }
});
