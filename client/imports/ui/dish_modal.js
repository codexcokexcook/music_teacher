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
        qty: 1,
        ingredients: []
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
    this.setState({
        qty: 1
    })
    
    this.setState({
        item: Session.get('selectedDish'),
        origin: Session.get('selectedDish').meta.origin,
        small: Session.get('selectedDish').meta.small
    },() => {
        // get ingredients from database follow dish id
        $('#modal_dish').modal('open');
        let dummyIngredients = Ingredients.find({ user_id: this.state.item.user_id, dish_name: this.state.item.dish_name }).fetch();
        this.setState({
            ingredients: dummyIngredients
        });
    })
  }

  renderIngredients = () => {
    if (this.state.ingredients) {
        return this.state.ingredients.map((item, index) => {
            return(
                <li className="row no-padding" key={index}>
                    <div className="col l8 m8 s8 no-padding">
                        <span className="name">{ item.ingredient_name }</span>
                    </div>
                    <div className="col l4 m4 s4 no-padding">
                        <span className="unit"> { item.ingredient_unit }</span>
                        <span className="qty">{ item.ingredient_quantity }</span>
                    </div>
                </li>
            )
        })
    }
  }

  renderAllergiesList = () => {
    if (this.state.item.allergy_tags) {
        return this.state.item.allergy_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderDietaryList = () => {
    if (this.state.item.dietary_tags) {
        return this.state.item.dietary_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderCuisinesTagList = () => {
    if (this.state.item.cuisines_tags) {
        return this.state.item.cuisines_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderProteinsTagList = () => {
    if (this.state.item.proteins_tags) {
        return this.state.item.proteins_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderCaterogiesTagList = () => {
    if (this.state.item.categories_tags) {
        return this.state.item.categories_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderCookingMethodsTagList = () => {
    if (this.state.item.cooking_methods_tags) {
        return this.state.item.cooking_methods_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderTasteTagList = () => {
    if (this.state.item.tastes_tags) {
        return this.state.item.tastes_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderTexturesTagList = () => {
    if (this.state.item.textures_tags) {
        return this.state.item.textures_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderVegetablesTagList = () => {
    if (this.state.item.vegetables_tags) {
        return this.state.item.vegetables_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderCondimentsTagList = () => {
    if (this.state.item.condiments_tags) {
        return this.state.item.condiments_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  renderServingTemperatureTagList = () => {
    if (this.state.item.serving_temperature_tags) {
        return this.state.item.serving_temperature_tags.map((item, index) => {
            return(
                <li index={index}>{ item }</li>
            )
        })
    }
  }

  render() {
    return (
        <div className="modal" id="modal_dish">
            <div className="row no-margin">
                <div className="col l4 m4 s12 dish-preview-banner no-padding">
                    <ProgressiveImages
                        large={ this.state.origin }
                        small={ this.state.small }
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
                    <div className="row dish-preview-information no-padding">
                        <div className="col l6 m6 s6">
                            <div className="row dish-preview-ingredients no-padding">
                                <div className="col l12 m12 s12 no-padding">
                                    <h5>Ingredients</h5>
                                    {
                                        (this.state.ingredients.length == 0)
                                        ?
                                            <span>...loading</span>
                                        :
                                            <ul className="dish-preview-list-ingredient">
                                                { this.renderIngredients() }
                                            </ul>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col l6 m6 s6">
                            <div className="row dish-preview-ingredients no-padding">
                                <div className="col l12 m12 s12 no-padding">
                                    <h5>Allergies &amp; Dietary preference </h5>
                                    {
                                        (this.state.ingredients.length == 0)
                                        ?
                                            <span>...loading</span>
                                        :
                                            <ul className="dish-preview-list-allergies">
                                                { this.renderAllergiesList() }
                                                { this.renderDietaryList() }
                                            </ul>
                                    }
                                </div>
                            </div>
                            <div className="row dish-preview-tags no-padding">
                                <div className="col l12 m12 s12 no-padding">
                                    <h5>Tags </h5>
                                    {
                                        (this.state.ingredients.length == 0)
                                        ?
                                            <span>...loading</span>
                                        :
                                            <ul className="dish-preview-list-tags">
                                                { this.renderCuisinesTagList() }
                                                { this.renderProteinsTagList() }
                                                { this.renderCaterogiesTagList() }
                                                { this.renderCookingMethodsTagList() }
                                                { this.renderTasteTagList() }
                                                { this.renderTexturesTagList() }
                                                { this.renderVegetablesTagList() }
                                                { this.renderCondimentsTagList() }
                                                { this.renderServingTemperatureTagList() }
                                            </ul>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
  }
}