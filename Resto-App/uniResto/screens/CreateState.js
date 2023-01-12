import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button,Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { SelectList } from 'react-native-dropdown-select-list'
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from 'react-native-select-dropdown'
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';

export default function CreateState({navigation}) {

  
//________________________Variables_________________________

const [principal,setPrincipal]=useState("");
const [desert,setDesert]=useState("");
const [salad,setSalad]=useState("");
const [meat,setMeat]=useState("");
const [supliment,setSup]=useState("");


const url = "http://10.0.2.2:8000"

//__________________Functions______________________________


const createS = async () => {
 
  // const data = new FormData();
  // data.append('principal', principal);
  // data.append('desert', desert);
  // data.append('salad', salad);
  // data.append('meat', meat);
  // data.append('supliment', supliment);
  const searchParams = new URLSearchParams();
  searchParams.append('principal', principal);
  searchParams.append('desert', desert);
  searchParams.append('salad', salad);
  searchParams.append('meat', meat);
  searchParams.append('supliment', supliment);

  
const endpoint =`http://10.0.2.2:8000/restorantState/?${searchParams.toString()}`;
  
  await axios.post(endpoint, { headers: {"content-type": "application/json"} })
  
  .then(result => {
   console.log(result.data)
 
   navigation.navigate('HomeWorker',result.data);
   
  })
  .catch(err => {
      console.log(err.response.data)
    })
  }

  return (

    <ScrollView>
      <SafeAreaView style={{flex:1 , justifyContent : "center",flexDirection: "column"}}>

      <View style={{paddingHorizontal:25}}>
        <View style={styles.container}>
          <Text style={{fontSize:28, marginTop:40}}>Create State </Text>
        </View>

           {/*_______________________ Full Principal Section ___________________________*/}
                  <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:80,marginBottom:20}}>
                    <TextInput 
                      value={principal}
                      onChangeText={text =>setPrincipal(text)}
                      placeholder=' Principal' 
                    style={{flex:1}}/>
                    
                    
                    <StatusBar style="auto" />
                  </View>
         {/*___________________________________________________________________________*/}


           {/*____________________________ Desert section _______________________*/}

                <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20,marginBottom:20}}>
                  <TextInput 
                          value={desert}
                          onChangeText={text =>setDesert(text)}
                          placeholder='  Desert' 
                  style={{flex:1}}/>
                  
                  <StatusBar style="auto" />
                </View>
        {/*___________________________________________________________________________*/}

          {/* _______________________________Salad section_____________________________*/}

                <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20,marginBottom:20}}>
                  <TextInput 
                  value={salad}
                  placeholder='  Salad' 
                  style={{flex:1}}
                  onChangeText={text =>setSalad(text)}
                  />
                  
                </View>
               
        {/*_________________________________________________________________________________*/}

          {/* _______________________________Meat section_____________________________*/}

          <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20,marginBottom:20}}>
                  <TextInput 
                  value={meat}
                  placeholder='  Meat' 
                  style={{flex:1}}
                  onChangeText={text =>setMeat(text)}
                  />
                  
                </View>
        {/*_________________________________________________________________________________*/}

            {/* _______________________________Supliment section_____________________________*/}

            <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20,marginBottom:20}}>
                  <TextInput 
                  value={supliment}
                  placeholder='  Supliment' 
                  style={{flex:1}}
                  onChangeText={text =>setSup(text)}
                  />
                  
                </View>
        {/*_________________________________________________________________________________*/}
             
      {/*___________________________________________________________________________*/}
      
                            {/* Create state button */}
      <TouchableOpacity onPress={() => createS()} style={{
        paddingVertical:20,
        marginTop:30,
        backgroundColor:"#E93C49",
        borderRadius:10,
        }}>
        <Text style={{color:"#fff",textAlign:"center"}}> Create State</Text>
      </TouchableOpacity>

    </View>
                                {/* Already have an account ? */}

        
     
      </SafeAreaView>
    </ScrollView>
   

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
});
