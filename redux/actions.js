import { AsyncStorage } from 'react-native';

import Category from "../Models/Category"

export const addToShopCart = (payload) => ({
    type:'addToShopCart', payload : payload
})


export const authenticate = (userId, token) => {
  return dispatch => {
    dispatch({type: 'authenticate', userId: userId, token: token})
  }
}

export const signup = (email, password) => {
  return async dispatch => {

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQksDqg5_AsG1P2LER6bB7aScPAIwGljQ",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
          password: password,
          returnSecureToken: true
        })
      })


      if (!response.ok){
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        console.log(errorId)
        throw new Error(response.message)
      }

      const resData = await response.json()

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken
        )
      )
      dispatch(makeProfile(email, resData.localId))
    
  }
}

export const login = (email, password) => {
  return async dispatch => {

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQksDqg5_AsG1P2LER6bB7aScPAIwGljQ",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
          password: password,
          returnSecureToken: true
        })
      })


      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        
        throw new Error(errorId);
      }

      const resData = await response.json()

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken
        )
      )
      await AsyncStorage.setItem('refreshToken', resData.refreshToken)
      dispatch(getProfile(resData.localId))
    
  }
}

export const autoLogin = (refreshToken) => {
  return async dispatch => {
    const response = await fetch(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyAQksDqg5_AsG1P2LER6bB7aScPAIwGljQ",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      })


      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;

        throw new Error(errorId);
      }

      const resData = await response.json()
      
      dispatch(
        authenticate(
          resData.user_id,
          resData.id_token
        )
      )
      await AsyncStorage.setItem('refreshToken', resData.refresh_token)
      dispatch(getProfile(resData.user_id))
  }
}

export const getCategories = () => {
  return async (dispatch, getState) => {
    // const userId =getState().userId;
    // const token =getState().token;
    try {

      const response = await fetch(
        `https://react-native-app-e1089-default-rtdb.firebaseio.com/category.json`
      )

      if(!response.status){
        throw new Error('Error')
      }

      const resData = await response.json()
      
      

      const loadedCategories = []

      for(const key in resData){
        loadedCategories.push(
          new Category(
            key,
            resData[key].title,
            resData[key].imageUrl
          )
        )
      }

    
    dispatch({
      type:'getCategories',
      categories: loadedCategories
})
}

catch(err) {
  throw err;
}
  }}

export const getProfile = (userid) => {
  return async dispatch => {
    const response = await fetch(`https://react-native-app-e1089-default-rtdb.firebaseio.com/profile/${userid}.json`)


      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        
        throw new Error(message);
      }

      const resData = await response.json()

      for(const key in resData){
        dispatch(
          {type: 'getProfile',
          key: key, 
          email: resData[key].email,
          number: resData[key].number,
          address: resData[key].address,
          name: resData[key].name
         })
      }
    
  }
}

export const changeProfile = (key, userid, email, number, address, name) => {
  return async dispatch => {

    const response = await fetch(
      `https://react-native-app-e1089-default-rtdb.firebaseio.com/profile/${userid}/${key}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
          number: number,
          address: address,
          name: name
        })
      })


      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        
        throw new Error(errorId);
      }
      
      dispatch(
        {type: 'getProfile', 
        key: key,
        email: email,
        number: number,
        address: address,
        name: name
       }
      )
    
  }
}

const makeProfile = (email, userid) => {
  return async dispatch => {

    const response = await fetch(
      `https://react-native-app-e1089-default-rtdb.firebaseio.com/profile/${userid}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          number: '+7',
          address: '',
          name: '',

        })
      })


      if (!response.ok){
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        console.log(errorId)
        throw new Error(response.message)
      }

      const resData = await response.json()

      dispatch(
        {type: 'getProfile', 
        key: resData['name'],
        email: email,
        number: '+7',
        address: '',
        name: ''
       }
      )
  }
}