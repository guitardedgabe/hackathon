$(function() {
	BucketListView = Backbone.View.extend({
		
		el: $("#body"),

		initialize: function() {
			
		},

		render: function() {
			
		},

		addOne: function() {
			var view = new BucketView({model: (new Bucket())});
			$("#bucketList").append(view.render().el);
		}
	});
});
