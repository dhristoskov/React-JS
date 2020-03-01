import React, { useContext, useEffect } from 'react';
import ShopItem from '../ShopItem/ShopItem';
import ShopContext from '../../../context/shopContext/shopContext';
import AuthContext from '../../../context/authContext/authContext';

const ShopList = () => {

    const shopContext = useContext(ShopContext);
    const { loading } = useContext(AuthContext);
    const { shops, getShops } = shopContext;

    useEffect(() => {
        getShops();
        // eslint-disable-next-line
      }, []);

    if (shops === null || shops.length === 0) {
        return <h3 className="no-shops">{loading ? 'Зарежда търговските обекти...' 
        : 'Добавете търговски обект '}</h3>
    };
    
    return(
        <div>
           { shops.map(shop => (<ShopItem key={shop._id} shop={shop}/>))}
        </div>
    )
}

export default ShopList;