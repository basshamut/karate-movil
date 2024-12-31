import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreen from '../screens/auth/AuthScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/home/HomeScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthScreen" id="MainStack">
                <Stack.Screen name="AuthScreen" component={AuthScreen} options={{title: 'Autenticación'}}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Inicio de Sesión'}}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{title: 'Registro'}}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'Home'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
