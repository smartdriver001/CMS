Template.editPost.onRendered(function(){
    Session.set('banner',document.getElementById("edit-post").getElementsByClassName("form-control")[1].value);
});

Template.editPost.helpers({
    postObject: function(){
        return Session.get('postObject');
    },
    banner: function(){
        return Session.get('banner');
    }
});

Template.editPost.events({
    'click #edit-post-close': function(){
       Session.set('editPostVisible',false);
    },
    'click #edit-post-submit': function(event){
        event.preventDefault();
        Session.set('editPostVisible', false);
        var form = event.target.form;
        var object =  Session.get('postObject');
        var content = form.formContent.value.replace(/\r\n|\r|\n/g,"<br />");

        var postDetails = {
            "_id": object._id,
            "title": form.formTitle.value,
            'image': form.formImage.value,
            'content': content
        };

        Meteor.call('editPost',postDetails, function(error){
            if(error) {
                sAlert.error(TAPi18n.__('editPostError',Session.get('currentLanguage')) + error);
            } else {
                sAlert.success(TAPi18n.__('editPostSuccess',Session.get('currentLanguage')));
            }
        });
        return false;
    },
    'keyup #formImage': function(event){
        Session.set('banner',event.target.value);
    }
});
