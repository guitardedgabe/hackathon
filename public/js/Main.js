$(function() {

    Experience = Backbone.Model.extend({

        idAttribute: "_id",
        
        defaults: function() {
			return {
				date: new Date(),
				upVote: 0,
				downVote: 0
			};
        },

        initialize: function() {
            if (!this.get('date')) {
                this.save({ 'date': this.defaults.date });
            }
        },

        addPicture: function(picture) {
            var pictures = this.get('pictures');
            pictures.push(picture);
            this.save({ 'pictures': pictures });
        },
        
        removePicture: function(picture) {
            var pictures = this.get('pictures');
            var updatedPictures = [];

            for (var i=0; i<pictures.length; i++) {
                if (pictures[i] != picture) {
                    updatedPictures.push(pictures[i]);
                }
            }
            this.save({ 'pictures': updatedPictures });
        },
        
        addTag: function(tag) {
            var tags = this.get('tags');
            tags.push(tag);
            this.save({ 'tags': tags });
        },
        
        removeTag: function(tag) {
            var tags = this.get('tags');
            var updatedTags = [];

            for (var i=0; i<tags.length; i++) {
                if (tags[i] != tag) {
                    updatedTags.push(tags[i]);
                }
            }
            this.save({ 'tags': updatedTags });
        },

        upVote: function() {
            //this.save({ 'upVotes': this.upVotes + 1});
            var model = this.model;
            $.get('/api/experience/upvote/'+this.id, function(data){
                console.log('upvoted post the data returned was',data);
                model.fetch();
            });

        },

        downVote: function() {
            var model = this.model;
            $.get('/api/experience/downvote/'+this.id, function(data){
                console.log('downvoted post the data returned was',data);
                model.fetch();
            });
        }
    });
    
    Bucket = Backbone.Model.extend({
        url: function(){
            if ( this.id ) return "/api/bucket/"+this.id;
            return "/api/bucket";
        },

        idAttribute: "_id",
        
        defaults: function() {
			return {
				upVotes: 0,
				downVotes: 0
        	};
		},

        addPicture: function(picture) {
            var pictures = this.get('pictures');
            pictures.push(picture);
            this.save({ 'pictures': pictures });
        },

        removePicture: function(picture) {
            var pictures = this.get('pictures');
            var updatedPictures = [];

            for (var i=0; i<pictures.length; i++) {
                if (pictures[i] != picture) {
                    updatedPictures.push(pictures[i]);
                }
            }
            this.save({ 'pictures': updatedPictures });
        },

        addExperience: function(experience) {
            var experiences = this.get('experiences');
            experiences.push(experience);
            this.save({ 'experiences': experiences });
        },

        removeExperience: function(experience) {
            var experiences = this.get('experiences');
            updateExperiences = [];

            for (var i=0; i<experiences.length; i++) {
                if (experiences[i] != experience) {
                    updatedExperiences.push(experiences[i]);
                }
            }

            this.save({ 'experiences': updatedExperiences});
        },

        upVote: function() {
            //this.save({ 'upVotes': this.upVotes + 1});
            var model = this;
            $.get('/api/bucket/upvote/'+this.id, function(data){
                model.fetch();
            });

        },

        downVote: function() {
            //this.save({ 'downVotes': this.downVotes + 1});
            var model = this;
            $.get('/api/bucket/downvote/'+this.id, function(data){
                console.log('downvoted post the data returned was',data);
                model.fetch();
            });
        }

    });
   
    User = Backbone.Model.extend({
        
        defaults: function() {
			return {
				points: 0,
				pic: '' /*TODO: add string to empty profile picture resource*/
        	};
		},
        idAttribute: "_id",

        initialize: function() {
            if (!this.get('pic')) {
                this.save({ 'pic': this.defaults.pic });
            }

            if (!this.get('points')) {
                this.save({ 'points': this.defaults.points });
            }
        },
        
        addPoints: function(points) {
            this.save({ 'points': this.points + points });
        },

        addBucket: function(newBucket) {
            var buckets = this.buckets_added;
            buckets.push(newBucket);
            this.save({ 'buckets_added': buckets });
        },

        removeBucket: function(removedBucket) {
            var buckets = this.get('buckets');
            var updatedBuckets = [];
            for (var i=0; i<buckets.length; i++) {
                if (buckets[i] != removedBucket) {
                    updatedBuckets.push(todos[i]);
                }
            }
            this.save({ 'buckets': updatedBuckets });
        },

        addTodo: function(newTodo) {
            var todos = this.get('todos');
            todos.push(newTodo);
            this.save({ 'todos': todos });
        },

        removeTodo: function(removedTodo) {
            var todos = this.get('todos');
            var updatedTodos = [];
            for (var i=0; i<todos.length; i++) {
                if (todos[i] != removedTodo) {
                    updatedTodos.push(todos[i]);
                }
            }
            this.save({ 'todos': modifiedTodos });
        },

        addPost: function(newPost) {
            var posts = this.get('posts');
            posts.push(newPost);
            this.save({ 'posts': posts });
        },

        removePost: function(removedPost) {
            var posts = this.get('posts');
            var modifiedPosts = [];
            for (var i=0; i<posts.length; i++) {
                if (posts[i] != removedPost) {
                    modifiedPosts.push(posts[i]);
                }
            }
            this.save({ 'posts': modifiedPosts });
        }
    });


    /* 
     *
     * Collections 
     *
     */


    BucketList =  Backbone.Collection.extend({
        url: '/api/bucket',

        comparator: function(bucket){
            return -( bucket.get('upVotes') - bucket.get('downVotes') );
        },

        model:Bucket
    });
    
    ExperienceCollection =  Backbone.Collection.extend({
        url: '/api/bucket',
        model:Experience
    });


});
