import React, { Component } from 'react';

import DishList from './dish_list.js';
import DishModal from './dish_modal';
 
// App component - represents the whole app
export default class ShowRoom extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: {}
    }
  }

  handlePopup = (item) => {
    this.setState({
      selectedDish: item
    });
  }

  render() {
    return (
      <div className="col l12 m12 s12">
        <DishList title="Explore dish of today" seemore="see more available dishes" popup={ this.handlePopup }/>
        <DishModal item={this.state.item}/>
      </div>
    );
  }
}