import React from 'react';
import styled from 'styled-components';
import TaskForm from '../tasks/TaskForm';
import TasksCount from '../tasks/TasksCount';
//import TasksList from '../tasks/TasksList';

const Container = styled.div`
    max-width: 75rem;
    margin: auto;
`;

const Main = styled.div` 
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
`;

const ToDoList = () => {
    return(
        <Container>
            <Main>
                <TaskForm />
                <TasksCount />
            </Main>
        </Container>
    )
}
export default ToDoList;