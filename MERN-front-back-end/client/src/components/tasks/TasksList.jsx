import React, { useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import TaskItem from './TaskItem';
import TaskContext from '../../context/taskContext/taskContext';
import AuthContext from '../../context/authContext/authContext';

const TasksList = () => {
    const context = useContext(TaskContext);
    const { loading } = useContext(AuthContext);
    const { tasks, taskFilter, searchTask, getTasks } = context

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line 
    }, []);

    if (tasks === null || tasks.length === 0) {
        return <h3 className="no-tasks">{loading ? 'Loading tasks...' : 'Please add new Task'}</h3>
    }

    return (
        <div >
          <div>
            {searchTask !== null ? searchTask.map(task => (
              <CSSTransition key={task._id} timeout={300}
                classNames='item' >
                <TaskItem task={task} />
              </CSSTransition>)) :
              tasks.filter(task => !taskFilter || task.isItDone).map(task => 
                (<CSSTransition key={task._id} timeout={300}
                classNames='item'>
                <TaskItem task={task} />
              </CSSTransition>)
              )}
          </div>
        </div>
      )
}

export default TasksList;
