import React, { useReducer } from 'react';
import axios from 'axios';
import ReserveContext from './reserveContext';
import reserveReducer from './reserveReducer';

import {
    REMOVE_RESERVE,
    ADD_RESERVE,
    EDIT_RESERVE,
    CLEAR_EDIT,
    UPDATE_RESERVE,
    GET_RESERVES,
    RESERVES_ERROR,
    CLEAR_RESERVES
} from '../const';

const ReserveState = (props) => {
  const initialState = {
    editReserve: null,
    reserves: [],
    error: null,
  }
  const [state, dispatch] = useReducer(reserveReducer, initialState);

  //Get Reservations
  const getReserves = async () => {
    try {
      const res = await axios.get('/reserves');
      dispatch({
        type: GET_RESERVES,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: RESERVES_ERROR,
        payload: err.response.msg
      });
    };
  };

  //Add Reservation 
  const addReserve = async (reserve) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/reserves', reserve, config);
      dispatch({
        type: ADD_RESERVE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: RESERVES_ERROR,
        payload: err.response.msg
        });
    };
  };

  //Remove Reservation 
  const removeReserve = async (id) => {
    try {
      await axios.delete(`/reserves/${id}`);
      dispatch({
        type: REMOVE_RESERVE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: RESERVES_ERROR,
        payload: err.response.msg
      });
    };
  };

  //Update Reservation
  const update_Reserve = async (reserve) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(`/reserves/${reserve._id}`, reserve, config);
      dispatch({
        type: UPDATE_RESERVE,
        payload: res.data
      });
      getReserves();

    } catch (err) {
      dispatch({
        type: RESERVES_ERROR,
        payload: err.response
      });
    };
  };
  
  //Edit Reservation 
  const edit_Resrve = (reserve) => {
    dispatch({
      type: EDIT_RESERVE,
      payload: reserve
    });
  };

  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    });
  };
  const clearReserves = () => {
    dispatch({
      type: CLEAR_RESERVES
    });
  };

  return (
    <ReserveContext.Provider value={{
      reserves: state.reserves,
      editReserve: state.editReserve,
      error: state.error,
      loading: state.loading,
      addReserve,
      removeReserve,
      edit_Resrve,
      clearEdit,
      update_Reserve,
      getReserves,
      clearReserves
    }} >
      {props.children}
    </ReserveContext.Provider >
  )
}

export default ReserveState;