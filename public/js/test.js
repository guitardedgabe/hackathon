//test function to test api server
$(function(){

    var TestView = Backbone.View.extend({
        initialize: function() {
            this.model.on('test', this.printTestStatus)
        },

        printTestStatus: function(type){
            this.$el.append('<div><span> Type: '+ type  +', </span> ' + '<span> ' + JSON.stringify(this.model) + '</span></div>' );
        }
    });


    Bucketlist =  Backbone.Collection.extend({
        url: '/api/bucket',
        model:Bucket
    });

    //buckets = new Bucketlist();

    //test creation;
    bucket = new Bucket({title: 'test'});

    bucket.trigger('test','save')

    //testView = new TestView({el:$('#testbed'), model: bucket});



    //test updating
    bucket.save({title:'another test'});
    bucket.trigger('test', 'update')

    //test reading
    bucket.fetch();
    bucket.trigger('test','read')

    //test deletion
    bucket.destroy();
    bucket.trigger('test','update');
    
})
