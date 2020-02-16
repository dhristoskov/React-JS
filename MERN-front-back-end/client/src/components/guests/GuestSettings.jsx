import React, { useContext } from 'react';
import GuestContext from '../../context/guestContext/guestContext';
import { 
    MdEmail, 
    MdPhoneInTalk, 
    MdEdit, 
    MdDelete, 
    MdCheckBox 
} from 'react-icons/md';
import styled from 'styled-components';

const Card = styled.div`
    background: #DFC989;
    margin: 1.5rem 0;
    position: relative;
    max-width: 18rem;
    line-height: 1.6;
    margin-right:1rem;
`;

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    background: #ccc;
    padding: 0.2rem;
`;

const CardBody = styled.div`
    padding:1.2rem;
    position: relative;
    display: flex;
    flex-direction: column;
`;



const GuestSettings = ({ guest }) => {
  const { removeGuest, edit_Guest, clearEdit, update_Guest } = useContext(GuestContext)
  const { _id, name, secondName, phone, email, diet, isconfirmed } = guest

  const handleRemove = () => {
    removeGuest(_id)
    clearEdit()
  }
  const onchange = () => {
    update_Guest({ ...guest, isconfirmed: !isconfirmed })
  }

  return (
    <Card>
      <Head>
        <div >
          <label className={`${isconfirmed && 'confirm'}`}>Confirmed
            <MdCheckBox className={`${isconfirmed && 'confirm'}`}/><input type="checkbox" onChange={onchange} />
          </label>
        </div>
        <div>
          <button title="Edit Guest"><MdEdit onClick={() => edit_Guest(guest)} /></button>
          <button onClick={handleRemove} title="Remove Guest"><MdDelete /></button>
        </div>
      </Head>
      <CardBody>
        <h2>{name + ' ' + secondName}</h2>
        <span className={'badge ' + (diet === 'Vegan' ? 'green' : diet === 'WithoutRestriction' ? 'yellow' : 'seaGreen')}>{diet}</span>
        <div className="contact">
          <p><MdPhoneInTalk />{phone}</p>
          <p><MdEmail />{email}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default GuestSettings