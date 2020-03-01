import React, { useEffect, useState, useContext } from 'react';
import ShopList from '../ShopsList/ShopsList';
import ShopContext from '../../../context/shopContext/shopContext';

import './AddShops.css';

const AddShop = () => {

    const shopContext = useContext(ShopContext);
    const { addShop, editShop, clearShopEdit, update_Shop } = shopContext;

    const [shop, setShop] = useState({
        nameOfObject: '',
        location: ''
    });

    useEffect(() => {
        if (editShop !== null) {
            setShop(editShop)
        } else {
            setShop({
                nameOfObject: '',
                location: ''
            });
        }
    }, [editShop, shopContext]);

    const { nameOfObject, location } = shop;

    const onchange = (event) => {
        setShop({ ...shop, [event.target.name]: event.target.value });
    };

    const onsubmit = (event) => {

        event.preventDefault();
        if (editShop === null) {
            addShop(shop);    
        } else {
            update_Shop(shop)
            clearShopEdit()
        }
            setShop({
                nameOfObject: '',
                location: ''
            });
    };


    return(
       <div className="siteContainer">
           <div className="shopForm">
                <h2 className="shopHeader">{editShop !== null ? 'Коригирай обекта' 
                : 'Създай обект'}</h2>
                <p className="subName">{editShop !== null ? 'коригирай въведените данни' 
                : 'въведи данните, за новия обект'}</p>
                <form className='addShopForm' onSubmit={onsubmit}>
                    <input type="text" name="nameOfObject" placeholder="Име"
                     value={nameOfObject} onChange={onchange} required />
                    <input type="text" name="location" placeholder="Адрес"
                     value={location} onChange={onchange} />
                    <input type="submit" className="btn" value={editShop !== null ? 'Коригирай' : 'Създай'} />
                    {editShop !== null ? < input onClick={clearShopEdit} type="button" className="btn clear" value="x" /> : null}
                </form>
            </div>
            <div className="shopList">
                <ShopList />
            </div>
       </div>
    );
}

export default AddShop;