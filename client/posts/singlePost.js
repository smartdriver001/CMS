
Template.singlePost.events({
    'click .post-bottom #read-more': function() {
       Router.go('/post/' + this._id , {query: 'id=' + this._id});
    },
    'click .post-bottom #comments': function() {
        Router.go('/post/' + this._id + '#comments', {query: 'id=' + this._id,hash: 'comments'});
    },
    'click #single-post-edit': function(){
        var object = this;
        object.content = object.content.replace(/<br\s?\/?>/g,"\n");
        Session.set('postObject',object);
        Session.set('editPostVisible',true);
        $('html, body').animate({ scrollTop: 0 },'slow');
    },
    'click #single-post-delete': function(){
        var result = confirm(TAPi18n.__('deletePostConfirm',Session.get('currentLanguage')));

        if(result){
            var id = this._id;
            Meteor.call('removePost',id, function(err, result){
                if(err) {
                    sAlert.error(TAPi18n.__('deletePostError',Session.get('currentLanguage')) + err.reason);
                } else {
                    sAlert.success(TAPi18n.__('deletePostSuccess',Session.get('currentLanguage')));
                }
            });
        }
    }
});

Template.singlePost.helpers({
    tooLong: function(){
        var post = this;
        var content = post.content;

        return (content.length > 500);
    },
    postOwner: function(){
        return this.author===Meteor.userId();
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
    commentsCounter: function(){
        return " (" + ReactiveMethod.call("getCommentsCounter", this._id) + ")";
    },
    formatDate: function(date){
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
});