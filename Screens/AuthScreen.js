import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';

import AppLoading from 'expo-app-loading'

import { signup, login, autoLogin } from '../redux/actions';


const AuthScreen = props => {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const dispatch = useDispatch()

    autoAuth = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            if(refreshToken) {
                await dispatch(autoLogin(refreshToken))
                props.navigation.navigate('Delivery')
            }
        } catch(err){
            console.log(err.message)
        }
    }

    const [autoAuthLoaded, setautoAuthLoaded] = useState(false)

    if(!autoAuthLoaded){
      return (
        <AppLoading 
        startAsync ={autoAuth}
        onFinish={() => setautoAuthLoaded(true)}
        onError = {console.warn}
        />
      )
    }

    emailChangerHundler = (e) => {
        setEmailInput(e)
    }

    passwordChangerHundler = (e) => {
        setPasswordInput(e)
    }

    signUpHundler = async () => {
            try {
                await dispatch(signup(emailInput, passwordInput))
            } catch(err){
                console.log(err)

            }
    }

    logInHundler = async () => {
        try {
            await dispatch(login(emailInput, passwordInput))
            props.navigation.navigate('Delivery')
        } catch(err){
            console.log(err.message)
        }
    }

    return (
        <View style={styles.container}>
            <View style = {styles.form}>
                <Text style = {styles.text}>{"Email"}</Text>
                <TextInput
                    keyboardType={'email-address'}
                    placeholder ='email'
                    id='email'
                    label='E-Mail'
                    required
                    email
                    onChangeText={emailChangerHundler}
                    value={emailInput}/>
            </View>
            <View style = {styles.form}>
                <Text style = {styles.text}>{"Password"}</Text>
                <TextInput
                    placeholder ='password'
                    id='password'
                    label='password'
                    required
                    secureTextEntry
                    onChangeText={passwordChangerHundler}
                    value={passwordInput}/>
            </View>
            <Button title='Log In' onPress={logInHundler}/>
            <Button title='Sign Up' onPress={signUpHundler}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 50
    },
    form: {
        padding: 10,
        borderWidth : 2
    },
    text: {
        fontWeight: "bold",
        color: 'black'
    }
})

export default AuthScreen