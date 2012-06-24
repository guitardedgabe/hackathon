$(function() {
	MainPage = Backbone.View.extend({
        el: $('body'),

        events: {
            "click #signin":"openSignInPopup",
            "click #submit":"openSubmitPopup",
        },

        initialize: function(){
            this.user = new User();
            ballz = this.user;

            this.submitBucketView = new SubmitBucketView({collection:this.collection});

            this.user.on('change',this.changeUserStatus, this);
        },

        changeUserStatus: function() {

            if (this.user.id){
                $('#userStatus').html('');
                $('#userStatus').text('Welcome, ' + this.user.get('twit').name);
            }
            
        },

        openSignInPopup: function() {
            console.log('lolol');
            $('.dim').show()
            $('.dim_background').show()
        },

        openSubmitPopup: function() {
            this.submitBucketView.render();
        },
    });

    mainPage  = new MainPage({collection: buckets});
});
