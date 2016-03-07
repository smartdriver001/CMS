Template.singlePostView.onCreated(function(){
    Meteor.call('postValidate',Router.current().params._id, function(error){
        if(error) {
            Router.go('main',{_id:1},{hash:'undefinedPost'});
        }
    });
});

Template.singlePostView.onRendered(function(){
    Session.set('createCommentVisible',false);
    Session.set('editCommentVisible',false);
    Session.set('loading',false);

    if(Router.current().params.hash === 'comments'){
        window.scrollTo(0,0);
        $("html, body").delay(500).animate({scrollTop: $('#comments').offset().top }, 1500);
    } else {
        $('html, body').animate({ scrollTop: 0 },'slow');
    }
});

Template.singlePostView.helpers({
    comments: function(){
        return comments.find({});
    },
    author: function(){
        try {
            var post = this;
            var author = Meteor.users.findOne({_id:post.author});
            return author.username;
        } catch(err) {
            return null;
        }
    },
    formatDate: function(date){
        try {
            var formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
            return formattedDate;
        } catch (err) {
            return 'heh';
        }
    },
    selectedComment: function(){
        return Session.get('selectedComment');
    },
    createCommentVisible: function(){
        return Session.get('createCommentVisible');
    },
    editCommentVisible: function(){
        return Session.get('editCommentVisible');
    },
    currentDate: function(){
        return new Date();
    }
});

Template.singlePostView.events({
    'click #create-comment': function(){
       Session.set('createCommentVisible',true);
    },
    'click #new-comment-close': function(){
        Session.set('createCommentVisible',false);
    },
    'click #edit-comment-close': function(){
        Session.set('editCommentVisible',false);
    },
    'click #new-comment-add': function(event){
        event.preventDefault();
        Session.set('createCommentVisible',false);

        var details = {
            "_id": this._id,
            "message": event.target.form.commentContent.value
        };

        Meteor.call('addComment',details, function(error){
            if(error) {
                sAlert.error(TAPi18n.__('addCommentError',Session.get('currentLanguage')) + error);
            } else {
                sAlert.success(TAPi18n.__('addCommentSuccess',Session.get('currentLanguage')));
            }
        });
    },
    'click #edit-comment-submit': function(event){
        event.preventDefault();
        Session.set('editCommentVisible',false);
        var selectedComment = Session.get('selectedComment');
        console.log();
        var details = {
            "_id": selectedComment._id,
            "newMessage": event.target.form.commentContent.value
        };

        Meteor.call('editComment',details, function(error){
            if(error) {
                sAlert.error(TAPi18n.__('editCommentError',Session.get('currentLanguage')) + error);
            } else {
                sAlert.success(TAPi18n.__('editCommentSuccess',Session.get('currentLanguage')));
            }
        });
    },
    'click .author': function(event){
        Router.go('/profile/' + event.target.text , {query: 'username=' + event.target.text});
    }
});