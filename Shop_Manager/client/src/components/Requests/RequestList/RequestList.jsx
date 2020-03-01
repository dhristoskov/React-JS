import React, { useContext, useEffect } from 'react';
import RequestSettings from '../RequestSettings/RequestSettings';
import RequestContext from '../../../context/requestContext/requestContext';
import AuthContext from '../../../context/authContext/authContext';
import './RequestList.css';

const RequestList = () => {

  const requestContext = useContext(RequestContext)
  const { loading } = useContext(AuthContext)
  const { requests, requestFilter, searchRequest, getRequests } = requestContext
  useEffect(() => {
    getRequests();
    // eslint-disable-next-line
  }, []);

  if (requests === null || requests.length === 0) {
    return <h3 className="no-request">{loading ? 'Зреждам заявките...' : 'Моля добавете заявка'}</h3>
  }

  return (
      <div className="requestList">
        {searchRequest !== null ? searchRequest.map(request => (
          <div key={request._id}>
            <RequestSettings request={request} />
          </div>)) :
          requests.filter(request => !requestFilter || request.isItConfirmed).map(request => 
            (<div key={request._id} >
            <RequestSettings request={request} />
          </div>)
          )}
      </div>
  )
}
export default RequestList