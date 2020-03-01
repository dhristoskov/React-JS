import React, { useContext } from 'react'
import RequestContext from '../../../context/requestContext/requestContext';
import './RequestCounter.css';

const RequestCounter = () => {

    const { requests } = useContext(RequestContext);

    const confirmed = requests.filter(request => request.isItConfirmed);

    const countByShop = (shopName) => {
        return {
        total: requests.filter(request => request.shopName === shopName).length,
        confirmed: confirmed.filter(request => request.shopName === shopName).length
        };
    }

    return (
        <div className="tableCounter">
        <h3 className="tableHeader">Брой Заявки</h3>
          <table>
            <tbody>
              <tr>
                <th>Заявки</th>
                <th>Налични</th>
                <th>Приключени</th>
              </tr>
              <tr>
                <th>Пазарджик</th>
                <td>{countByShop('Пазарджик').total}</td>
                <td>{countByShop('Пазарджик').confirmed}</td>
              </tr>
              <tr>
                <th>Драгор</th>
                <td>{countByShop('Драгор').total}</td>
                <td>{countByShop('Драгор').confirmed}</td>
              </tr>
              <tr>
                <th>Общо</th>
                <td>{requests.length}</td>
                <td>{confirmed.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )

}
export default RequestCounter;