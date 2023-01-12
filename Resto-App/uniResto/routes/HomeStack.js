import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from '../screens/Login';
import Register from "../screens/register";
import HomeStudent from "../screens/HomeStudent";
import HomeWorker from "../screens/HomeWorker";
import CreateState from "../screens/CreateState"
import Edinar from "../screens/edinar"
const screens ={
    Login: {
        screen: Login
    }  ,

    Register: {
        screen:Register
    } ,
    HomeStudent:{
        screen:HomeStudent
    },
    HomeWorker:{
        screen:HomeWorker
    },
    CreateState:{
        screen:CreateState
    },
    Edinar:{
        screen:Edinar
    }
}
const HomeStack= createStackNavigator(screens);
export default  createAppContainer(HomeStack);