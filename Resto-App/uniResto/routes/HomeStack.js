import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from '../screens/Login';
import Register from "../screens/register";
import HomeStudent from "../screens/HomeStudent";
import HomeWorker from "../screens/HomeWorker";
import CreateState from "../screens/CreateState"
import Menu from "../screens/Menu"
import ManageState from "../screens/ManageState"
import QRr from "../screens/QRr"
import ManageReservation from "../screens/ManageReservation"
import Edinar from "../screens/Edinar"
const screens ={
    Login: {
        screen: Login
    }  ,

    Register: {
        screen:Register
    } ,
    HomeStudent:{
        screen:HomeStudent,

    },
    HomeWorker:{
        screen:HomeWorker
    },
    CreateState:{
        screen:CreateState
    },
    Edinar:{
        screen:Edinar
    },
    ManageState:{
        screen:ManageState
    },
    QRr:{
        screen:QRr
    },
    ManageReservation:{
        screen:ManageReservation
    },
    Menu:{
        screen:Menu
    }
}
const HomeStack= createStackNavigator(screens);

export default  createAppContainer(HomeStack);