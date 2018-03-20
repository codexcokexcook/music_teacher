import React, { Component } from 'react';

// App component - represents the whole app
export default class Sidebar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ul id="chatbot_nav" class="side-nav">
            <li><img id='home_link' src='/navbar/sidenav_bp_logo.svg' width="300" /></li>
            <li><span style = "margin-left: 24px;">Eating</span></li>
            <li><a href="" id="food_search"><i class="material-icons">local_pizza</i>Search for food</a></li>
            <li><a href="" id="shopping_cart"><i class="material-icons">shopping_basket</i>Shopping Cart</a></li>
            <li><a href="" id="foodies_orders_tracking"><i class="material-icons">event_available</i>Orders Tracking</a></li>
            <li class="divider"></li>
            <li><span style = "margin-left: 24px;">Cooking</span></li>
            <li><a href="" id="cooking_dashboard"><i class="material-icons">dashboard</i>Dashboard</a></li>
            <li><a href="" id="manage_dishes"><i class="material-icons">restaurant</i>Manage Dishes</a></li>
            <li><a href="" id="manage_menus"><i class="material-icons">map</i>Manage Menus</a></li>
            <li><a href="" id="manage_orders"><i class="material-icons">event_available</i>New/Current Orders</a></li>
            <li class="divider"></li>
            <li><a href="" id="profile_link"><i class="material-icons">person</i>Profile</a></li>
            <li><a href="" id="settings_link"><i class="material-icons">settings</i>Settings</a></li>
            <li><a href="" id="logout_link"><i class="material-icons">exit_to_app</i>Log out</a></li>
        </ul>
    );
  }
}