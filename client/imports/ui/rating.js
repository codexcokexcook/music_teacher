import React, { Component } from 'react';

// App component - represents the whole app
export default class Rating extends Component {

  constructor(props) {
    super(props);
    this.state = {
        rating: parseInt(this.props.rating)
    }
  }

  render() {
    return (
        <span className="rating-container">
            <span className={ (this.state.rating >= 1) ? "fa fa-star checked " : "fa fa-star" }></span>
            <span className={ (this.state.rating >= 2) ? "fa fa-star checked " : "fa fa-star" }></span>
            <span className={ (this.state.rating >= 3) ? "fa fa-star checked " : "fa fa-star" }></span>
            <span className={ (this.state.rating >= 4) ? "fa fa-star checked " : "fa fa-star" }></span>
            <span className={ (this.state.rating >= 5) ? "fa fa-star checked " : "fa fa-star" }></span>
        </span>
    );
  }
}