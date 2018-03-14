import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

import Rating from './rating';
import ProgressiveImages from './progressive_image';

// App component - represents the whole app
export default class DishModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        item: {},
        qty: 1
    }
  }

  closeModal = () => {
    $('#modal_dish').modal('close');
  }

  decreaseQty = () => {
        if (this.state.qty > 1) {
            this.setState({
                qty: this.state.qty - 1
            })
        }
    }

    increaseQty = () => {
        this.setState({
            qty: this.state.qty + 1
        })
    }

  componentWillReceiveProps = () => {
      if (!this.props.item) {
        this.setState({
            item: Session.get('selectedDish')
        },() => {
            $('#modal_dish').modal('open');
        })
      } else {
        this.setState({
            item: this.props.item
        },() => {
            $('#modal_dish').modal('open');
        })
      }
  }

  render() {
    return (
        <div className="modal" id="modal_dish">
            <div className="row">
                <div className="col l4 m4 s12 dish-preview-banner no-padding">
                    <ProgressiveImages
                        large="https://blueplate-images.s3.ap-southeast-1.amazonaws.com/images/original/test2.jpg"
                        small="https://blueplate-images.s3.ap-southeast-1.amazonaws.com/images/small/test2.jpg"
                    />
                </div>
                <div className="col l8 m8 s12 dish-preview-content">
                    <span className="fa fa-times close-modal" onClick={ this.closeModal }></span>
                    <div className="row dish-preview-navigation">
                        <div className="col l12 s12 m12">
                            <h1 className="title">{ this.state.item.dish_name }</h1>
                        </div>
                        <div className="row">
                            <div className="col l8 s8 m8">
                                <span className="price">$ { this.state.item.dish_selling_price }</span>
                                <span className="qty">
                                    <span className="decreaseQty" onClick={ this.decreaseQty } >-</span>
                                    <span className="number">{ this.state.qty }</span>
                                    <span className="increaseQty" onClick={ this.increaseQty }>+</span>
                                </span>
                                <Rating rating={ this.state.item.average_rating } />
                                <span className="order-count">{ this.state.item.order_count }</span>
                            </div>
                            <div className="col l4 s4 m4">
                                <button className="btn">Order</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l12 s12 m12">
                                <span className="descrition">"{ this.state.item.dish_description }"</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}