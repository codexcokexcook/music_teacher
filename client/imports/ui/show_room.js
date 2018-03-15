import React, { Component } from 'react';

import DishList from './dish_list';
import MenuList from './menu_list';
import DishModal from './dish_modal';
 
// App component - represents the whole app
export default class ShowRoom extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: {}
    }
  }

  handleDishPopup = (item) => {
    this.setState({
      selectedDish: item
    });
  }

  render() {
    return (
      <div className="col l12 m12 s12">
        <DishList title="Explore dish of today" seemore="see more available dish" popup={ this.handleDishPopup }/>
        <MenuList title="Set menu" seemore="see more available menu" popup={ this.handleDishPopup }/>
        <DishModal item={this.state.selectedDish}/>
      </div>
    );
  }
}