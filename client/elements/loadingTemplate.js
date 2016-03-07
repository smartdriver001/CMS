Template.loadingTemplate.onRendered(function(){
    Session.set('loading',true);
});

Template.loadingTemplate.helpers({
    screenHeight: function(){
       return window.innerHeight+100;
   }
});