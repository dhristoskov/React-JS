import React, { useContext } from 'react';
import RequestContext from '../../../context/requestContext/requestContext';
import { 
    MdEdit, 
    MdDelete, 
    MdCheckBox 
} from 'react-icons/md';

const RequestSettings = ({ request }) => {
    const { removeRequest, edit_Request, clearEdit, update_Request } = useContext(RequestContext);
    const { _id, name, quantity, shopName, isItConfirmed } = request;

    const handleRemove = () => {
        removeRequest(_id);
        clearEdit();
    };

    const onchange = () => {
        update_Request({ ...request, isItConfirmed: !isItConfirmed });
    };

    return (
        <div className="card">
          <div className="head">
            <div >
              <label className={`${isItConfirmed && 'confirm'}`}>Изпълнена
                <MdCheckBox className={`${isItConfirmed && 'confirm'}`}/><input type="checkbox" onChange={onchange} />
              </label>
            </div>
            <div>
              <button title="Котигирай"><MdEdit onClick={() => edit_Request(request)} /></button>
              <button onClick={handleRemove} title="Изтрий"><MdDelete /></button>
            </div>
          </div>
          <div>
            <h3>{name}</h3>
            <p>{quantity}</p>
            <span className={'badge ' + (shopName === 'Пазарджик' ? 'green' : 'yellow' )}>{shopName}</span>
          </div>
        </div>
      )

}
export default RequestSettings;