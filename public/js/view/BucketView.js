$(function() {
	BucketView = Backbone.View.extend({
		
		tagName: "li",

		template: _.template($("#item_template").html()),

		events: {
			"click #upVote": "upVote",
			"click #downVote": "downVote"
		},

		initialize: function() {
			// Bind the view to its model
			if (!this.model) {
				this.model = new Bucket();
			}

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
