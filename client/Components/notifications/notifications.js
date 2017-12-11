Template.notifications.helpers({
  'notifications': function() {
    Notifications.find({receiver_id: Meteor.userId(), read: false}).observeChanges({
      added:function(id, doc){
        var option = {
          body: doc.content
        }
        var notification = new Notification(doc.title, option);
          notification.onclick = function(event) {
          event.preventDefault(); // prevent the browser from focusing the Notification's tab
          if (doc.title === 'New incoming order') {
            window.open('http://localhost:3000/cooking/', '_blank');
          }
          Meteor.call('notification.update', id);
        }
        notification.onclose = function(event) {
          return false;
        }
      }
    });
  }
});
