$(function() {

    var Todo = Backbone.Model.extend({
        
    });

    var Bucket = Backbone.Model.extend({
        defaults: {
            upVote: 0,
            downVote: 0
        }
    });

    var Post = Backbone.Model.extend({
    
    });
    
    var User = Backbone.Model.extend({
        
        defaults: {
            points: 0, /*Integer*/
            pic: '' /*TODO: add string to empty profile picture resource*/ /*string*/
        },

        initialize: function() {
            if (!this.get('pic')) {
                this.set({ 'pic': this.defaults.pic });
            }

            if (!this.get('points')) {
                this.set({ 'points': this.defaults.points });
            }
        },

        updatePicture: function(pictureLink) {
            this.save({ 'pic': pictureLink });
        },

        updateScore: function(points) {
            this.save({ 'points': this.points + points });
        },

        addBucket: function(newBucket) {
            var buckets = this.buckets_added;
            buckets.push(newBucket);
            this.set({ 'buckets_added': buckets });
        },

        removeBucket: function(removedBucket) {
            var buckets = this.get('buckets');
            var updatedBuckets = [];
            for (var i=0; i<buckets.length; i++) {
                if (buckets[i] != removedBucket) {
                    updatedTodos.push(todos[i]);
                }
            }
        },

        addTodo: function(newTodo) {
            var todos = this.get('todos');
            todos.push(newTodo);
            this.set({ 'todos': todos });
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
            this.set({ 'posts': posts });
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
});
