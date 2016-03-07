postManager = class postManager {
    constructor(operationType, operationDetails) {
        _.extend(this, {
            operationType: operationType,
            operationDetails: operationDetails
        })
    }


    perform(){
        switch(this.operationType){
            case 'addPost':
                return this.addPost();
                break;
            case 'editPost':
                return this.editPost();
                break;
            case 'removePost':
                return this.removePost();
                break;
            case 'checkPost':
                return this.checkPost();
                break;
            default:
                throw new Meteor.Error("Invalid-Command");
                break;
        }
    }

    addPost(){
        let authentication = new userAuth('addPost');
        if (!authentication.perform()) {
            throw new Meteor.Error("Authentication-Error");
        }

        try {
            let authorId = Meteor.userId();

            posts.insert({
                title:this.operationDetails.title,
                image:this.operationDetails.image,
                category:this.operationDetails.category,
                content:this.operationDetails.content
            });

            Meteor.users.update(authorId, {$inc:{"profile.postCount":1}});

        }catch(error){
            throw new Meteor.Error("Post-Insert-Fail");
        }

        return true;
    }

    editPost(){
        let authentication = new userAuth('editPost',this.operationDetails._id);
        if (!authentication.perform()) {
            throw new Meteor.Error("Authentication-Error");
        }

        try {
            posts.update(this.operationDetails._id, {$set: {
                content:this.operationDetails.content,
                title: this.operationDetails.title,
                image: this.operationDetails.image
            }});
        }catch(error){
            throw new Meteor.Error("Post-Update-Fail");
        }

        return true;
    }

    removePost(){
        let authentication = new userAuth('removePost');
        if (!authentication.perform()) {
            throw new Meteor.Error("Authentication-Error");
        }

        try {
            let id = this.operationDetails;
            let post = posts.findOne({_id:id});

            Meteor.users.update(post.author, {$inc: {"profile.postCount":-1}});
            posts.remove(id);
        }catch(error){
            throw new Meteor.Error("Post-Remove-Fail");
        }

        return true;
    }

    checkPost(){
        let id = this.operationDetails;
        var post = posts.findOne({_id:id});

        if(post) {
            return true;
        } else {
            throw new Meteor.Error("Post-Not-Found");
        }
    }
};