import React, { useContext } from 'react'
import TaskContext from '../../context/taskContext/taskContext';
import styled from 'styled-components';

const Table = styled.table`
    display: flex;
    border-collapse: collapse;
    width: 300px;
    text-transform: capitalize;
    font-size: bold;
`;

const Title = styled.h1`
    color: #DFC989;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 0.1rem;
    text-align:center;
    margin: 1rem auto 0.2rem;
`;

const Td = styled.td`
    text-align: center;
    padding: 0.7rem 1.6rem;
`;

const Th = styled.th`
    text-align: center;
    padding: 0.7rem 1.6rem;
`;

const Tr = styled.tr`
  background-color: rgba(223,201,137,1);
`;

const TasksCounter = () => {
  const { tasks } = useContext(TaskContext)

  const isItDone = tasks.filter(task => task.isItDone);

  const countByPriority = (priority) => {
    return {
      total: tasks.filter(task => task.priority === priority).length,
      isItDone: isItDone.filter(task => task.priority === priority).length
    };
  }

  return (
    <div>
    <Title>Tasks Counter</Title>
      <Table>
        <tbody>
          <Tr>
            <Th>Tasks</Th>
            <Th>Added</Th>
            <Th>Done</Th>
          </Tr>
          <tr>
            <Th>Low</Th>
            <Td>{countByPriority('Low').total}</Td>
            <Td>{countByPriority('Low').isItDone}</Td>
          </tr>
          <tr>
            <Th>Normal</Th>
            <Td>{countByPriority('Normal').total}</Td>
            <Td>{countByPriority('Normal').isItDone}</Td>
          </tr>
          <tr>
            <Th>High</Th>
            <Td>{countByPriority('High').total}</Td>
            <Td>{countByPriority('High').isItDone}</Td>
          </tr>
          <tr>
            <Th>Total</Th>
            <Td>{tasks.length}</Td>
            <Td>{isItDone.length}</Td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default TasksCounter;
