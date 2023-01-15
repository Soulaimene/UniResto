import React from 'react'
import { KeyboardAvoidingView,Image,SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Platform,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useState , useEffect} from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { url } from './config';
import COLORS from '../constants/colors';
import Logo from '../assets/Logo.jpg';
import {Dropdown} from 'react-native-element-dropdown';
import { SelectList  } from 'react-native-dropdown-select-list';
export default function ManageState({navigation}){


{/*_______________________ Variables ___________________________*/}
const [data, setData] = useState([]);
const [msgState,setmsg]=useState(null)
const [button, setButton] = useState(null);
const [buttonfreez, setButtonfreez] = useState(null);
const [params,setparams] = useState(null);

const [freezed,setmsgfreezed]=useState('Freeze')
const [ref,setref]=useState(false)
const [logout,setLogout]=useState(null);
const [Selected ,setSelected]=useState("")
{/*_______________________ UseEffect ___________________________*/}

const a =[{key :'1',value:"azzaa"}]


useEffect(()=>{//logout button
  setLogout(
    <View style={{position: 'absolute', right: 22, top: -15}}>
    <TouchableOpacity  style ={{backgroundColor: "#2080A0",opacity: 0.6,borderRadius:10,borderColor:"white",paddingHorizontal:9,paddingVertical:9,flexDirection:"row"}}onPress={()=>{ delete axios.defaults.headers.common["Authorization"]; navigation.navigate("Login");console.log( axios.defaults.headers.common["Authorization"])}} >
      <Icon name="logout" color={COLORS.white} size={15}/>
      <Text style={{color:"white",fontWeight:"bold",marginLeft:5}}>Log Out</Text>
    </TouchableOpacity>
    </View>
  )
},[])

useEffect(()=>{
  setref(true)
  axios.get(url+"/restorantState/activity")
  .then(resp => {if (resp.data==false) {
      navigation.navigate("HomeStudent",{param:ref})}
  })
},[navigation.state.params])

useEffect(()=>{     // closed to open resto
    setref(true)
 axios.get(url+'/restorantState/state') // 
  .then(response => {
   if (response.data==true){ 
    setmsg(<View style={{alignItems:"center",justifyContent:"center"}}>
          <Text style={{color:"white"}}>Restaurant is Currently :</Text>
          <Text style={{color:"green",fontWeight:"bold"}}>Open !</Text>
          </View>)
    setButton(
      <TouchableOpacity 
                        onPress={() => axios.put(url+'/restorantState/state')
                            .then(navigation.navigate('HomeWorker',{param:ref}))} 
                        style={styles.CreateStateClosed} >
        <Text style={{color:"#fff"}}>Close Restaurant</Text>
        <Icon name="lock-outline" color={"white"} size={20}/>
      </TouchableOpacity>);

  } else{
    setmsg(<View style={{alignItems:"center",justifyContent:"center"}}>
          <Text style={{color:"white"}} >Restaurant is Currently :</Text>
          <Text style={{color:COLORS.red,fontWeight:"bold"}}>Closed !</Text>
          
          </View>)
    setButton(
      <TouchableOpacity     onPress={() => axios.put(url+'/restorantState/state')
                                .then(navigation.navigate('HomeWorker',{param:ref}))}  
                            style={styles.CreateStateOpen} >
        <Text style={{color:"#fff"}}>Open Restaurant</Text>
        <Icon name="lock-open" color={"white"} size={20}/>
      </TouchableOpacity>)
  }
})

  .catch(error => {
    console.error(error);
  });
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



useEffect(()=>{     //freeze/unfreze method
    setref(true)
  axios.get(url+'/restorantState/queue') // 
  .then(response => {
   if (response.data==false){ 
    setmsgfreezed('UnFreeze')
    setButtonfreez(
      <TouchableOpacity 
                        onPress={() => axios.put(url+"/restorantState/queue") 
                            .then(navigation.navigate("ManageState",{param:ref})) } 
                        style={styles.CreateStatefreez} >
        <Text style={{color:"#fff",marginRight:5}}>Freeze</Text>
        <Icon name="ac-unit" size={20} color={COLORS.white}/>
      </TouchableOpacity>);

  } else{
    setmsgfreezed('Freeze')
    setButtonfreez(
      <TouchableOpacity     onPress={() => axios.put(url+"/restorantState/queue") 
                                .then(navigation.navigate("ManageState",{param:ref})) } 
                            style={styles.CreateStatefreez} >
        <Text style={{color:"#fff",marginRight:5}}>Unfreeze</Text>
        <Icon name="ac-unit" size={20} color={COLORS.white}/>
      </TouchableOpacity>)
  }
})

  .catch(error => {
    console.error(error);
  });
},[navigation.state.params])





function showAlert(title,msg) {
  Alert.alert(
    title,
    msg,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
}




    {/*__________________________________Page Design _________________________________*/}
    return (
      
<ScrollView style={{backgroundColor:COLORS.dark}}>
  
    <SafeAreaView style={{flex:1 , justifyContent : "center",flexDirection: "column",}}>
   
        <View style={{paddingHorizontal:25,marginTop:40}}>
        {logout}
            <View style={{marginTop:5,alignItems: 'center'}}>
            {/* <Image source={Logo} style={styles.logo}  /> */}
            <Text style={{fontSize:28,color:COLORS.white}}>Welcome </Text>
            <Text style={{fontWeight: "bold",fontSize:30,color:COLORS.white}}>Mr. {data.name} !  </Text>
           
            </View>
        </View>
          
 
    
      {/*_______________________ Open/Closed ___________________________*/}
        <View style={{justifyContent:"center",alignItems:"center",marginTop:20,marginBottom:20}}>
            <Text> {msgState}</Text>
        </View>
        <View>
            
            <TouchableOpacity 
            style={styles.Scan}
            onPress={()=>navigation.navigate('QRr')}>
              <Icon name ="qr-code-scanner" size={20} />
                    <Text style={{marginLeft:10}} > SCAN Student's QR</Text>
            </TouchableOpacity>
        </View>
        {/*_______________________ Cancel Reservation ___________________________*/}
        <TouchableOpacity 
                style={styles.cancel}
                onPress={()=>axios.post(url+"/reservation/")
                .then(response => {
                    if (response.data !== 'There is no reservation !')
                    {
                        showAlert('Done !','Reservation has been deleted successfully !')
                    }
                    else {
                        showAlert('Error !','There is no reservation !')
                      }
                })

        }>
            <Icon name ="block" color={"white"} size={20}/>
            <Text style={{marginLeft:10,color:"white"}}>Cancel Student's Reservation</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
         {/*_______________________ Frzze Button ___________________________*/}
        <View style={{ marginTop:25,marginRight:10}}>{buttonfreez}</View>
         {/*_______________________ Manage ___________________________*/}
        <View style={{marginTop:25}} >{button}</View>
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
      backgroundColor:"#E93C49",
      paddingVertical:20,
      borderRadius:10,
      paddingHorizontal:35,
      
    },
    CreateStatefreez:{
        alignItems:"center",
        backgroundColor:"blue",
        paddingVertical:20,
        borderRadius:10,
        paddingHorizontal:35,
        flexDirection:"row"
        
      },
      Scan :{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:20,
        marginHorizontal:35,
        borderRadius:10,
        backgroundColor:"white",
        flexDirection:"row"
        
      },
      logo: {
        width: 200,
        height: 200,

        borderRadius: 50,
        marginTop: 50,
        borderWidth:5,
      },
      cancel : {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#E93C49",
        paddingVertical:20,
        marginHorizontal:35,
        borderRadius:10,
        marginTop:10

      },
      CreateStateOpen:{
        alignItems:"center",
        backgroundColor:"green",
        paddingVertical:20,
        borderRadius:10,
        paddingHorizontal:35,
        flexDirection:"row"
        
      },
      CreateStateClosed:{
        alignItems:"center",
        backgroundColor:COLORS.red,
        paddingVertical:20,
        borderRadius:10,
        paddingHorizontal:35,
        flexDirection:"row"
        
      },
  });


