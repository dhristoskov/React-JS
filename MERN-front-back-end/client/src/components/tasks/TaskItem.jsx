import React, { useContext } from 'react';
import TaskContext from '../../context/taskContext/taskContext';
import { 
    MdEdit, 
    MdDelete, 
    MdCheckBox 
} from 'react-icons/md';

const TaskItem = ({ task }) => {
    const { removeTask, edit_Task, clearEdit, update_Task } = useContext(TaskContext);
    const { _id, description, notice, priority, isItDone } = task;

    const handleRemove = () => {
        removeTask(_id)
        clearEdit()
    };

    const onchange = () => {
        update_Task({ ...task, isItDone: !isItDone });
    };  

    return (
        <div>
          <div>
            <div >
              <label className={`${isItDone && 'done'}`}>Done
                <MdCheckBox className={`${isItDone && 'done'}`}/><input type="checkbox" 
                onChange={onchange} />
              </label>
            </div>
            <div>
              <button title="Edit Task"><MdEdit onClick={() => edit_Task(task)} /></button>
              <button onClick={handleRemove} title="Remove Task"><MdDelete /></button>
            </div>
          </div>
          <div>
            <h2>{description}</h2>
            <p>{notice}</p>
            <span className={'badge ' + (priority === 'Low' ? 'green'
            : priority === 'Normal' ? 'yellow' : 'red')}>{priority}</span>
          </div>
        </div>
    )
}

export default TaskItem;