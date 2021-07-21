import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import {useSelector} from 'react-redux'



const ShopCartScreen = () => {

    const shopCartList = useSelector(state=> state.shopCartList)
    
    const renderItem = itemData => {
        return (
            
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <Text style={styles.price}>{itemData.item.price}</Text>
                </View>
                <Image source={itemData.item.image}
                style={styles.image}/>
                <Text style={styles.description}>{itemData.item.description}</Text>
            </View>
        )
    }

   
  
    return (
        <View style={styles.container}>
            <FlatList 
            data={shopCartList}
            renderItem={renderItem}/>
        </View>
      );
 
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        height: 150,
        marginBottom: 50
    },
    image: {
        width: '100%',
        height: '50%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'left'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'red'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 15,
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    }
  });
  
  

  export default ShopCartScreen