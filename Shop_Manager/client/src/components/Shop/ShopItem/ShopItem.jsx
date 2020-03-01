import React, { useContext } from 'react';
import ShopContext from '../../../context/shopContext/shopContext';
import { 
    MdEdit, 
    MdDelete, 
} from 'react-icons/md';

const ShopList = ({ shop }) => {
    const { removeShop, edit_Shop, clearShopEdit } = useContext(ShopContext);
    const { _id, nameOfObject, location } = shop;

    const handleRemove = () => {
        removeShop(_id);
        clearShopEdit();
    };

    return (
        <div className="shopData">
          <div className="objectName">
              <h5>{nameOfObject}<span>{' '}{location}</span></h5>
          </div>
            <div className="settingsBtn">
              <button title="Котигирай"><MdEdit onClick={() => edit_Shop(shop)} /></button>
              <button onClick={handleRemove} title="Изтрий"><MdDelete /></button>
            </div>    
        </div>
      );

}
export default ShopList;