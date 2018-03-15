import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

import Rating from './rating';
import ProgressiveImages from './progressive_image';
import ChefAvatar from './chef_avatar';

// App component - represents the whole app
class DishList extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      loading: false
    }
  }

  handleClick = (item) => {
    Session.set('selectedDish', item);
    this.props.popup(item);
  }

  renderList = () => {
    return this.props.dishes.map((item, index) => {
      return (
        <div key={index} className="col l2 m2 modal-trigger" onClick={ () => this.handleClick(item) }>
          <div className="images-thumbnail">
            <ProgressiveImages
              large="https://blueplate-images.s3.ap-southeast-1.amazonaws.com/images/medium/food1.jpg"
              small="https://blueplate-images.s3.ap-southeast-1.amazonaws.com/images/small/food1.jpg"
            />
            <ChefAvatar userId={item.user_id} />
          </div>
          <div className="row no-margin text-left">
            <h5 className="dish-title">{ item.dish_name }</h5>
          </div>
          <div className="row no-margin">
            <div className="col l12 m12 dish-rating no-padding text-left">
              <Rating rating={item.average_rating}/>
              <span className="order-count">{ item.order_count }</span>
            </div>
          </div>
          <div className="row">
            <div className="col l12 m12 dish-price no-padding text-left">$ { item.dish_selling_price }</div>
          </div>

        </div>
      )
    })
  }

  render() {
    return (
      <div className='col s12 m12 l12'>
        {/* title */}
        <div className="row">
          <div className="col s6 m6 l6">
            <h5>{ this.props.title }</h5>
          </div>
          <div className="col s6 m6 l6 text-right">
            <a>{ this.props.seemore }</a>
          </div>
        </div>

        {/* list items */}
        <div className="row">
          {
            (this.props.listLoading)
            ?
              <span>...loading</span>
            :
              this.renderList()
          }
        </div>
      </div>
    );
  }
}

export default withTracker(props => {
  const handle = Meteor.subscribe('theDishes');
  return {
      currentUser: Meteor.user(),
      listLoading: !handle.ready(),
      dishes: Dishes.find({ deleted: false, online_status: true }, { limit: 6 }).fetch(),
  };
})(DishList);