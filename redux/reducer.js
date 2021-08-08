
const initialState = {
    shopCartList: [],
    categories: [],
    token: null,
    userId:null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'addToShopCart':
            return {
                ...state,
                shopCartList: [...state.shopCartList,action.payload]
            };
        case 'getCategories':
            return{
                ...state,
                categories: action.categories
            }
        case 'authenticate':
            return {
                token: action.token,
                userId: action.userId
            }
        case 'getProfile':
            return {
                ...state,
                key: action.key,
                email: action.email,
                number: action.number,
                address: action.address,
                name: action.name
            }
        case 'clear':
            return initialState
        default:
            return state
    }
}

export default reducer
