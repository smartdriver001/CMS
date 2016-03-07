Template.comment.helpers({
    formatDate: function(date){
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    getAvatar: function(authorId){
        var user = Meteor.users.findOne({"_id": authorId});
        return user.profile.avatar;
    },
    getUsername: function(authorId){
        var user = Meteor.users.findOne({"_id": authorId});
        return user.username;
    },
    postOwner: function(){
        return this.authorId===Meteor.userId();
    }
});

Template.comment.events({
    'click #comment-delete': function(){
       Meteor.call('deleteComment',this._id, function(err,result){
           if(err) {
               sAlert.error(TAPi18n.__('deleteCommentError','',Session.get('currentLanguage')));
           } else {
               sAlert.success(TAPi18n.__('deleteCommentSuccess','',Session.get('currentLanguage')));
           }
       });
    },
    'click #comment-edit': function(event){
        Session.set('editCommentVisible',true);

        var author = Meteor.users.findOne({_id:this.authorId});

        var object = {
            _id: this._id,
            avatar: author.profile.avatar,
            username: author.username,
            date: this.date,
            content: this.message
        };

        Session.set('selectedComment',object);
    }
});