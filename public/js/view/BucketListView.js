$(function() {
	BucketListView = Backbone.View.extend({
		
		el: $("#body"),

        events: {
            //'change #top_nav_search input':'bucketSearch',
        },

		initialize: function() {
			
            this.collection.on('add',this.addOne, this)
            this.collection.on('reset',this.addAll, this)
            
            this.$container = $("#body_container");

            this.collection.sort();

            var that = this;
            this.collection.fetch({
                success: function(collection){
                    that.originalModels = collection.models;
                }
            });

            this.search = $('#top_nav_search input');

            $('#top_nav_search input').change(_.bind(this.bucketSearch, this) );


		},

		render: function() {
			
		},

        bucketSearch: function(event) {
            var searchVar = event.target.value;
            console.log('searching for', searchVar)
            this.collection.reset(this.originalModels, {silent:true} );


            var filtered =  this.collection.filter(function(model){
                return (model.get('title').toLowerCase().indexOf(searchVar.toLowerCase()) !== -1 );
            })
            ballz = this;
            console.log('filtered is',filtered);
            this.collection.reset(filtered);
        },

		addOne: function(model) {
			var view = new BucketView({model: model});
			this.$container.append(view.render().el);

		},

        addAll: function() {
            console.log('adding all');
            this.$container.html('')
            this.collection.each(this.addOne, this);
        },


	});


});
