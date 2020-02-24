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
  
  export default (state, { type, payload }) => {
    switch (type) {
      case GET_RESERVES:
        return {
          ...state,
          reserves: payload,
          error: null
        }
      case ADD_RESERVE:
        return {
          ...state,
          reserves: [...state.reserves, payload]
        }
      case REMOVE_RESERVE:
        return {
          ...state,
          reserves: state.reserves.filter(reserve => reserve._id !== payload)
        }
      case EDIT_RESERVE:
        return {
          ...state,
          editReserve: payload
        }
      case CLEAR_EDIT:
        return {
          ...state,
          editReserve: null
        }
      case UPDATE_RESERVE:
        return {
          ...state,
          reserves: state.reserves.map(reserve => reserve._id === payload._id ? payload : reserve)
        }
      case RESERVES_ERROR:
        return {
          ...state,
          error: payload,
        }
      case CLEAR_RESERVES:
        return {
          ...state,
          editReserve: null,
          reserves: [],
          error: null
        }
      default:
        return state
    }
  }