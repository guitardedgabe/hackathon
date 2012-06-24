$(function() {
	SubmitBucketView = Backbone.View.extend({
		
		el: $("#createBucket"),

		events: {
			"click #submitBucket": "submitBucket"
		},

		initialize: function() {

			this.text = this.$("#bucketTextInput");
			this.title = this.$("#bucketTitle input");
			this.category = this.$("#bucketCategory input");
			this.picture = this.$("#bucketPhoto");
		},

		submitBucket: function() {

			bucketOptions = {};
			bucketOptions.text = this.text.val();
			bucketOptions.title = this.title.val();
			bucketOptions.category = this.category.val();
			bucketOptions.pictures = [this.picture.css('background-image').split(/[(]|[)]/)[1]]; //regex to get the url

            console.log('bucket options are', bucketOptions);

			this.collection.create(bucketOptions);
            
		}

	});

    var buckets =  new BucketList();
    submitView = new SubmitBucketView({collection:buckets});

});
