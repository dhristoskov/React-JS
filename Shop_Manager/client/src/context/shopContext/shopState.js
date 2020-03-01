import React, { useReducer } from 'react';
import axios from 'axios';
import ShopContext from './shopContext';
import shopReducer from './shopReducer';
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

const ShopState = (props) => {
    const initialState = {
        editShop: null,
        shops: [],
        error: null
    };

    const [state, dispatch] = useReducer(shopReducer, initialState);

    //Get All Shops
    const getShops = async () => {

        try {
        const res = await axios.get('/shops')
        dispatch({
            type: GET_SHOPS,
            payload: res.data
        });
        } catch (err) {
        dispatch({
            type: SHOPS_ERROR,
            payload: err.response.msg
        });
        };
    };

    //Add new Shop 
    const addShop = async (shop) => {
        const config = {
        'Content-Type': 'application/json'
        };

        try {
        const res = await axios.post('/shops', shop, config)
        dispatch({
            type: ADD_SHOP,
            payload: res.data
        });
        } catch (err) {
        dispatch({
            type: SHOPS_ERROR,
            payload: err.response.msg
        });
        };
    };

    //Delete a Shop 
    const removeShop = async (id) => {

        try {
        await axios.delete(`/shops/${id}`)
        dispatch({
            type: REMOVE_SHOP,
            payload: id
        });
        } catch (err) {
        dispatch({
            type: SHOPS_ERROR,
            payload: err.response.msg
        });
        };
    };

    //Update Shop data
    const update_Shop = async (shop) => {
        const config = {
        headers: {
            'Content-Type': 'application/json'
        }
        };

        try {
        const res = await axios.put(`/shops/${shop._id}`, shop, config)
        dispatch({
            type: UPDATE_SHOP,
            payload: res.data
        });
        getShops();

        } catch (err) {
        dispatch({
            type: SHOPS_ERROR,
            payload: err.response
        });
        }
    };

    //Edit Shop data 
    const edit_Shop = (shop) => {
        dispatch({
        type: EDIT_SHOP,
        payload: shop
        });
    };

    const clearShopEdit = () => {
        dispatch({
        type: CLEAR_SHOP_EDIT
        });
    };

    const clearShops = () => {
        dispatch({
        type: CLEAR_SHOPS
        });
    };

    return (
        <ShopContext.Provider value={{
          shops: state.shops,
          editShop: state.editShop,
          error: state.error,
          loading: state.loading,
          addShop,
          removeShop,
          edit_Shop,
          clearShopEdit,
          update_Shop,
          getShops,
          clearShops
        }} >
          {props.children}
        </ShopContext.Provider >
    );
}

export default ShopState;


