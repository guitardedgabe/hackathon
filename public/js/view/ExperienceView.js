var ExperienceView = Backbone.View.extend({
	
	// el: $("#mainappview"), // To be set when instantiated

	events: {
		"click #addPicture": "addPicture",
		"click #removePicture": "removePicture"
	},

	initialize: function() {
		// Binding this to its model to render any changes made
		this.model.bind("change", this.render, this);
		
		// Listening to the model for any items added
		this.model.bind("add", this.addTag, this);
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	addTag: function(tag) {
		this.model.addTag(tag);
	},

	removeTag: function(tag) {
		this.model.removeTag(tag);
	}
});
