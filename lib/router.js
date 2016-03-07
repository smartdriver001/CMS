Router.configure({
    loadingTemplate: 'loadingTemplate'
});

Router.map(function () {
    this.route('main', {
        path: '/',
        template: 'mainPage',
        onBeforeAction : function(){
            this.next();
        },
        action : function () {
            if (this.ready()) {
                this.render();
            }
        },
        waitOn : function () {
            return [
                Meteor.subscribe('posts'),
                Meteor.subscribe('userBasic')
            ]
        },
        fastRender: true
    });

    this.route('technologies', {
        path: '/technologies',
        template: 'mainPage',
        onBeforeAction : function(){
            this.next();
        },
        action : function () {
            if (this.ready()) {
                this.render();
            }
        },
        waitOn : function () {
            return [
                Meteor.subscribe('posts', 'technologies'),
                Meteor.subscribe('userBasic')
            ]
        },
        fastRender: true
    });

    this.route('guides', {
        path: '/guides',
        template: 'mainPage',
        action : function () {
            if (this.ready()) {
                this.render();
            }
        },
        waitOn : function () {
            return [
                Meteor.subscribe('posts', 'guides'),
                Meteor.subscribe('userBasic')
            ]
        },
        fastRender: true
    });

    this.route('contact', {
        path: '/contact',
        template: 'contactPage',
        fastRender: true,
        action : function () {
            if (this.ready()) {
                this.render();
            }
        }
    });

    this.route('register', {
        path: '/register',
        template: 'registerPage',
        action : function () {
            if (this.ready()) {
                this.render();
            }
        },
        fastRender: true
    });

    this.route('adminPanel', {
        path: '/adminPanel',
        template: 'adminPanel',
        action : function () {
            if (this.ready()) {
                this.render();
            }
        },
        fastRender: true
    });

    this.route('/post/:_id', {
        template: 'singlePostView',
        action : function () {
            if (this.ready()) {
                this.render();
            }
        },
        waitOn : function () {
            return [
                Meteor.subscribe('singlePost', Router.current().params._id),
                Meteor.subscribe('singlePostComments', Router.current().params._id),
                Meteor.subscribe('userBasic')
            ]
        },
        data: function () {
            var id = Router.current().params._id;
            return posts.findOne({_id: id});
        }
    });

    this.route('/profile/:username', {
        template: 'profile',
        action : function () {
            if (this.ready()) {
                this.render();
            }
        },
        waitOn : function () {
            return [
                Meteor.subscribe('userData',Router.current().params.username)
            ]
        },
        data: function () {
            var username = Router.current().params.username;
            return Meteor.users.findOne({username:username});
        }
    });
});

