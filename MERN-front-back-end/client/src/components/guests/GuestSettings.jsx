import React, { useContext } from 'react';
import GuestContext from '../../context/guestContext/guestContext';
import { 
    MdEmail, 
    MdPhoneInTalk, 
    MdEdit, 
    MdDelete, 
    MdCheckBox 
} from 'react-icons/md';

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
    <div className="guest-card">
      <div className="card-head">
        <div >
          <label className={`${isconfirmed && 'confirm'}`}>Confirmed
            <MdCheckBox className={`${isconfirmed && 'confirm'}`}/><input type="checkbox" onChange={onchange} />
          </label>
        </div>
        <div>
          <button title="Edit Guest"><MdEdit onClick={() => edit_Guest(guest)} /></button>
          <button onClick={handleRemove} title="Remove Guest"><MdDelete /></button>
        </div>
      </div>
      <div className="card-body">
        <h2>{name + ' ' + secondName}</h2>
        <span className={'badge ' + (diet === 'Vegan' ? 'green' : diet === 'WithoutRestriction' ? 'yellow' : 'seaGreen')}>{diet}</span>
        <div className="contact">
          <p><MdPhoneInTalk />{phone}</p>
          <p><MdEmail />{email}</p>
        </div>
      </div>
    </div>
  )
}

export default GuestSettings