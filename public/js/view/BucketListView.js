$(function() {
	BucketListView = Backbone.View.extend({
		
		el: $("#body"),


		initialize: function() {
			
            this.collection.on('add',this.addOne, this)
            this.collection.on('reset',this.addAll, this)


            this.collection.sort();

            this.collection.fetch();
		},

		render: function() {
			
		},

		addOne: function(model) {
			var view = new BucketView({model: model});
			$("#body_container").append(view.render().el);
		},

        addAll: function() {
            console.log('adding all');
            this.collection.each(this.addOne);
        },


	});

    buckets =  new BucketList();

    a = new BucketListView({collection:buckets});



   // buckets.create({'title':'woot'});

});
