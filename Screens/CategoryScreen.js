import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import CustomHeaderButton from '../Components/HeaderButton';
import {ITEMS} from '../Data/data'

const CategoryScreen = props => {

    const catId = props.navigation.getParam('categoryId')


    const displayedItems = ITEMS.filter(item => item.categoryId === catId)


    const renderItem = itemData => {
        return (
            <TouchableOpacity
            onPress ={()=>{
                props.navigation.navigate({
                    routeName: 'Item',
                    params: {
                        itemId: itemData.item.id,
                        itemTitle: itemData.item.title
                    }
                })
            }}>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <Text style={styles.price}>{itemData.item.price}</Text>
                </View>
                <Image source={itemData.item.image}
                style={styles.image}/>
                <Text style={styles.description}>{itemData.item.description}</Text>
            </View>
            </TouchableOpacity>
        )
    }
  
    return (
        <FlatList 
        data={displayedItems}
        renderItem={renderItem}/>
      );
  }

  CategoryScreen.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('productTitle'),
      
      headerRight: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName='md-cart'
            onPress={() => {
              navData.navigation.navigate('ShopCart');
            }}
          />
        </HeaderButtons>
      )
    };
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        height: 150,
        marginBottom: 50
    },
    image: {
        width: '100%',
        height: '100%'
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
    }
  });
  

  export default CategoryScreen