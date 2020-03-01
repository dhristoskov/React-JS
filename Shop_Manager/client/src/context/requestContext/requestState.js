import React, { useReducer } from 'react';
import axios from 'axios';
import RequestContext from './requestContext';
import requestReducer from './requestReducer';
import {
    TOGGLE_REQUESTFILTER,
    SEARCH_REQUEST,
    CLEAR_SEARCH,
    REMOVE_REQUEST,
    ADD_REQUEST,
    EDIT_REQUEST,
    CLEAR_EDIT,
    UPDATE_REQUEST,
    GET_REQUESTS,
    REQUESTS_ERROR,
    CLEAR_REQUESTS
} from '../const';

const RequestState = (props) => {
  const initialState = {
    requestFilter: false,
    searchRequest: null,
    editRequest: null,
    requests: [],
    error: null
};

  const [state, dispatch] = useReducer(requestReducer, initialState)

  //Get Requests
  const getRequests = async () => {

    try {
      const res = await axios.get('/requests')
      dispatch({
        type: GET_REQUESTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REQUESTS_ERROR,
        payload: err.response.msg
      });
    };
  };

  //Add Guest 
  const addRequest = async (request) => {
    const config = {
      'Content-Type': 'application/json'
    };

    try {
      const res = await axios.post('/requests', request, config)
      dispatch({
        type: ADD_REQUEST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REQUESTS_ERROR,
        payload: err.response.msg
      });
    };
  };


  //Remove Request 
  const removeRequest = async (id) => {

    try {
      await axios.delete(`/requests/${id}`)
      dispatch({
        type: REMOVE_REQUEST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: REQUESTS_ERROR,
        payload: err.response.msg
      });
    };
  };

  //Update Request
  const update_Request = async (request) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/requests/${request._id}`, request, config)
      dispatch({
        type: UPDATE_REQUEST,
        payload: res.data
      });
      getRequests();

    } catch (err) {
      dispatch({
        type: REQUESTS_ERROR,
        payload: err.response
      });
    }
  };

  const toggleRequestFilter = () => {
    dispatch({
      type: TOGGLE_REQUESTFILTER
    });
  };

  //Search Request
  const search_Request = (request) => {
    dispatch({
      type: SEARCH_REQUEST,
      payload: request
    });
  };

  const clearSearchRequest = () => {
    dispatch({
      type: CLEAR_SEARCH
    });
  };

  //Edit Request 
  const edit_Request = (request) => {
    dispatch({
      type: EDIT_REQUEST,
      payload: request
    });
  };

  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    });
  };

  const clearRequests = () => {
    dispatch({
      type: CLEAR_REQUESTS
    });
  };

  return (
    <RequestContext.Provider value={{
      requests: state.requests,
      requestFilter: state.requestFilter,
      searchRequest: state.searchRequest,
      editRequest: state.editRequest,
      error: state.error,
      loading: state.loading,
      addRequest,
      removeRequest,
      edit_Request,
      clearEdit,
      update_Request,
      toggleRequestFilter,
      search_Request,
      clearSearchRequest,
      getRequests,
      clearRequests
    }} >
      {props.children}
    </RequestContext.Provider >
  )
}

export default RequestState;