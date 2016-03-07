Template.profile.onRendered(function(){
    Session.set('newPostVisible',false);
    Session.set('editPostVisible',false);
    Session.set('loading',false);
});

Template.profile.helpers({
    formatDate: function(date){
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
});