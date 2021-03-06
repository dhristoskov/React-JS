import {
    TOGGLE_TASKFILTER,
    SEARCH_TASK,
    CLEAR_SEARCH,
    REMOVE_TASK,
    ADD_TASK,
    EDIT_TASK,
    CLEAR_EDIT_TASK,
    UPDATE_TASK,
    GET_TASKS,
    TASKS_ERROR,
    CLEAR_TASKS
} from '../consts';

export default ( state, { type, payload }) => {
    switch(type){
        case GET_TASKS:
            return {
                ...state,
                tasks: payload,
                error: null
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, payload]
            }  
        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== payload)
            }   
        case EDIT_TASK:
            return {
                ...state,
                editTask: payload
            }
        case CLEAR_EDIT_TASK:
            return {
                ...state,
                editTask: null
            } 
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === payload._id ? payload : task)
            }     
        case TOGGLE_TASKFILTER:
            return {
            ...state,
            taskFilter: !state.taskFilter
            }
        case SEARCH_TASK:
            const regex = new RegExp(`${payload}`, 'gi')
            return {
            ...state,
            searchTask: state.tasks.filter(task => task.description.match(regex))
            }
        case CLEAR_SEARCH:
            return {
            ...state,
            searchTask: null
            }
        case TASKS_ERROR:
            return {
                ...state,
                error: payload,
            } 
        case CLEAR_TASKS:
            return {
                ...state,
                taskFilter: false,
                searchTask: null,
                editTask: null,
                tasks: [],
                error: null
            }   
        default:
            return state          
    }
}