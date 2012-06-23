var UserView = Backbone.View.extend({
	
	//el: $("#mainappview"), // Not sure if this should be added when it's instantiated

	events: {
		"click .removeTodo": "removeTodo"
	},

	initialize: function() {
		// Binding this view to its model to render on model change
		this.model.bind("change", this.render, this);
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	removeTodo: function(todo) {
		this.model.removeTodo(todo);
	}
});
