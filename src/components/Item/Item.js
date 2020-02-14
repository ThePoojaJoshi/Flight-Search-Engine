
import React from 'react';
import './Item.css';
import logo from './flight_picture.jpg';

let Item = ({ item, children }) => (
  <div className="Item">
    <div className="Item-left">
        <h5>Rs. {item.fare}</h5>
        <div>{item.id}</div>
        <div className="Item-price">{item.source_code} > {item.destination_code} </div>
        <div className="Item-description">Depart: {item.departs_at}</div>
        <div className="Item-description">Arrive: {item.arrives_at}</div>
    </div>

    <div className="Item-right">
      <div className="Item-image" >
        <img src={logo} className="Item-logo" alt="logo" />
      </div>
      <button className="Item-book" onClick={Item.onClickHandler} type="submit">
        Book Now
      </button>
      {children}
    </div>
  </div>
)

Item.onClickHandler =  (event) => {
  alert("Flight booked successfully")
  // event.preventDefault();
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  children: React.PropTypes.node
};

export default Item;
