import React, { useContext } from 'react'
import GuestContext from '../../context/guestContext/guestContext';
import styled from 'styled-components';

const Table = styled.table`
    display: flex;
    border-collapse: collapse;
    width: 300px;
    text-transform: capitalize;
    font-size: bold
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

const CountGuestDiet = () => {
  const { guests } = useContext(GuestContext)

  const confirmed = guests.filter(guest => guest.isconfirmed);

  const countByDiet = (diet) => {
    return {
      total: guests.filter(guest => guest.diet === diet).length,
      confirmed: confirmed.filter(guest => guest.diet === diet).length
    };
  }

  return (
    <div>
    <Title>Guests Dietary</Title>
      <Table>
        <tbody>
          <Tr>
            <Th>Guest</Th>
            <Th>Invited</Th>
            <Th>Attending</Th>
          </Tr>
          <tr>
            <Th>Wthout Restriction</Th>
            <Td>{countByDiet('WithoutRestriction').total}</Td>
            <Td>{countByDiet('WithoutRestriction').confirmed}</Td>
          </tr>
          <tr>
            <Th>Vegan</Th>
            <Td>{countByDiet('Vegan').total}</Td>
            <Td>{countByDiet('Vegan').confirmed}</Td>
          </tr>
          <tr>
            <Th>Vegetarian</Th>
            <Td>{countByDiet('Vegetarian').total}</Td>
            <Td>{countByDiet('Vegetarian').confirmed}</Td>
          </tr>
          <tr>
            <Th>Total</Th>
            <Td>{guests.length}</Td>
            <Td>{confirmed.length}</Td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default CountGuestDiet