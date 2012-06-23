$(function() {
    
    var User = Backbone.Model.extend({
        
        defaults: {
            post: [],
            points: 0,
            pic: '', /*TODO: add string to empty profile picture resource*/
            todo: [],
            bucketsAdded: []
        },

        initialize: function() {
            
        }
    });
});
