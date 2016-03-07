Template.registerPage.events({
   'click #submit': function(event){
       event.preventDefault();
       var form = event.target.form;

       if(!form.username.value || !form.email.value || !form.password.value || !form.repassword.value || !form.firstName.value || !form.lastName.value) {
           sAlert.error(TAPi18n.__('fillAllFields',Session.get('currentLanguage')));
           return false;
       }

       if(form.password.value !== form.repassword.value) {
           sAlert.error(TAPi18n.__('passwordsNoMatch',Session.get('currentLanguage')));
           return false;
       }

       var newUser = {
           'username': form.username.value,
           'email': form.email.value,
           'password': form.password.value,
           'firstName': form.firstName.value,
           'lastName': form.lastName.value
       };

       Meteor.call('createAccount', newUser, function(err){
           if(err) {
               sAlert.error(TAPi18n.__('createAccountError',Session.get('currentLanguage')) + '\n' + err);
           } else {
               Meteor.loginWithPassword(newUser.username,newUser.password, function(err) {
                   if(err) {
                       sAlert.error(err);
                   } else {
                       sAlert.success(TAPi18n.__('createAccountSuccess',Session.get('currentLanguage')));
                   }
               });
               Router.go('/');
           }
       });
   }
});