import React, { useContext, useEffect, useState } from 'react';
import RequestContext from '../../../context/requestContext/requestContext';
import RequestCounter from '../RequestCounter/RequestCounter';
import SearchRequest from '../SearchRequest/SearchRequest';
import RequestList from '../RequestList/RequestList';
import './RequestForm.css';

const RequestForm = () => {

  const requestContext = useContext(RequestContext);
  const { addRequest, editRequest, clearEdit, update_Request } = requestContext;

  const [request, setRequest] = useState({
    name: '',
    quantity: '',
    shopName: ''
  });

  useEffect(() => {
    if (editRequest !== null) {
      setRequest(editRequest)
    } else {
      setRequest({
        name: '',
        quantity: '',
        shopName: ''
      });
    }
  }, [editRequest, requestContext]);

  const { name, quantity, shopName } = request;

  const onchange = (event) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value
    });
  };

  const onsubmit = (event) => {

    event.preventDefault();
    if (editRequest === null) {
      addRequest(request);

    } else {
      update_Request(request)
      clearEdit()
    }
    setRequest({
        name: '',
        quantity: '',
        shopName: ''
    });
  };

    return (
      <div>
        <div className="request">
            <h2 className="requestHeader">{editRequest !== null ? 'Коригирай заявка' : 'Създай заявка'}</h2>
            <form className="requestForm" onSubmit={onsubmit}>
              <input type="text" placeholder="Име/Заявка" name="name" value={name} onChange={onchange} required/>
              <input type="text" placeholder="Количество" name="quantity" value={quantity} onChange={onchange} required/>
              <h3 className="subMenu">Избери Магазини</h3>
              <div className="check">
                <label className="container">Пазарджик
                <input type="radio" name="shopName" value="Пазарджик" onChange={onchange} checked={shopName === 'Пазарджик'}/>
                  <span className="checkmark"></span>
                </label>
                <label className="container">Драгор
                <input type="radio" name="shopName" value="Драгор" onChange={onchange} checked={shopName === 'Драгор'}/>
                  <span className="checkmark"></span>
                </label>
              </div>       
              <input type="submit" className="btn" value={editRequest !== null ? 'Коригирай' : 'Създай'} />
              {editRequest !== null ? < input onClick={clearEdit}
              type="button" className="btn clear" value="x" /> : null}
            </form>  
            <div>
              <RequestList />
              <RequestCounter />
              <SearchRequest />
            </div>
          </div>
        </div>
      )
}

export default RequestForm;
