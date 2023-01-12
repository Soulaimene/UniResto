import React from 'react'
import { KeyboardAvoidingView,SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Platform,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useState , useEffect} from 'react';

export default function HomeWorker({navigation}){


{/*_______________________ Variables ___________________________*/}
const [data, setData] = useState([]);
const [msgState,setmsg]=useState('Closed')
const [button, setButton] = useState(null);
const [params,setparams] = useState(null);
const url= "http://10.0.2.2:8000"
{/*_______________________ UseEffect ___________________________*/}

useEffect(()=>{ /* Check if the Resto is open or closed and render neccesairy informations */ 
  axios.get(url+'/restorantState/state')
  .then(response => {
   if (response.data==true){
    setmsg("Open")
    setButton(
      <TouchableOpacity  style={styles.CreateState} >
        <Text style={{color:"#fff"}}>Manage State</Text>
      </TouchableOpacity>);
  } else{
    setButton(
      <TouchableOpacity onPress={() => {navigation.navigate('CreateState')}} style={styles.CreateState} >
        <Text style={{color:"#fff"}}>Create State</Text>
      </TouchableOpacity>)
  }
})
  .catch(error => {
    console.error(error);
  });
},[msgState])
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
      
<ScrollView>
    <SafeAreaView style={{flex:1 , justifyContent : "center",flexDirection: "column"}}>

        <View style={{paddingHorizontal:25}}>
            <View style={{marginTop:50,alignItems: 'center'}}>
            <Text style={{fontSize:28}}>Welcome  </Text>
            <Text style={{fontWeight: "bold",fontSize:30}}>Mr. {data.name} !  </Text>
            </View>
        </View>
        <View style={{alignItems:'center',marginTop:20}}>
            <Text >You Have {data.nb_tickets} Tickets ! </Text>
        </View>
        <TouchableOpacity>
            <Text>Resto is Currently {msgState}</Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal:50,marginTop:25}} >
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
      backgroundColor:"#E93C49",
      paddingVertical:20,
      borderRadius:10,
      
    }
  });


