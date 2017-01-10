Template.profile.onRendered(function(){
    Session.set('newPostVisible',false);
    Session.set('editPostVisible',false);
    Session.set('loading',false);
});

Template.profile.helpers({
    formatDate: function(date){
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    userPosts: function() {
        return posts.find({}, { limit: 5 });
    }
});

Template.profile.events({
    'click #profile .fast-link': function(){
        const _id = this._id;
        $('html, body').animate({ scrollTop: 0 },'slow', () => {
            Router.go('/post/' + _id, { query: 'id=' + _id });
        });
    }
});