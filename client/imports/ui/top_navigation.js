import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// App component - represents the whole app
class TopNavigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
        avatar: ''
    }
  }

  render() {
    return (
        <div className="navbar-fixed z-depth-0">
            <nav className = "z-depth-0">
                <div className="nav-wrapper white z-depth-0">
                    <a href="" className="nav_brand_logo left" data-activates="chatbot_nav"><img src="/navbar/BPLogo_sysmbol.svg" className="navbar_logo" height="40" width="40" /></a>
                    <ul className="right">
                        <li className="profile_icon_wrapper">
                            {
                                (this.props.loading) ?
                                    <span>...loading</span>
                                :   <a className="btn-floating grey lighten-1 logo_wrapper navbar_profile_logo" style={{ backgroundImage: "url(" + this.props.profileImages[0].meta.base64 + ")" }}></a>   
                            } 
                        </li>
                     </ul>
                </div>
            </nav>
        </div>
    );
  }
}

export default withTracker(props => {
    const handle = Meteor.subscribe('theProfileImages');
    return {
        currentUser: Meteor.user(),
        loading: !handle.ready(),
        profileImages: profile_images.find({ 'userId': Meteor.userId(), 'meta.purpose': 'profile_picture'}).fetch()
    };
})(TopNavigation);
