import React, { Component } from 'react';
import DishList from './dish_list.js';
 
// App component - represents the whole app
export default class ShowRoom extends Component {
 
  render() {
    return (
      <div className='section'>
        <DishList title="Dish at here"/>
      </div>
    );
  }
}