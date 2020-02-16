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

const Priority = styled.p`
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    color: #1A021E;
`;

const Radio = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 1rem;
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
          priority: 'Normal'
        })
      }
    }, [editTask, context])
  
    const [task, setTask] = useState({
        description: '',
        notice: '',
        priority: 'Normal'
    })
    const { description, notice, priority } = task
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
        priority: 'Normal'
      })
    }
    return (
      <TaskCard>
        <Title>{editTask !== null ? 'Edit Task' : 'Create Task'}</Title>
        <form onSubmit={onsubmit} >
          <Input type="text" placeholder="Description" name="description" value={description} onChange={onchange} required />
          <Input type="text" placeholder="Notice" name="notice" value={notice} onChange={onchange} required />
          <Priority>Task Priority</Priority>
          <Radio>
            <label className="container">Low
              <input type="radio" name="priority" value="Low" onChange={onchange} checked={priority === "Low"} />
                <span className="checkmark"></span>
              </label>
              <label className="container">Normal
              <input type="radio" name="priority" value="Normal" onChange={onchange} checked={priority === "Normal"} />
                <span className="checkmark"></span>
              </label>
              <label className="container">High
              <input type="radio" name="priority" value="High" onChange={onchange} checked={priority === "High"} />
                <span className="checkmark"></span>
              </label>
          </Radio>
          <AddBtn type="submit" value={editTask !== null ? 'Update Task' : 'Add Task'} className="btn" />
          {editTask !== null ? < AddBtn onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
        </form>
      </TaskCard>
    )
  }
  
  export default TaskForm;