import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

const AppNavigation = createStackNavigator(
    {
        Login: LoginScreen,
        Chat: ChatScreen
    },
    {
        headerMode: 'none'
    }
)

export default createAppContainer(AppNavigation)
