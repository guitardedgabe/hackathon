$(function() {
	SubmitBucketView = Backbone.View.extend({
		
		el: $("#createBucket"),

		events: {
			"click #submitBucket": "submitBucket"
		},

		initialize: function() {
            //load user model from the given options
            this.user = this.options.user;

			this.text = this.$("#bucketText input");
			this.title = this.$("#bucketTitle input");
			this.category = this.$("#bucketCategory input");
			this.picture = this.$("#imagePreview img");
		},

		submitBucket: function() {

			bucketOptions = {};
			bucketOptions.text = this.text.val();
			bucketOptions.title = this.title.val();
			bucketOptions.category = this.category.val();
			bucketOptions.pictures = [this.picture.attr('src')];

            console.log('bucket options are', bucketOptions);

			this.collection.create(bucketOptions);
            
		}

	});

    var buckets =  new BucketList();
    submitView = new SubmitBucketView({collection:buckets});

});
