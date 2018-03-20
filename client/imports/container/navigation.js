import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import TopNavigation from '../ui/top_navigation';

export default TopNavigationContainer = withTracker(() => {
  const handle = Meteor.subscribe('theProfileImages');
  const loading = !handle.ready();
  const avatar = profile_images.find({ userId: Meteor.userId() }, { limit: 1 });
  return {
    loading,
    avatar: !loading ? avatar.fetch() : [],
  };
})(TopNavigation);