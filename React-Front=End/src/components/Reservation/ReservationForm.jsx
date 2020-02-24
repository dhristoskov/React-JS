import React, { useContext, useEffect, useState } from 'react';
import ReserveContext from '../../context/reserveContext/reserveContext';

const ReservationForm = () => {

    const context = useContext(ReserveContext);
    const { addReserve, editReserve, clearEdit, update_Reserve } = context;

    const [reserve, setReserve] = useState({
        name: '',
        email: '',
        visitors: '',
        startDate: '',
        notice: ''
  });

    useEffect(() => {
        if (editReserve !== null) {
            setReserve(editReserve)
        } else {
            setReserve({
            name: '',
            email: '',
            visitors: '',
            startDate: '',
            notice: ''
          })
        }
      }, [editReserve, context]);

    const { name, email, visitors, startDate, notice } = reserve;  

    const onchange = (event) => {
        setReserve({ ...reserve, [event.target.name]: event.target.value });
    }
    const onsubmit = (event) => {
        event.preventDefault();
        if (editReserve === null) {
            addReserve(reserve);   
        } else {
            update_Reserve(reserve);
            clearEdit();
        };

        setReserve({
            name: '',
            email: '',
            visitors: '',
            startDate: '',
            notice: ''
        });
      };
    

    return(
        <div className="cardForm">
        <h2>{editReserve !== null ? 'Edit Reservation' : 'Reserve a Table'}</h2>
        <form onSubmit={onsubmit} >
            <input type="text" placeholder="Name" name="name" value={name} onChange={onchange} required />
            <input type="email" placeholder="E-mail" name="email" value={email} onChange={onchange} required />
            <input type="number" placeholder="Visitors" name="visitors" value={visitors} onChange={onchange} required />
            <input type="date" placeholder="Date" name="startDate" value={startDate} onChange={onchange} required />
            <input type="text" placeholder="Notice" name="notice" value={notice} onChange={onchange} required />
            <input type="submit" value={editReserve !== null ? 'Update Reservation' : 'Reserve a Table'} className="btn" />
            {editReserve !== null ? < input onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
        </form>
    </div>
    );
}

export default ReservationForm;