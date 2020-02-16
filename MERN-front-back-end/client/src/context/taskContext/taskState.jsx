import React, { useReducer } from 'react';
import axios from 'axios';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
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

const TaskState = (props) => {
    const intialState = {
        editTask: null,
        tasks: [],
        error: null,
    }
    const [state, dispatch] = useReducer(taskReducer, intialState);

    //Get Tasks
    const getTasks = async () => {
        try {
        const res = await axios.get('/tasks')
        dispatch({
            type: GET_TASKS,
            payload: res.data
            })
        } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: err.response.msg
            })
        }
    }

    //Add Task 
    const addTask = async (task) => {
        const config = {
        'Content-Type': 'application/json'
        }
        try {
        const res = await axios.post('/tasks', task, config)
        dispatch({
            type: ADD_TASK,
            payload: res.data
            })
        } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: err.response.msg
            })
        }
    }

    //Remove Task 
    const removeTask = async (id) => {
        try {
        await axios.delete(`/tasks/${id}`)
        dispatch({
            type: REMOVE_TASK,
            payload: id
            })
        } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: err.response.msg
            })
        }
    }

    //Update Task
    const update_Task = async (task) => {
        const config = {
        headers: {
            'Content-Type': 'application/json'
            }
        }
        try {
        const res = await axios.put(`/guests/${task._id}`, task, config)
        dispatch({
            type: UPDATE_TASK,
            payload: res.data
            })
        getTasks()

        } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: err.response
            })
        }
    }

    const toggleTaskFilter = () => {
        dispatch({
          type: TOGGLE_TASKFILTER
        })
      }
    
      //Search Task
      const search_Task = (task) => {
        dispatch({
          type: SEARCH_TASK,
          payload: task
        })
      }
      const clearSearchTask = () => {
        dispatch({
          type: CLEAR_SEARCH
        })
      }

    //Edit Task
    const edit_Task = (task) => {
        dispatch({
        type: EDIT_TASK,
        payload: task
        })
    }
    const clearEdit = () => {
        dispatch({
        type: CLEAR_EDIT_TASK
        })
    }
    const clearTasks = () => {
        dispatch({
        type: CLEAR_TASKS
        })
    }

    return (
        <TaskContext.Provider value={{
          tasks: state.tasks,
          taskFilter: state.taskFilter,
          searchTask: state.searchTask,
          editTask: state.editTask,
          error: state.error,
          loading: state.loading,
          addTask,
          removeTask,
          edit_Task,
          clearEdit,
          update_Task,
          toggleTaskFilter,
          search_Task,
          clearSearchTask,
          getTasks,
          clearTasks
        }} >
          {props.children}
        </TaskContext.Provider >
      )
}
export default TaskState;