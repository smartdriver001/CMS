Template.header.events({
   'click .header-button-selected,.header-button': function(event){
       if(event.target.value === '/') {
           window.scrollTo(0,0);
           Router.go('main');
       } else {
           window.scrollTo(0,0);
           Router.go(event.target.value);
       }
   },
    'click #polish-lang': function(){
        Session.set('currentLanguage','pl');
        TAPi18n.setLanguage('pl');
    },
    'click #english-lang': function(){
        Session.set('currentLanguage','en');
        TAPi18n.setLanguage('en');
    }
});

Template.header.helpers({
    headerButtonClass: function(value){
        if(Router.current().route.path() === value) {
            return "header-button-selected";
        } else {
            return "";
        }
    },
    headerClass: function(){
        return Session.get('headerClass');
    },
    loadingTop: function(){
        return Session.get('loadingTop');
    },
    loading: function(){
        return Session.get('loading');
    }
});

function navSlide() {
    var scroll_top = $(window).scrollTop();
    if(scroll_top > 0) {
        var resizeAmount = scroll_top/5;
        if((100 - resizeAmount) > 50) {
            Session.set('headerClass',(100 - resizeAmount));
            Session.set('loadingTop',((100 - resizeAmount - 40)/2));
        } else {
            Session.set('headerClass',50);
            Session.set('loadingTop',5);
        }
    } else {
        Session.set('headerClass',100);
        Session.set('loadingTop',30);
    }
}

$(window).scroll(navSlide);