import React from 'react'
import { Image,SafeAreaView, StyleSheet, Text, TextInput, View, Button,ImageBackground, TouchableOpacity, Platform,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useState , useEffect} from 'react';
import { url } from './config';
import COLORS from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function HomeWorker({navigation}){


{/*_______________________ Variables ___________________________*/}
const [data, setData] = useState([]);
const [msgState,setmsg]=useState(null)
const [button, setButton] = useState(null);
const [params,setparams] = useState(null);
const [Statemsg,setStatemsg]=useState('');

const [x,setx]=useState(null);
const [logout,setLogout]=useState(null);
const [refresh, setRefresh] = useState(null);
const [ref,setref]=useState(false)
{/*_______________________ UseEffect ___________________________*/}

const [error, setError] = useState(null);

useEffect(() => {
  if (error && error.status === 401) {
    navigate.navigate('Login');
  }
}, [error]);



useEffect(()=>{
  setLogout(
    <View style={{position: 'absolute', right: 5, top: -20}}>
    <TouchableOpacity  style ={{backgroundColor: "#2080A0",opacity: 0.6,borderRadius:10,borderColor:"white",paddingHorizontal:9,paddingVertical:9,flexDirection:"row"}}onPress={()=>{ delete axios.defaults.headers.common["Authorization"]; navigation.navigate("Login");console.log( axios.defaults.headers.common["Authorization"])}} >
      <Icon name="logout" color={COLORS.white} size={15}/>
      <Text style={{color:"white",fontWeight:"bold",marginLeft:5}}>Log Out</Text>
    </TouchableOpacity>
    </View>
  )
},[])







useEffect(()=>{ // Manage or create State 
  setref(true)
  //const unsubscribe = navigation.addListener('focus', () => {
   axios.get(url+'/restorantState/activity')

  .then(response => {
    setRefresh(response.data)
    console.log(refresh)
   if (response.data==true){
            setButton(
                  <TouchableOpacity  onPress={() => {navigation.navigate('ManageState',{param:ref})}}  style={styles.CreateState} >
                   <Icon name="settings" color={COLORS.white} size={20}/>
                    <Text style={{color:"#fff"}}>Manage State</Text>
                    
                  </TouchableOpacity>
              );

            axios.get(url+'/restorantState/meal')
                .then(response=>{
                      console.log(response.data)
                  })
  } else {
          
          setButton(
            <TouchableOpacity onPress={() => {navigation.navigate('CreateState',{param:ref})}} style={styles.CreateState} >
              <Icon name="local-dining" color={COLORS.white} size={20}/>
              <Text style={{color:"#fff"}}>Create State</Text>
            </TouchableOpacity>)
  }
})

  .catch(error => {
    console.error(error);
  })
},[navigation.state.params])


useEffect(()=>{ /* Check if the Resto is open or closed and render neccesairy informations */ 
  axios.get(url+'/restorantState/state') // 
  
  .then(response => {
    console.log(response.data)
   if (response.data==true){
    
    setmsg(
    <View style={{marginTop:20}}>
      <Text style={{color:COLORS.white,textAlign:"center"}}>Restaurant is currently : </Text> 
      <Text style={{color:"green",textAlign:"center",fontWeight:"bold"}}> Open</Text>
      </View>
    )
  } else{
    setmsg(<View style={{marginTop:20}}>
          <Text style={{color:COLORS.white,textAlign:"center"}}>Restaurant is currently : </Text> 
          <Text style={{color:COLORS.red,textAlign:"center",fontWeight:"bold"}}> Closed</Text>
    </View>)
  }
  console.log(msgState)})

  .catch(error => {
    console.error(error);
  });//});
  //return unsubscribe;
},[navigation.state.params])


useEffect(() => {     /* get request to get the user worker info*/
axios.get(url+'/users/me/')
.then(response => {
 
  setData(response.data);
})
.catch(error => {
  console.error(error);
});
}, []);




const [meatpassed,setmeat]=useState('')

useEffect(() => {
  const id  = navigation.getParam('id');
  setmeat(navigation.getParam('meat'));
  if (navigation.state.params) {
          
    setparams(
      <View>
        <Text>{meatpassed}</Text>
      </View>
    );
  } else {
    // Handle the case where no data was passed through the navigation
        // Use the data passed through the navigation
console.log("z")

  }
}, [navigation.state.params]);



    {/*__________________________________Page Design _________________________________*/}
    return (
      
<ScrollView style={{backgroundColor:COLORS.dark}}>
    <SafeAreaView style={{flex:1 , justifyContent : "center",flexDirection: "column"}}>


        <View style={{paddingHorizontal:25}}>
            <View style={{marginTop:50,alignItems: 'center'}}>

            {logout}
                        <Text style={{fontSize:28,color:"white"}}>Welcome  </Text>
            <Text style={{fontWeight: "bold",fontSize:30,color:"white"}}>Mr. {data.name} !  </Text>
            </View>
        </View>
        <Image
      source={require('../assets/Logo.jpg')}
      style={{width: 350, height: 250,marginLeft:30}}
    />

        <View style={{alignItems:"center"}}>{msgState}</View>
            
        
        <View style={{marginTop:25}} >
        {button}
        </View>
      <View>
        {params}
      </View>
    </SafeAreaView>
</ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    
      
      alignItems: 'center',
      
    },
    CreateState:{
      alignItems:"center",
      backgroundColor:COLORS.red,
      paddingVertical:5,
      borderRadius:10,
      marginHorizontal:60,
      
      
    }
  });


