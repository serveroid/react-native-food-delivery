import React,{useState} from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { signup, login } from '../redux/actions';


const AuthScreen = props => {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const dispatch = useDispatch()

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
            <TextInput
                placeholder ='email'
                id='email'
                label='E-Mail'
                required
                email
                onChangeText={emailChangerHundler}
                value={emailInput}/>
            <TextInput
                placeholder ='password'
                id='password'
                label='password'
                required
                secureTextEntry
                onChangeText={passwordChangerHundler}
                value={passwordInput}/>
            <Button title='Log In' onPress={logInHundler}/>
            <Button title='Sign Up' onPress={signUpHundler}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 50
    }
})

export default AuthScreen