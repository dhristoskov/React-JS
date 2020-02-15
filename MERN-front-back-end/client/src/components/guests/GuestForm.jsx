import React, { useContext, useState, useEffect } from 'react';
import GuestContext from '../../context/guestContext/guestContext';
import styled from 'styled-components';

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  border-radius: 6px; 
  text-align: center;
  margin: 1rem auto;
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

const Title = styled.h1`
    color: #DFC989;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 0.1rem;
`;

const Dietary = styled.p`
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    color: #1A021E;
`;

const Radio = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1rem;
`;



const GuestForm = () => {

  const context = useContext(GuestContext);
  const { addGuest, editGuest, clearEdit, update_Guest } = context;

  useEffect(() => {
    if (editGuest !== null) {
      setGuest(editGuest)
    } else {
      setGuest({
        name: '',
        secondName: '',
        phone: '',
        email: '',
        diet: 'WithoutRestriction'
      })
    }
  }, [editGuest, context])

  const [guest, setGuest] = useState({
        name: '',
        secondName: '',
        phone: '',
        email: '',
        diet: 'WithoutRestriction'
  })
  const { name, secondName, phone, email, diet } = guest
  const onchange = (e) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value
    })
  }
  const onsubmit = (e) => {
    e.preventDefault();
    if (editGuest === null) {
      addGuest(guest);

    } else {
      update_Guest(guest)
      clearEdit()
    }
    setGuest({
      name: '',
      secondName: '',
      phone: '',
      email: '',
      diet: 'WithoutRestriction'
    })
  }
  return (

    <CardForm>
      <Title>{editGuest !== null ? 'Edit Guest' : 'Invite Someone'}</Title>
      <form onSubmit={onsubmit} >
        <Input type="text" placeholder="First Name" name="name" value={name} onChange={onchange} required />
        <Input type="text" placeholder="Last Name" name="secondName" value={secondName} onChange={onchange} required />
        <Input type="text" placeholder="Phone" name="phone" value={phone} onChange={onchange} required />
        <Input type="text" placeholder="Email" name="email" value={email} onChange={onchange} required />
        <Dietary>Dietary</Dietary>
        <Radio>
          <label className="container">Without Restriction
          <input type="radio" name="diet" value="WithoutRestriction" onChange={onchange} checked={diet === "WithoutRestriction"} />
            <span className="checkmark"></span>
          </label>
          <label className="container">Vegan
          <input type="radio" name="diet" value="Vegan" onChange={onchange} checked={diet === "Vegan"} />
            <span className="checkmark"></span>
          </label>
          <label className="container">Vegetarian
          <input type="radio" name="diet" value="Vegetarian" onChange={onchange} checked={diet === "Vegetarian"} />
            <span className="checkmark"></span>
          </label>
        </Radio>
        <AddBtn type="submit" value={editGuest !== null ? 'Update Guest' : 'Add Guest'} className="btn" />
        {editGuest !== null ? < AddBtn onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
      </form>

    </CardForm>
  )
}

export default GuestForm