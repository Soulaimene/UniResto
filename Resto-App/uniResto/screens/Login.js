import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView,SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Platform,ScrollView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown'
import COLORS from '../constants/colors';




export default function Login({navigation}) {
  const[index,setIndex]=useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedVal, setSelectedVal] = useState(0);
  const options = ["Student","Worker"];
  const [selectedOption, setSelectedOption] = useState(null);
  const [number, setNumber] = useState(0);

  function handleChange(value) {
    setSelectedOption(value);
    if (selectedOption === 'Worker') {
      setNumber(1);
    }
  }
  
const pressHandler=() =>{
  navigation.navigate('Register');
}
const [IsSecureEntry,setIsSecure]=useState(true);
const [email,SetEmail]=useState('')
const [password,SetPassword]=useState('')
const behavior=Platform.OS === "ios" ? "position" : "";
const [error, setError] = useState(null);
const data = new FormData();
data.append('username', email);
data.append('password', password);
data.append('client_id', index);


const login = async () => {
  
    await axios.post('http://10.0.2.2:8000/token/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(result => {
    if (result.data.access_token) {
      // Save the access_token in the header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`;
      axios.defaults.headers.post['Authorization'] = `Bearer ${result.data.access_token}`;
      if (index==0)
        {navigation.navigate('HomeStudent')}
      else 
        {navigation.navigate('HomeWorker')}
    }
    
}).catch(err => {
    console.log(err.response.data)
})
    
}


  return (
    <ScrollView>
    <SafeAreaView style={{flex:1 , justifyContent : "center",flexDirection: "column"}}>

      <View style={{paddingHorizontal:25}}>
        <View style={{marginTop:50,alignItems: 'center'}}>
          <Text style={{fontSize:28}}>Proceed with your </Text>
          <Text style={{fontWeight: "bold"}}>Login !  </Text>
        </View>

      <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:80}}>
        <TextInput 
          placeholder='  Email IDs' 
          value={email}
          onChangeText={text=>SetEmail(text)}
          style={{flex:1}}/>
          <MaterialIcons name='alternate-email' size={20} color="#666" style={{marginLeft:20}}/>

          <StatusBar style="auto" />
      </View>

    <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20}}>
      <TextInput 
        placeholder='  Password' 
        value={password}
        onChangeText={text=>SetPassword(text)}
        style={{flex:1}}

        secureTextEntry={IsSecureEntry}/>
 
      <TouchableOpacity onPress={()=>{
        setIsSecure((prev) => !prev);
      }}>
        <Text style={{color:'#666'}}>
          {IsSecureEntry ? "Show" : "Hide"}
        </Text>
      </TouchableOpacity>
      <Ionicons name='ios-lock-closed-outline' size={20} color="#666" style={{marginLeft:20}}/>
      <StatusBar style="auto" />

    </View>
    <View     style={{
                                alignItems:"center",
                                borderRadius: 5,
                                padding: 10,
                                margin: 10,
                              }}>
    <SelectDropdown       
                            value={selectedValue}
                            dropdownButtonStyle={{backgroundColor:"white"}}
                            dropdownStyle={{ backgroundColor: 'white', borderRadius: 8,marginTop:0}}
                            dropdownOverlayColor='rgba(255, 255, 255, 0.5)'
                            rowStyle={{ height: 40, justifyContent: 'center', alignItems: 'center',backgroundColor:"white" }}
                            rowTextStyle={{ color: 'black', fontSize: 18 }}
                            selectedRowStyle={{ backgroundColor: COLORS.red }}
                            selectedRowTextStyle={{ color: 'white' }}
                            data={options}
                            onSelect={(selectedValue, indexa) => {
                              setIndex(indexa)
                            }}
                            
                            
                          
                      />    
                      </View>
    <TouchableOpacity 
    onPress={()=>login()} 
    style={{
        paddingVertical:20,
        marginTop:40,
        backgroundColor:"#E93C49",
        borderRadius:10,
        
      }}>

        <Text style={{color:"#fff",textAlign:"center"}}> Login</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity>
      <Text style={{textDecorationLine: 'underline', color:"#666",textAlign:"center",marginTop:10}}>Forgot Password?</Text>
      
      </TouchableOpacity>
      <TouchableOpacity onPress={pressHandler} style={{flexDirection:'row',justifyContent:'flex-end',alignSelf: 'center',position:"relative",marginTop:30}}>
   
   <Text style={{color:"#666"}}> New to the App?</Text>
   <Text style={{fontWeight:'700',color:"#E93C49",}}>  Register </Text>
  </TouchableOpacity>
    </View>

    </SafeAreaView>
    </ScrollView>
   

 
  );
}

const styles = StyleSheet.create({
  container: {
  
    
    alignItems: 'center',
    
  },
  error:{
    color:"red",

  }
});
