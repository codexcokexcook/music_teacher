Template.forgot_password.events({
  'click #submit_forgot_password': function(event) {
    event.preventDefault();

    email = $('#forgot_password_email').val().toLowerCase();

    if (email && isEmail(email)) {
      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            $('.message_response').text('This email does not exist. Please try again.');
          } else {
            $('.message_response').text('We are sorry but something went wrong. Please try again. ' + err.message);
          }
        } else {
          $('.message_response').text('An email has been sent to the address above. Please click the link given to reset your password.');
        }
      });
    }
    return false;
  },

  'click #cancel_forgot_password': function() {
    $('.forgot_password').remove();
    $('#login_modal').append(login_content);
  }
})
