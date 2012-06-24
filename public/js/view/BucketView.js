$(function() {
	BucketView = Backbone.View.extend({
		
		template: _.template($("#bucketView-template").html()),

		events: {
			"click .upVote": "upVote",
			"click .downVote": "downVote"
		},

		initialize: function() {
			this.model.bind("change", this.render, this);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

            this.$votes = this.$el.find('.bucket_votes_score');

            this.userVote = 0;

			return this;
		},

		upVote: function() {
            if (this.userVote == 1) return;

            var votes = parseInt(this.$votes.text()) - this.userVote;

            this.$votes.text(++votes);

            this.userVote = 1;

			this.model.upVote();
		},

		downVote: function() {
            if (this.userVote == -1) return;


            var votes = parseInt(this.$votes.text()) - this.userVote;

            this.$votes.text(--votes);

            this.userVote = -1;

			this.model.downVote();
		}
	});
});
