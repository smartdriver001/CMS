Template.adminPanel.onRendered(function(){
    //check if admin
});

Template.adminPanel.events({
   'click #back': function(event){
       event.preventDefault();
       Router.go('/');
   }
});