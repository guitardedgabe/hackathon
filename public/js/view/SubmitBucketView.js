$(function() {
	SubmitBucketView = Backbone.View.extend({
		
		el: $(".dim_submit .dim_container"),

		events: {
			"click #submitBucket": "submitBucket"
		},

		initialize: function() {
            this.$popup = $('.dim_submit');
            $("#submitBucketPhoto").click(function(){$("#submitUserPhotoInput").click()});

			this.text = this.$("#submitTextContainer input");
			this.title = this.$("#submitTitle input");
			this.category = this.$("#bucketCategory input");
			this.picture = this.$("#submitBucketPhoto");

            this.error = this.$('#submitBucketError')

            this.ajaxUploadConfig();

		},

        ajaxUploadConfig: function() {
            // Check to see when a user has selected a file                                                                                                                
            var timerId;
            timerId = setInterval(function() {
            if($('#submitUserPhotoInput').val() !== '') {
                    clearInterval(timerId);
                    $('#submitPhotoUpload').submit();
                }
            }, 500);

            $('#submitPhotoUpload').submit(function(e) {

                $(this).ajaxSubmit({                                                                                                                 

                    error: function(xhr) {
                        console.log('Error: ' + xhr.status);
                    },

                    success: function(response) {
                        //show the photo
                        console.log('success');
                        ballz = response;
                        //$('#imagePreview img').attr('src',response.path);
                        $('#submitBucketPhoto').css('background-image','url('+response.path+')');
                        return false;
                    }
                });

                // Have to stop the form from submitting and causing                                                                                                       
                // a page refresh - don't forget this                                                                                                                      
                return false;
            });
        },

		submitBucket: function() {
            

			bucketOptions = {};
			bucketOptions.text = this.text.val();
			bucketOptions.title = this.title.val();
			bucketOptions.category = this.category.val();
			bucketOptions.pictures = [this.picture.css('background-image').split(/[(]|[)]/)[1]]; //regex to get the url
            

            if ( _.isUndefined(bucketOptions.text) || _.isUndefined(bucketOptions.title) || bucketOptions.pictures[0] == window.location.origin+'/images/upload-photo.jpg'  ) {
                this.error.text('Invalid entry');
                return;
            }


            console.log('bucket options are', bucketOptions);

			this.collection.create(bucketOptions);

            this.hide();

            this.collection.fetch();
    
            
		},

        render: function(attribute) {
            this.$popup.show();
        },

        show: function() {
            this.render();
        },

        hide: function() {
            this.$popup.hide();
        },
	});

    //var buckets =  new BucketList();
    //submitView = new SubmitBucketView({collection:buckets});

});
