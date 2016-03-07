Meteor.startup(function () {
    sAlert.config({
        effect: 'jelly',
        position: 'bottom-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0,
        beep: false
    });
});

Template.mainPage.onRendered(function(){
    Session.set('newPostVisible',false);
    Session.set('editPostVisible',false);
    Session.set('loading',false);

    if(!Session.get('currentLanguage')) {
        Session.set('currentLanguage','pl');
        TAPi18n.setLanguage('pl');
    }

    if(Router.current().params.hash === 'undefinedPost'){
        sAlert.error(TAPi18n.__('requestedPostDoesNotExist',Session.get('currentLanguage')));
    }
});

Template.mainPage.helpers({
    Posts: function(){
        return posts.find({},{sort: {date: -1}});
    },
    newPostVisible: function(){
        return Session.get('newPostVisible');
    },
    editPostVisible: function(){
        return Session.get('editPostVisible');
    },
    pageLoaded: function(){
        return Session.get('pageLoaded');
    },
    toTopBottom: function(){
        return Session.get('toTopBottom');
    }
});

Template.mainPage.events({
    'click #return-to-top': function(){
       $('html, body').animate({ scrollTop: 0 },'slow');
    },
    'click .author': function(event){
        Router.go('/profile/' + event.target.text , {query: 'username=' + event.target.text});
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        $('#return-to-top').fadeIn(200);
    } else {
        $('#return-to-top').fadeOut(200);
    }

    if($(document).height()-screen.height <= $(this).scrollTop()){
        Session.set('toTopBottom',80);
    } else {
        Session.set('toTopBottom',20);
    }
});