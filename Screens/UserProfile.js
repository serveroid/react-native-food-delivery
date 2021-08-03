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
            await dispatch(changeProfile(key, userid, emailInput, nomberInput, adressInput, nameInput))
        } catch(err){
            console.log(err)

        }
    }

    const email = useSelector(state => state.email)
    const nomber = useSelector(state => state.nomber)
    const adress = useSelector(state => state.adress)
    const name = useSelector(state => state.name)

    const [emailInput, setemailInput] = useState(email)
    const [nomberInput, setnomberInput] = useState(nomber)
    const [adressInput, setadressInput] = useState(adress)
    const [nameInput, setnameInput] = useState(name)

    emailChangerHundler = (e) => {
        setemailInput(e)
    }

    nomberChangerHundler = (e) => {
        setnomberInput(e)
    }

    adressChangerHundler = (e) => {
        setadressInput(e)
    }

    nameChangerHundler = (e) => {
        setnameInput(e)
    }

    return(
        <View style={styles.container}>
            
            <View style = {styles.input}>
                <Text style = {styles.text}>{"Email"}</Text>
                <TextInput
                    placeholder ='email'
                    id='email'
                    label='E-Mail'
                    required
                    email
                    onChangeText={emailChangerHundler}
                    value={emailInput}
                />
            </View>

            <View style = {styles.input}>
                <Text style = {styles.text}>{"Nomber"}</Text> 
                <TextInput
                    keyboardType={'phone-pad'}
                    placeholder ='nomber'
                    id='nomber'
                    label='nomber'
                    required
                    tel
                    onChangeText={nomberChangerHundler}
                    value={nomberInput}
                />
            </View>

            <View style = {styles.input}>
                <Text style = {styles.text}>{"Adress"}</Text> 
                <TextInput
                    placeholder ='adress'
                    id='adress'
                    label='adress'
                    required
                    street-address
                    onChangeText={adressChangerHundler}
                    value={adressInput}
                />
            </View>

            <View style = {styles.input}>
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
    input: {
        padding: 10,
        borderWidth : 1
    },
    text: {
        fontWeight: "bold"
    }
})

export default UserProfile