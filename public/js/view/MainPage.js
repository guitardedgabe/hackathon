$(function() {
	MainPage = Backbone.View.extend({
        el: $('body'),

        events: {
            "click #signin":"openSignInPopup",
        },

        initialize: function(){
            this.user = new User();
            ballz = this.user;

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
    });

    mainPage  = new MainPage();
});
