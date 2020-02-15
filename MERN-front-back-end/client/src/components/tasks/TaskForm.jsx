import React, { useContext, useState, useEffect } from 'react';
import TaskContext from '../../context/taskContext/taskContext';
import styled from 'styled-components';

const TaskCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  border-radius: 6px; 
  text-align: center;
  margin: 1rem auto;
`;

const Title = styled.h1`
    color: #DFC989;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 0.1rem;
`;

const Input = styled.input`
    height: 40px;
    width: 60%;
    outline: none;
    padding: 10px;
    border: solid 1px black;
    margin-bottom: 0.3rem;
`;

const AddBtn = styled.input`
    height: 40px;
    width: 60%;
    outline: none;
    padding: 10px;
    border: none;
    margin-bottom: 20px;
    border: solid 1px black;
    cursor: pointer;
    background-color:#DFC989;
    color: #FFF;
`;

const TaskForm = () => {

    const context = useContext(TaskContext);
    const { addTask, editTask, clearEdit, update_Task } = context;
  
    useEffect(() => {
      if (editTask !== null) {
        setTask(editTask)
      } else {
        setTask({
          description: '',
          notice: '',
        })
      }
    }, [editTask, context])
  
    const [task, setTask] = useState({
        description: '',
        notice: '',
    })
    const { description, notice } = task
    const onchange = (e) => {
      setTask({
        ...task,
        [e.target.name]: e.target.value
      })
    }
    const onsubmit = (e) => {
      e.preventDefault();
      if (editTask === null) {
        addTask(task);
  
      } else {
        update_Task(task)
        clearEdit()
      }
      setTask({
        description: '',
        notice: '',
      })
    }
    return (
      <TaskCard>
        <Title>{editTask !== null ? 'Edit Task' : 'Create Task'}</Title>
        <form onSubmit={onsubmit} >
          <Input type="text" placeholder="Description" name="description" value={description} onChange={onchange} required />
          <Input type="text" placeholder="Notice" name="notice" value={notice} onChange={onchange} required />
          <AddBtn type="submit" value={editTask !== null ? 'Update Task' : 'Add Task'} className="btn" />
          {editTask !== null ? < AddBtn onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
        </form>
      </TaskCard>
    )
  }
  
  export default TaskForm;