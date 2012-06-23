$(function() {
	BucketView = Backbone.View.extend({
		
		tagName: "li",

		template: _.template($("#bucketView-template").html()),

		events: {
			"click #upVote": "upVote",
			"click #downVote": "downVote"
		},

		initialize: function() {

			this.model.bind("change", this.render, this);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		upVote: function() {
			this.model.upVote();
		},

		downVote: function() {
			this.model.downVote();
		}
	});

    
});
