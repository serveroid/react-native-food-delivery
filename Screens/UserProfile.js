import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { getProfile, changeProfile } from '../redux/actions';

/*
Профиль пользователя
Страница где будут отображаться данные о пользователе, email, телефон, адрес, ФИО. 
При открытие страницы эти данные запрашиваются с сервера, пользователь может их редактировать и сохранять.
 При нажатии на кнопку сохранить данные отправляются в бд и перезаписываются
*/

const UserProfile = () => {
    const dispatch = useDispatch()

    const userid = useSelector(state => state.userId)
    const key = useSelector(state => state.key)

    change = async () => {
        try {
            if (validateEmailInput && validateNumberInput) {
                await dispatch(changeProfile(key, userid, emailInput, numberInput, addressInput, nameInput))
            } else {
                seterrMessage(true)
            }
        } catch(err){
            console.log(err)
        }
    }

    const email = useSelector(state => state.email)
    const number = useSelector(state => state.number)
    const address = useSelector(state => state.address)
    const name = useSelector(state => state.name)

    const [emailInput, setemailInput] = useState(email)
    const [numberInput, setnumberInput] = useState(number)
    const [addressInput, setaddressInput] = useState(address)
    const [nameInput, setnameInput] = useState(name)

    const [validateEmailInput, setvalidateEmailInput] = useState(true)
    const [validateNumberInput, setvalidateNumberInput] = useState(true)
    const [errMessage, seterrMessage] = useState(false)

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(emailInput).toLowerCase())
    }

    const validateNumber = () => {
        const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
        return re.test(String(numberInput).toLowerCase())
    }

    validateInput = () => {
        validateEmail() ? setvalidateEmailInput(true) : setvalidateEmailInput(false)
        validateNumber() ? setvalidateNumberInput(true) : setvalidateNumberInput(false)
        if (validateEmailInput && validateNumberInput) seterrMessage(false)
    }

    emailChangerHundler = (e) => {
        setemailInput(e)
    }

    numberChangerHundler = (e) => {
        setnumberInput(e)
    }

    addressChangerHundler = (e) => {
        setaddressInput(e)
    }

    nameChangerHundler = (e) => {
        setnameInput(e)
    }

    return(
        <View style={styles.container}>

{errMessage && <Text style={{position: 'absolute', fontSize: 19, fontWeight: "bold", color: "red", padding: 10}}>{"Данные введены неверно"}</Text>}

            <View style = {styles.form}>
                <Text style = {styles.text}>{"Email"}</Text>
                <TextInput
                    style = {validateEmailInput ? styles.text : styles.validateErr}
                    keyboardType={'email-address'}
                    placeholder ='email'
                    id='email'
                    label='E-Mail'
                    required
                    email
                    onChangeText={emailChangerHundler}
                    value={emailInput}
                    onKeyPress = {validateInput}
                />
            </View>

            <View style = {styles.form}>
                <Text style = {styles.text}>{"number"}</Text> 
                <TextInput
                    style = {validateNumberInput ? styles.text : styles.validateErr}
                    keyboardType={'phone-pad'}
                    placeholder ='number'
                    id='number'
                    label='number'
                    required
                    num
                    onChangeText={numberChangerHundler}
                    value={numberInput}
                    onKeyPress = {validateInput}
                />
            </View>

            <View style = {styles.form}>
                <Text style = {styles.text}>{"address"}</Text> 
                <TextInput
                    placeholder ='address'
                    id='address'
                    label='address'
                    required
                    address
                    onChangeText={addressChangerHundler}
                    value={addressInput}
                />
            </View>

            <View style = {styles.form}>
                <Text style = {styles.text}>{"Name"}</Text> 
                <TextInput
                    placeholder ='name'
                    id='name'
                    label='name'
                    required
                    name
                    onChangeText={nameChangerHundler}
                    value={nameInput}
                />
            </View>

            <Button title='Change' onPress={change}/>
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
        fontWeight: "bold"
    },
    text: {
        color: 'black'
    },
    validateErr: {
        color: 'red'
    }
})

export default UserProfile