
import React from 'react'
import { useState , useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {Image,ImageBackground,SafeAreaView,StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors'; 

export default function HomeStudent({navigation}){

{/*_______________________ Variables ___________________________*/}
const [data, setData] = useState([]);
const [button, setButton] = useState(null);
const url= "http://10.0.2.2:8000"
const [msgState,setmsg]=useState('Closed')
{/*_______________________ UseEffect ___________________________*/}
useEffect(()=>{ /* Check if the Resto is open or closed and render neccesairy informations */ 
  axios.get(url+'/restorantState/state')
  .then(response => {
   if (response.data==false){
    setmsg("Open")
  }
})
  .catch(error => {
    console.error(error);
  });
},[msgState])
useEffect(() => {/* get request to get the user student info*/
    axios.get(url+'/users/me/')
    .then(response => {
     
      setData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
{/*_______________________ Markdown  ___________________________*/}

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{flex: 0.7}} source={require('../assets/Logo.jpg')}>
        <View style={style.header}>
          
        </View>
        <View style={style.imageDetails}>

          <View style={{flexDirection: 'row'}}>
         
          </View>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <Icon name="restaurant" color={COLORS.red} size={20} />
        </View>
        <View style={{flexDirection: 'row', marginTop: 1,flexDirection:'row',alignItems:'center'}}>
          <Icon name="lock" size={28} color={COLORS.red} style={{marginTop:10}} />
          <Text
            style={{
              
              marginTop: 10,
              width:350,              
              marginLeft: 5,
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.red,
            }}>
              Welcome {data.name} !
          </Text>
        </View>

        <Text style={{width: '100%',marginLeft:30,marginRight: 50, marginTop: 20, fontWeight: '500', fontSize: 20, alignItems: 'center' }}>
            Restaurant is currently <Text style={{color:COLORS.red}}>{msgState}</Text>  
        </Text>
        <Text style={{width: '100%',marginLeft:10,marginRight: 50, marginTop: 12, fontWeight: '300', fontSize: 20, alignItems: 'center' }}>
           Please wait until it opens sp you can make  
        </Text>
        <Text style={{width: '100%',marginLeft:120,marginRight: 50, marginTop: 12, fontWeight: '300', fontSize: 20, alignItems: 'center' }}>
            your reservation  
        </Text>
        <Text style={{marginTop: 20, lineHeight: 22}}></Text>
      </View>
      <View style={style.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              width: 350,
              marginLeft: 5,
              fontSize: 12,
              fontWeight: 'bold',
              color: COLORS.white,
            }}>
            2.5D/Per Ticket bundle
 
          </Text>
        </View>
        <TouchableOpacity style={style.bookNowBtn}>
          <Text
            style={{color: COLORS.red, fontSize: 16, fontWeight: 'bold'}}>
            Purchase Tickets 
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    height: 50,
    width: 50,
    position: 'absolute',
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    top: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.red,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});





