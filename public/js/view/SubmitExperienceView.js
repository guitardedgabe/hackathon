$(function() {
    SubmitExperienceView = Backbone.View.extend ({
    
		el: $("#createBucket"),

		events: {
			"click #submitBucket": "submitExperience"
		},

		initialize: function() {
			this.text = this.$("#bucketText");
			this.title = this.$("#bucketTitle");
		},

		submitExperience: function() {
			var expOptions= new Experience();
			expOptions.text = this.text.val();
			expOptions.title = this.title.val();
			//expOptions = selected picture
			//expOptions.author = user.get("name");
			expOptions.author = "Gabriel Busto";
			var experience = new Experience(expOptions);
            console.log(experience);
        }
    });    
});
