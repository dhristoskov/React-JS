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
  } from '../const'
  
  export default (state, { type, payload }) => {
    switch (type) {
      case GET_REQUESTS:
        return {
          ...state,
          requests: payload,
          error: null
        }
      case ADD_REQUEST:
        return {
          ...state,
          requests: [...state.requests, payload]
        }
      case REMOVE_REQUEST:
        return {
          ...state,
          requests: state.requests.filter(request => request._id !== payload)
        }
      case EDIT_REQUEST:
        return {
          ...state,
          editRequest: payload
        }
      case CLEAR_EDIT:
        return {
          ...state,
          editRequest: null
        }
      case UPDATE_REQUEST:
        return {
          ...state,
          requests: state.requests.map(request => request._id === payload._id ? payload : request)
        }
      case TOGGLE_REQUESTFILTER:
        return {
          ...state,
          requestFilter: !state.requestFilter
        }
      case SEARCH_REQUEST:
        const regex = new RegExp(`${payload}`, 'gi')
        return {
          ...state,
          searchRequest: state.requests.filter(request => request.name.match(regex))
        }
      case CLEAR_SEARCH:
        return {
          ...state,
          searchRequest: null
        }
      case REQUESTS_ERROR:
        return {
          ...state,
          error: payload,
        }
      case CLEAR_REQUESTS:
        return {
          ...state,
          requestFilter: false,
          searchRequest: null,
          editRequest: null,
          requests: [],
          error: null
        }
      default:
        return state
    }
}