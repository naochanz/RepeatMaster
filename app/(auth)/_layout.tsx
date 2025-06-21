import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './login';
import SignUpScreen from './signup';
import HomeScreen from '../(tabs)/index';

const Stack = createNativeStackNavigator();

export default function AuthLayout(){
    return(
        <Stack.Navigator
        initialRouteName='login'
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name='login' component={LoginScreen} />
            <Stack.Screen name='signup' component={SignUpScreen}/>
            <Stack.Screen name='app'    component={HomeScreen}/>
        </Stack.Navigator>
    );
}