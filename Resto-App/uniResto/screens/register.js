import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button,Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { SelectList } from 'react-native-dropdown-select-list'
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from 'react-native-select-dropdown'

import { useState } from 'react';

export default function Register({navigation}) {

  
const [IsSecureEntry,setIsSecure]=useState(true);
const [IsSecureEntry2,setIsSecure2]=useState(true);


  const[index,setIndex]=useState(0);
	const [name,SetName]=useState("");
	const [password,Setpassword]=useState("");
	const [email,Setemail]=useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [errorpass, setErrorpass] = useState(null);
  const validateEmail = (email) => {
    let error = null;
    if (!email) {
      error = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error = 'Invalid email address';
    }
    setError(error);
    return error;
  }
  const validatePasswords = () => {
    let errorpass = null;
    if (password !== confirmPassword) {
      errorpass = 'Passwords do not match';
    }
    setErrorpass(errorpass);
    return errorpass; 
  }
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

	const insertData=() =>{
		fetch('http://10.0.2.2:8000/users/',{
			method:'POST',
			headers : {
				'Content-Type':'application/json'},
			body: JSON.stringify({email:email,name:name,is_worker:index,password:password})
		})
.then(resp => resp.json())
.then(console.log(JSON.stringify({email:email,name:name,is_worker:index,password:password})))
.catch(error => console.log(error))}




const pressHandler=() =>{
  navigation.goBack();
}

  return (

    <ScrollView>
      <SafeAreaView style={{flex:1 , justifyContent : "center",flexDirection: "column"}}>

      <View style={{paddingHorizontal:25}}>
        <View style={styles.container}>
          <Text style={{fontSize:28, marginTop:40}}>Create Account </Text>
        </View>

           {/*_______________________ Full name Section ___________________________*/}
                  <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:80,marginBottom:20}}>
                    <TextInput 
                      value={name}
                      onChangeText={name =>SetName(name)}
                    placeholder='  Full name' 
                    style={{flex:1}}/>
                    <MaterialIcons name='account-circle' size={20} color="#666" style={{marginLeft:20}}/>
                    <StatusBar style="auto" />
                  </View>
         {/*___________________________________________________________________________*/}


           {/*____________________________ Email address section _______________________*/}

                <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20,marginBottom:20}}>
                  <TextInput 
                          value={email}
                          onChangeText={email =>Setemail(email)}
                          onBlur={() => validateEmail(email)}
                          placeholder='  Email Address' 
                  style={{flex:1}}/>
                  {error && <Text style={styles.error}>{error}</Text>}
                  <MaterialIcons name='alternate-email' size={20} color="#666" style={{marginLeft:20}}/>
                  <StatusBar style="auto" />
                </View>
        {/*___________________________________________________________________________*/}

          {/* _______________________________Phone Number section_____________________________*/}

                <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20,marginBottom:20}}>
                  <TextInput 
                  placeholder='  Phone Number' 
                  style={{flex:1}}/>
                  <MaterialIcons name='phone' size={20} color="#666" style={{marginLeft:20}}/>
                </View>
        {/*___________________________________________________________________________*/}

         {/* ________________________________Password Section______________________________ */}
                <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20,marginBottom:20}}>
                  <TextInput 
                    value={password}
                    onChangeText={password =>Setpassword(password)}
                    onBlur={validatePasswords}
                    placeholder='  Password' 
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
      {/*___________________________________________________________________________*/}

       {/*______________________________ Confirm password section ______________________________*/}
            <View style={{ flexDirection:"row", borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:20,marginBottom:20}}>
                <TextInput 
                  placeholder='  Confirm Password' 
                  style={{flex:1}}
                  onChangeText={text => setConfirmPassword(text)}
                  onBlur={validatePasswords}
                  secureTextEntry={IsSecureEntry2}/>
      
                  <TouchableOpacity onPress={()=>{
                      setIsSecure2((prev) => !prev);
                    }}>
                    <Text style={{color:'#666'}}>
                      {IsSecureEntry2 ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                  
                  <Ionicons name='checkmark-circle' size={20} color="#666" style={{marginLeft:20}}/>
                  
                <StatusBar style="auto" />
                {errorpass && <Text style={styles.error}>{errorpass}</Text>}  
            </View>
       {/*______________________________DropDown____________________________________________________*/}
                      <SelectDropdown
                            value={selectedValue}
                            data={options}
                            onSelect={(selectedValue, indexa) => {
                              setIndex(indexa)
                            }}
                            
                          
                      />      
             
      {/*___________________________________________________________________________*/}
      
                            {/* Create account button */}
      <TouchableOpacity onPress={() => insertData()} style={{
        paddingVertical:20,
        marginTop:30,
        backgroundColor:"#E93C49",
        borderRadius:10,
        }}>
        <Text style={{color:"#fff",textAlign:"center"}}> Create Account</Text>
      </TouchableOpacity>

    </View>
                                {/* Already have an account ? */}

          <TouchableOpacity onPress={pressHandler} style={{flexDirection:'row',justifyContent:'flex-end',alignSelf: 'center',position:"relative",marginTop:20}}>
  
   <Text style={{color:"#666"}}> Already have an account?</Text>
   <Text style={{fontWeight:'700',color:"#E93C49"}}>  Login </Text>
 </TouchableOpacity>
     
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
