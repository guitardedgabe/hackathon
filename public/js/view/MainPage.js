$(function() {
	MainPage = Backbone.View.extend({
        el: $('body'),

        events: {
            "click #signin":"openSignInPopup"
        },

        openSignInPopup: function() {
            console.log('lolol');
            $('.dim').show()
            $('.dim_background').show()
        },
    });

    mainPage  = new MainPage();
});
