//test function to test api server
$(function(){

    var TestView = Backbone.View.extend({
        initialize: function() {
            this.model.on('test', printTestStatus)
        },

        printTestStatus(type){
            this.$el.append('<div><span> Type: '+ type ', </span> ' + '<span> ' + JSON.stringify(model) + '</span></div>' );
        }

    });

    testView = new TestView({el:$('#testbed')});


    //test creation;
    bucket.create({title:'test'});
    bucket.save();
    bucket.trigger('test','save')

    //test reading
    bucket.read();
    bucket.trigger('test','read')

    //test updating
    bucket.save({title:'another test'});
    bucket.trigger('test', 'update')

    //test deletion
    bucket.destroy();
    bucket.trigger('test','update');
    
})
