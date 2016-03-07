posts = new Mongo.Collection("posts");
comments = new Mongo.Collection("comments");

Schema = {};
SimpleSchema.messages({
    required: "Field \"[label]\" is required!",
    regEx: [
        {exp: SimpleSchema.RegEx.Url, msg: "\"[label]\" have to be a correct url address!"}
    ]
});

postSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function(){
            if (this.isInsert && (!this.isSet || this.value.length === 0)) {
                return Meteor.userId()
            }
        },
        autoform: {
            type: "hidden"
        }
    },
    date: {
        type: Date,
        label: "Date",
        autoValue: function(){
            if (this.isInsert && (!this.isSet || this.value.length === 0)) {
                return new Date();
            }
        },
        autoform: {
            type: "hidden"
        }
    },
    image: {
        type: String,
        label: "Banner url address",
        autoform: {
            type: "url"
        }
    },
    category: {
        type: String,
        label: "Category",
        autoform: {
            type: "select",
            firstOption: 'Select one category',
            options: function(){
                return [
                    {label: "None", value: '/'},
                    {label: "Technologies", value: 'technologies'},
                    {label: "Guides", value: 'guides'}
                ];
            }
        }
    },
    content: {
        type: String,
        label: "Content"
    }
});

posts.attachSchema(postSchema);