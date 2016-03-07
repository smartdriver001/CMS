Meteor.methods({
    addPost: function(postDetails){
        var postCreator = new postManager('addPost',postDetails);
        return postCreator.perform();
    },

    editPost: function(postDetails){
        var postEditor = new postManager('editPost',postDetails);
        return postEditor.perform();
    },

    removePost: function (_id) {
        var postRemover = new postManager('removePost', _id);
        return postRemover.perform();
    },

    postValidate: function(_id){
        var postValidator = new postManager('checkPost', _id);
        return postValidator.perform();
    },

    addComment: function(details){
        if (!Meteor.userId()) {
            throw new Meteor.Error("You-are-offline");
        }

        try {
            comments.insert({
                "postId": details._id,
                "authorId": Meteor.userId(),
                "date": new Date(),
                "message": details.message
            });
        }
        catch(error){
            throw new Meteor.Error(error);
        }

        return true;
    },
    editComment: function(details){
        if (!Meteor.userId()) {
            throw new Meteor.Error("You-are-offline");
        }

        if (!Roles.userIsInRole(Meteor.userId(), ['administrator'])) {
            var comment = comments.findOne({_id:details._id});
            if(Meteor.userId() != comment.authorId){
                throw new Meteor.Error("not-authorized");
            }
        }

        try {
            comments.update(details._id, {
                $set: {message: details.newMessage}
            });
        }
        catch(error){
            throw new Meteor.Error(error);
        }

        return true;
    },
    deleteComment: function(id){
        if (!Meteor.userId()) {
            throw new Meteor.Error("You-are-offline");
        }

        if (!Roles.userIsInRole(Meteor.userId(), ['administrator'])) {
            throw new Meteor.Error("not-authorized");
        }

        try {
            comments.remove({_id:id});
        }
        catch(error){
            throw new Meteor.Error(error);
        }

        return true;
    },

    createAccount: function (userDetails) {
        try {
            Accounts.createUser({
                username: userDetails.username,
                password: userDetails.password,
                email: userDetails.email,
                profile: {
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    avatar: "../usersProfile/new-user-avatar.jpg",
                    postCount: 0
                }
            });
            return true;
        } catch(err){
            throw new Meteor.Error(err.reason);
        }
    },


    getCommentsCounter: function(id){
        return comments.find({postId:id}).count();
    }

});