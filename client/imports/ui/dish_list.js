import React, { Component } from 'react';
 
// App component - represents the whole app
export default class DishList extends Component {
 
  render() {
    return (
      <div className='section'>
        <h5>{ this.props.title }</h5>
        <div className="card_container" id="show_room">
            DISH LIST
        </div>
      </div>
    );
  }
}