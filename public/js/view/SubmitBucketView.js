$(function() {
	SubmitBucketView = Backbone.View.extend({
		
		el: $("#createBucket"),

		events: {
			"click #submitBucket": "submitBucket"
		},

		initialize: function() {
			this.text = this.$("#bucketText");
			this.title = this.$("#bucketTitle");
			this.category = this.$("#bucketCategory");
		},

		submitBucket: function() {
			var bucketOptions = new Bucket();
			bucketOptions.text = this.text.val();
			bucketOptions.title = this.title.val();
			bucketOptions.category = this.category.val();
			//bucketOptions = selected picture
			//bucketOptions.author = user.get("name");
			bucketOptions.author = "Gabriel Busto";
			var bucket = new Bucket(bucketOptions);
			buckets.addOne(bucket);
		}

	});
});
