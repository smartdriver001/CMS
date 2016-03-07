Template.menu.helpers({
    Posts: function(){
        return posts.find({},{sort: {date: -1}});
    },
    showQuickLinks: function(){
        return (!(Router.current().route.path() == '/contact'));
    },
    recentPosts: function(){
        return posts.find({},{sort: {date:-1},limit:10});
    }
});


Template.menu.events({
    'click #menu #activate': function(){
        $('html, body').animate({ scrollTop: 0 },'slow');
        Session.set('newPostVisible',true);
    },
    'click #menu #logout': function(){
        Meteor.logout(error => {
            if(error) {
                sAlert.error(error.reason);
            } else {
                sAlert.success(TAPi18n.__('loggedOut',Session.get('currentLanguage')));
            }
        });
    },
    'click #menu #adminPanel': function(){
        $('html, body').animate({ scrollTop: 0 },'slow', function(){
            Router.go('/adminPanel');
        });
    },
    'click #login-submit': function(event){
        event.preventDefault();
        let form = event.target.form;
        Meteor.loginWithPassword(form.loginUsername.value,form.loginPassword.value, error => {
            if(error) {
                sAlert.error(error.reason);
            } else {
                sAlert.success(TAPi18n.__('loggedIn',Session.get('currentLanguage')));
            }
        });
    },
    'click #menu #register': function(){
        $('html, body').animate({ scrollTop: 0 },'slow', function(){
            Router.go('/register');
        });
    },
    'click #menu #fast-link': function(){
        var _id = this._id;
        $('html, body').animate({ scrollTop: 0 },'slow', function(){
            Router.go('/post/' + _id, {query: 'id=' + _id});
        });
    }
});