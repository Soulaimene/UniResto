
import React from 'react'
import { useState , useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Alert } from 'react-native';
import {Image,ImageBackground,SafeAreaView,StyleSheet,View,Text,TouchableOpacity,RefreshControl,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors'; 
import QRCode from 'react-native-qrcode-svg'
import { url } from './config';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default function ManageReservation({navigation}){

{/*_______________________ Variables ___________________________*/}
const [data, setData] = useState([]);
const [button, setButton] = useState(null);
const [ref,setref]=useState(false)
const [msgState,setmsg]=useState('')
const [refreshing, setRefreshing] = useState(false);
const [MakeRes,SetMakeRes]=useState(null);
const [Make,SetMake]=useState(null);
const [msgopco,setmsgopco]=useState('')
const [Queue,setQueue] = useState(null)
const [DELET,setDELET]=useState(null)

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

  const handleRefresh = () => {
    setRefreshing(true);
    // perform refresh logic here
    setTimeout(() => setRefreshing(false), 2000);}

   
{/*_______________________ UseEffect ___________________________*/}


useEffect(()=>{ /* Render QR CODE */ 
axios.get(url+"/qrcode/") // 
     .then(response => {console.log(response.data)
                  SetMake(<View style={{alignItems:"center",paddingTop:7}}>
                            <QRCode size={310} color={COLORS.dark} value={response.data}/>
                          </View>
                            

                                                    )
                           
                     }
                          )

  .catch(error => {
    console.error(error);
  });
 
},[refreshing])

useEffect(() => {/* get request to get the user student info*/
    axios.get(url+'/users/me/')
    .then(response => {
     
      setData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  },[refreshing] );




  useEffect(()=> { axios.get(url+"/restorantState/state") // frozen or not to the student
    .then(resp=> {if (resp.data==true) {
            axios.get(url+'/restorantState/queue') 
                .then(resp =>
                    { if (resp.data==false) {setmsg("Queue  is frozen"), setmsgopco("Restaurant Is Currently Open")}


                    else {setmsg("Queue is Moving !"),setmsgopco("Restaurant Is Currently Open")}}
                    )}
                else {setmsgopco("Restaurant Is Currently Closed")}
    
},[refreshing])
})
       
       
useEffect(()=>{ /* Check if the Resto is open or closed and render neccesairy informations */ 
  axios.get(url+'/restorantState/state') // 
  .then(response => {
   if (response.data==true){
    setmsg('Open')
    axios.get(url+"/reservation/check/")
    .then(response => {
        if (response.data == false) 
        {
                    {  SetMakeRes(
                            <TouchableOpacity onPress={() => {axios.post(url+"/users/reservation/").then(response => {
                              console.log(response.data) ;                                                   
                              if (response.data == "You are out of tickets!" || response.data =="You already had your meal!"){
                                                      showAlert('Error !',response.data)
                                                    }
                                                    else {
                                                      navigation.navigate('ManageReservation')
                                                    }}
                                                      // 
                                                                  )}}  
                             >
                              <Text style={{color:"blue"}}>Make Reservation</Text>
                            </TouchableOpacity>
                       );}
        }
        else{
          {  SetMakeRes(
            <TouchableOpacity style={{paddingVertical:10,borderTopRightRadius:15,borderTopLeftRadius:15,marginHorizontal:10,flexDirection:"row",backgroundColor:"#6A08F6"}} onPress={() =>navigation.navigate('ManageReservation')}  >
                 <View style={{marginLeft:5}}>
                 <Icon color={COLORS.white}  size={20} name='room-service'/>  

                 </View>                                
           
              <Text style={{color:"white",alignItems:"center"}}>   Manage Reservation   </Text>
            </TouchableOpacity>
       )
       ;}
        }

    })


  } else{
    setmsg('')
  }
 })

  .catch(error => {
    console.error(error);
  });//});
 
},[refreshing])



useEffect(()=>{ //estimated time 
    axios.get(url+'/restorantState/queue/me').then(
        resp1 => {
      const x= resp1.data;
            axios.get(url+'/restorantState/queue')
            .then(resp=> {if(resp.data==true){
                setQueue(
                    <View>
                    <Text>Number of Students before you : {x} </Text>
                    <Text>Estimated time :  {(x*15)/60} Minutes and {(x*15)%60} Seconds  </Text>
                    </View>
                )
                
    
            }else{
                setQueue(
                    <View style={{marginTop:2}}>
                    <Text>Number of Students before you : {x} </Text>
                    <Text style={{marginTop:5}}>Estimated time if the queue is moving  :  {(x*15)/60} Minutes and {(x*15)%60} Seconds  </Text>
                    </View>
                )
            }})

            
        }
    )
},[refreshing])





  
{/*_______________________ Markdown  ___________________________*/}

  return (
<ScrollView 
  style={{flex:1,backgroundColor:COLORS.dark}}
  contentContainerStyle={{flex:1}}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  }
>
    <View style={{flex:2}}>
  <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{flex:0.8}}>
            {Make}
      </ImageBackground>

      <View style={style.detailsContainer}>
                <View style={style.iconContainer}>
                <Icon name="restaurant" color={COLORS.red} size={20} />
                </View>
        
                <View style={{flexDirection: 'row', marginTop: 1,flexDirection:'row',alignItems:'center'}}>
                <Icon name="people" size={28} color={COLORS.red} style={{marginTop:10}} />

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
 
        
     
        <Text style={{marginTop: 20, lineHeight: 22}}></Text>
      </View>
      <View>
        <View style={{flexDirection:'row',marginBottom:4}}>      
            <Text style={{}}>{msgopco} </Text>
            <Text style={{color:"#6907F7",marginLeft:5}}>{msgState}</Text>       
            </View>

        {Queue}
            
            </View>
      <View style={{alignItems:"center",marginTop:20}}>

      <View style={{flexDirection:"row"}} >
            <TouchableOpacity style={{marginRight:30,paddingVertical:10,borderTopRightRadius:15,borderTopLeftRadius:15,marginHorizontal:10,flexDirection:"row",backgroundColor:" rgb(123,2,16)"}} 
                onPress={()=>
                {axios.delete(url+'/reservation/'),showAlert('Done !',"Reservation Deleted"),navigation.navigate("HomeStudent",{param:ref})}}>
            <View style={{marginLeft:10}}>
            <Icon  name="restore" color={COLORS.white} size={20} />
            </View>
                <Text style={{color:COLORS.white, textAlign:"center"}}> Cancel Reservation   </Text>
             </TouchableOpacity>
            
        </View>
        </View>
        
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

        <TouchableOpacity 
        onPress={() =>navigation.navigate('Edinar')}
        style={style.bookNowBtn}>
       
          <Text
            style={{color: COLORS.red, fontSize: 16, fontWeight: 'bold'}}>
            Purchase Tickets 
          </Text>
        </TouchableOpacity>
      </View>

      
    </View> 
    </ScrollView>
    
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
    marginTop:15,
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
    
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.4,
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





