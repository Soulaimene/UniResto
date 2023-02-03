
import React from 'react'
import { useState , useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Alert } from 'react-native';
import {Image,ImageBackground,SafeAreaView,StyleSheet,View,Text,TouchableOpacity,RefreshControl,ScrollView  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors'; 
import { url } from './config';

export default function HomeStudent({navigation}){

{/*_______________________ Variables ___________________________*/}
const [data, setData] = useState([]);
const [button, setButton] = useState(null);
const [msgState,setmsg]=useState(null)
const [refreshing, setRefreshing] = useState(false);
const [MakeRes,SetMakeRes]=useState(null);
const [que,setque]=useState(null);
const [ic,seticon]=useState(null)
const [ref,setref]=useState(false)
const [logout,setLogout]=useState(null);
const [refresh, setRefresh] = useState(null);
//const [modalVisible, setModalVisible] = useState(false);
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

const [autoRefresh, setAutoRefresh] = useState(false)
const [error, setError] = useState(null);


useEffect(()=>{
  setLogout(
    <View style={{position: 'absolute', right: 10, top: -40}}>
    <TouchableOpacity  style ={{backgroundColor: "#2080A0",opacity: 0.6,borderRadius:10,borderColor:"white",paddingHorizontal:9,paddingVertical:9,flexDirection:"row"}}onPress={()=>{ delete axios.defaults.headers.common["Authorization"]; navigation.navigate("Login");console.log( axios.defaults.headers.common["Authorization"])}} >
      <Icon name="logout" color={COLORS.white} size={15}/>
      <Text style={{color:"white",fontWeight:"bold",marginLeft:5}}>Log Out</Text>
    </TouchableOpacity>
    </View>
  )

},[refreshing])



useEffect(()=>{ //get nb of tickets
  axios.get(url+"/getTickets/").then(resp => 
    {setque (
    <View>
      <Text style={{fontWeight: 'bold',color: COLORS.white}} >You Have {resp.data} Tickets</Text>
    </View>
  )})  .catch(error => {
    if (error.response.status === 401) {
      navigate.navigate('Login',{param:ref});
    }
    else if (error.response.status == 500) {navigation.navigate('HomeStudent',{param:ref})};
  });//});
 
},[refreshing])

useEffect(()=>{ /* Check if the Resto is open or closed and render neccesairy informations */ 
setref(true)
  axios.get(url+'/restorantState/activity') // 
  .then(response => {
   if (response.data==true){
    
    axios.get(url+"/reservation/check/")
    .then(response => {
        if (response.data == false) 
        {
                    {  SetMakeRes(
                      
                      
                            <TouchableOpacity 
                            style={{backgroundColor:"#E93C49",paddingVertical:10,borderRadius:15}}
                             onPress={() => {
                              axios.post(url+'/makeReservation/')
                                  .then(response => {
                                      if (response.data === "You are out of tickets!") {
                                          showAlert('Error !', "You are out of tickets!");
                                      } else if (response.data === "You already had your meal!") {
                                          showAlert('Error !', "You already had your meal!");
                                      }
                                      else if(response.data === "Reservation Failed!")
                                      showAlert('Error !', "Reservation Failed!");
                                       else {
                                          showAlert('Success !', "Reservartion Made !");
                                          navigation.navigate('HomeStudent',{param:ref});
                                      }
                                  })
                                  .catch(error => {
                                      showAlert('Error !', error.message);
                                  });
                          }}  
                             >
                              <Text style={{color:"white", textAlign:'center',fontWeight: 'bold'}}>Make Reservation</Text>
                              
                            </TouchableOpacity>
                           
                       );}
        }
        else{
          {  SetMakeRes(
            <View >
            <TouchableOpacity 
            style={{backgroundColor:"#rgb(34,21,57)",paddingVertical:10,borderRadius:18,flexDirection:"row",alignItems:"center",justifyContent:"center"}}
             onPress={() =>navigation.navigate('ManageReservation')}  >
              <Text style={{color:"white", textAlign:'center',fontWeight: 'bold',marginRight:10}}>Manage Reservation</Text>
              <Icon name='settings' size={20} color={"white"}/>
            </TouchableOpacity>
            </View>
            
       )
       ;}
        }

    })


  } 
 })

  .catch(error => {
    if (error.response.status === 401) {
      navigate.navigate('Login',{param:ref});
    }
    else if (error.response.status == 500) {navigation.navigate('HomeStudent',{param:ref})};
  });//});
 
},[refreshing,navigation.state.params])



useEffect(()=>{ // check if resto closed or open
  axios.get(url+"/restorantState/state").then(resp=>{if(resp.data==true){
    setmsg(<Text style={{color:"green"}}>Open !</Text>)

  }
  else{
    setmsg(<Text style={{color:"red"}}>Closed !</Text>)
  }
})  .catch(error => {
  if (error.response.status === 401) {
    navigate.navigate('Login',{param:ref});
  }
  else if (error.response.status == 500) {navigation.navigate('HomeStudent',{param:ref})};
});//});

},[refreshing])





useEffect(() => {/* get request to get the user student info*/
    axios.get(url+'/users/me/')
    .then(response => {
     
      setData(response.data);
    })
    .catch(error => {
      console.error(error);
    })  .catch(error => {
      if (error.response.status === 401) {
        navigate.navigate('Login',{param:ref});
      }
      else if (error.response.status == 500) {navigation.navigate('HomeStudent',{param:ref})};
    });//});
   
  }, []);



  useEffect(()=>{ /* Check if the Resto is open or closed and render neccesairy informations */ 
 
  axios.get(url+'/restorantState/activity') // 
  .then(response => {
   if (response.data==true){
    
          seticon (
            <TouchableOpacity onPress={() => {navigation.navigate("Menu")}}>
              <View style={style.iconContainer}>
            <Icon name="restaurant" color={COLORS.red} size={20} />
            <Text>Menu</Text>
          </View>
          </TouchableOpacity>
          )

  } 
 })

 .catch(error => {
  if (error.response.status === 401) {
    navigate.navigate('Login',{param:ref});
  }
  else if (error.response.status == 500) {navigation.navigate('HomeStudent',{param:ref})};
});//});

 
},[refreshing])



{/*_______________________ Markdown  ___________________________*/}

  return (
<ScrollView 
  style={{flex:1,backgroundColor:"#130B20"}}
  
  contentContainerStyle={{flex:1}}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  }
>
    <View style={{flex:1}}>
  
      <ImageBackground style={{flex: 0.7}} source={require('../assets/Logo.jpg')}>
        <View style={style.header}>
        {logout}
        </View>
        <View style={style.imageDetails}>
  

        </View>
      </ImageBackground>
    
      <View style={style.detailsContainer}>
        <View>{ic}</View>
             
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
        </View>

        <Text style={{width: '100%',marginLeft:30,marginRight: 50, marginTop: 20, fontWeight: '500', fontSize: 20, alignItems: 'center',color:COLORS.dark }}>
            Restaurant is currently <Text style={{color:COLORS.red}}>{msgState}</Text>  
        </Text>
        <View style={{ paddingHorizontal:50,marginTop:25}} >
        {MakeRes}
        </View>
      </View>
  
      <View style={style.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',  width: 350}}>
            {que}
        </View>

        <TouchableOpacity 
        onPress={() =>navigation.navigate('Edinar')}
        style={style.bookNowBtn}>

    

          <Text  style={{color: COLORS.red, fontSize: 16, fontWeight: 'bold'}}> Purchase Tickets  </Text>
          <Text style={{fontSize:11}}
        >
            
            2.5D/Per Ticket bundle
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
    height: 60,
    width: 80,
    position: 'absolute',
    top: -47,
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
    backgroundColor: "white",
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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});







        {/* <View>
            <Button title="Open Modal" onPress={() => setModalVisible(true)} />
            <Modal visible={modalVisible} animationType="slide">
                <View>
                    <Text>This is the content of the modal</Text>
                    <Button title="Close Modal" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View> */}