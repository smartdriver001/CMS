Meteor.publish('posts',function(filter){
    if(filter){
        return posts.find({category:filter});
    } else {
        return posts.find();
    }
});

Meteor.publish('singlePost', function(id){
    return posts.find({_id:id});
});

Meteor.publish('singlePostComments', function(id){
    return comments.find({postId:id});
});

Meteor.publish('userBasic', function(){
    return Meteor.users.find({},{fields: {'_id': 1, 'username': 1, 'profile.avatar':1, 'profile.postCounter':1}});
});

Meteor.publish('userData', function(username){
    return Meteor.users.find({username:username});
});

Meteor.publish('userPosts', (username) => {
    const user = Meteor.users.findOne({ username });
    if (user && user._id) {
        return posts.find({ author: user._id }, { sort: { date: -1 }});
    }

    return [];
});