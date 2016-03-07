AutoForm.hooks({
    insertPostForm: {
        onSuccess: function (operation, id) {
            console.log('cooo?');
            if(operation === 'insert' && id) {
                Meteor.users.update(Meteor.userId(), {$inc: {"profile.postCount":1}});
            }
            Session.set('newPostVisible',false);
        }
    }
});

Template.newPost.events({
    'click #add-post-submit': function(event){
        event.preventDefault();
        Session.set('newPostVisible',false);
        let form = event.target.form;
        let content = form.formContent.value.replace(/\r\n|\r|\n/g,"<br />");

        let postDetails = {
            "title": form.formTitle.value,
            'image': form.formImage.value,
            'category':form.formCategory.options[form.formCategory.selectedIndex].value,
            'content': content
        };

        Meteor.call('addPost',postDetails, function(error){
            if(error) {
                sAlert.error(TAPi18n.__('addPostError','',Session.get('currentLanguage')) + error);
            } else {
                sAlert.success(TAPi18n.__('addPostSuccess','',Session.get('currentLanguage')));
            }
        });
        return false;
    },
    'click #new-post-close': function(){
        Session.set('newPostVisible',false);

        return false;
    }
});