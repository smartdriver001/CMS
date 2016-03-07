userAuth = class userAuth {
    constructor(authTarget, postId) {
        this.authTarget = authTarget;
        this.allValid = null;
        this.options = [];
        this.postId = postId;
    }

    perform(){
        if(!this.loadConfig()) return false;

        var passedTest = 0;
        var passed = false;

        this.options.forEach(entry =>{
            if(this.check(entry)){
                if(!this.allValid) {
                    passed = true;
                    return false;
                }
                passedTest++;
            } else {
                if(this.allValid) return false;
            }
        });
        if(passed) return true;
        return (passedTest == this.options.length);
    }

    loadConfig() {
        let config = JSON.parse(Assets.getText('authenticationConfig.json'));
        switch (this.authTarget) {
            case 'addPost':
                var selectedPart = config.post.addPost;
                break;
            case 'editPost':
                var selectedPart = config.post.editPost;
                break;
            case 'removePost':
                var selectedPart = config.post.removePost;
                break;
            default:
                return false;
                break;
        }
        this.allValid = selectedPart.allValid;

        selectedPart.options.forEach(entry =>{
            this.options.push(entry);
        });
        return true;
    }

    check(entry){
        switch(entry.type){
            case 'online':
                return Meteor.userId();
            break;
            case 'role':
                return (Roles.userIsInRole(Meteor.userId(), [entry.value]));
            break;
            case 'author':
                var post = posts.findOne({_id:this.postId});
                return Meteor.userId() == post.author;
            break;
            default:
                return false;
            break;
        }
    }
};