import React from 'react'
import { KeyboardAvoidingView,SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Platform,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useState , useEffect} from 'react';
import { Alert } from 'react-native';
import { url } from './config';
import COLORS from '../constants/colors';
export default function ManageState({navigation}){


{/*_______________________ Variables ___________________________*/}
const [data, setData] = useState([]);
const [msgState,setmsg]=useState('')
const [button, setButton] = useState(null);
const [buttonfreez, setButtonfreez] = useState(null);
const [params,setparams] = useState(null);

const [freezed,setmsgfreezed]=useState('Freeze')
const [ref,setref]=useState(false)
{/*_______________________ UseEffect ___________________________*/}


useEffect(()=>{     // closed to open resto
    setref(true)
 axios.get(url+'/restorantState/state') // 
  .then(response => {
   if (response.data==true){ 
    setmsg('Open')
    setButton(
      <TouchableOpacity 
                        onPress={() => axios.put(url+'/restorantState/state')
                            .then(navigation.navigate('HomeWorker',{param:ref}))} 
                        style={styles.CreateState} >
        <Text style={{color:"#fff"}}>Close Resto</Text>
      </TouchableOpacity>);

  } else{
    setmsg('Closed')
    setButton(
      <TouchableOpacity     onPress={() => axios.put(url+'/restorantState/state')
                                .then(navigation.navigate('HomeWorker',{param:ref}))}  
                            style={styles.CreateState} >
        <Text style={{color:"#fff"}}>Open Resto</Text>
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
    setmsgfreezed('Freeze')
    setButtonfreez(
      <TouchableOpacity 
                        onPress={() => axios.put(url+"/restorantState/queue") 
                            .then(navigation.navigate("ManageState",{param:ref})) } 
                        style={styles.CreateStatefreez} >
        <Text style={{color:"#fff"}}>freeze</Text>
      </TouchableOpacity>);

  } else{
    setmsgfreezed('UnFreeze')
    setButtonfreez(
      <TouchableOpacity     onPress={() => axios.put(url+"/restorantState/queue") 
                                .then(navigation.navigate("ManageState",{param:ref})) } 
                            style={styles.CreateStatefreez} >
        <Text style={{color:"#fff"}}>unfreeze</Text>
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

        <View style={{paddingHorizontal:25}}>
            <View style={{marginTop:50,alignItems: 'center'}}>
            <Text style={{fontSize:28,color:COLORS.white}}>Welcome  </Text>
            <Text style={{fontWeight: "bold",fontSize:30,color:COLORS.white}}>Mr. {data.name} !  </Text>
            </View>
        </View>
      {/*_______________________ Open/Closed ___________________________*/}
        <TouchableOpacity>
            <Text>Resto is Currently {msgState}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.Scan}
        onPress={()=>navigation.navigate('QRr')}>
                <Text style={{color:"white"}} > SCAN Student's QR</Text>
        </TouchableOpacity>
        {/*_______________________ Cancel Reservation ___________________________*/}
        <TouchableOpacity onPress={()=>axios.post(url+"/reservation/")
        .then(response => {
            if (response.data !== 'There is no reservation !')
            {
                showAlert('Done !','User has been deleted successfully !')
            }
            else {
                showAlert('Error !','There is no reservation !')
              }
        })

        }>
            <Text>Cancel Student's Reservation</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row",justifyContent: 'center'}}>
         {/*_______________________ Frzze Button ___________________________*/}
        <View style={{paddingHorizontal:50, marginTop:25}}>{buttonfreez}</View>
         {/*_______________________ Manage ___________________________*/}
        <View style={{ marginHorizontal:50,marginTop:25}} >{button}</View>
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
      
    },
    CreateStatefreez:{
        alignItems:"center",
        backgroundColor:"blue",
        paddingVertical:20,
        borderRadius:10,
        
      },
      Scan :{
        alignItems:"center",
        paddingVertical:20,
        marginHorizontal:50,
        borderRadius:10,
        backgroundColor:COLORS.red
        
      }
  });


