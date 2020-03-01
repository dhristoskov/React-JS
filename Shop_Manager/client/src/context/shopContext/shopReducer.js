import {
    REMOVE_SHOP,
    ADD_SHOP,
    EDIT_SHOP,
    CLEAR_SHOP_EDIT,
    UPDATE_SHOP,
    GET_SHOPS,
    SHOPS_ERROR,
    CLEAR_SHOPS
  } from '../const';
  
  export default (state, { type, payload }) => {
    switch (type) {
      case GET_SHOPS:
        return {
          ...state,
          shops: payload,
          error: null
        }
      case ADD_SHOP:
        return {
          ...state,
          shops: [...state.shops, payload]
        }
      case REMOVE_SHOP:
        return {
          ...state,
          shops: state.shops.filter(shop => shop._id !== payload)
        }
      case EDIT_SHOP:
        return {
          ...state,
          editShop: payload
        }
      case CLEAR_SHOP_EDIT:
        return {
          ...state,
          editShop: null
        }
      case UPDATE_SHOP:
        return {
          ...state,
          shops: state.shops.map(shop => shop._id === payload._id ? payload : shop)
        }
      case SHOPS_ERROR:
        return {
          ...state,
          error: payload,
        }
      case CLEAR_SHOPS:
        return {
          ...state,
          editShop: null,
          shops: [],
          error: null
        }
      default:
        return state
    }
}