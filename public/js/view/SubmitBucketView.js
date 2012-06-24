$(function() {
	SubmitBucketView = Backbone.View.extend({
		
		el: $("#createBucket"),

		events: {
			"click #submitBucket": "submitBucket"
		},

		initialize: function() {
            //load user model from the given options
            this.user = this.options.user;

			this.text = this.$("#bucketText");
			this.title = this.$("#bucketTitle");
			this.category = this.$("#bucketCategory");
			this.picture = this.$("#photoUpload");
		},

		submitBucket: function() {
			var bucketOptions = new Bucket();
			bucketOptions.text = this.text.val();
			bucketOptions.title = this.title.val();
			bucketOptions.category = this.category.val();
			bucketOptions.pictures = [this.picture.attr('src')];

			//bucketOptions = selected picture
			//bucketOptions.author = user.get("name");
            
			bucketOptions.author = this.user.id;

			this.collection.create(bucketOptions);
            
		}

	});

});
