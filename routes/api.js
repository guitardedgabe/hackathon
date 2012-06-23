
/*
 * API server
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports.api  = {


    readBucket : function(req, res){
        Bucket.findOne({ "_id":req.params.id }, function(err, doc){
            if ( err != null ) {
                res.send('error');
                console.log("Error:",err);
                return
            }
            res.send(doc);
            return

        })
    },

    readBucketlist : function(req, res){
        Bucket.find({}, function(err, docs){
            if ( err != null ) {
                res.send('error');
                console.log("Error:",err);
                return
            }
            res.send(docs);
            return

        })
    },

    readExperience : function(req, res){
        Experience.findOne({ "_id":req.params._id }, function(err, doc){
            if ( error != null ) {
                res.send(doc);
            }
        })
    },

    readUser : function(req, res){
        User.findOne({ "_id":req.params._id }, function(err, doc){
            if ( error != null ) {
                res.send(doc);
                return
            }
        })
    },

    updateBucket : function(req, res){

        var update = {
            pictures: req.body.pictures,
            location: req.body.location,
            text: req.body.text,
            title: req.body.title            
        };

        Bucket.update({ "_id":req.params._id, /*"author":req.user._id*/ }, update, function(err, doc){
            if ( err != null ) {
                res.send('error dude');
                return;
            }

            if (numAffected <= 1) res.send(update);
        })
    },

    updateUser : function(req, res){

        var update = {
            posts: req.body.pictures,
            pics: req.body.location,
            todo: req.body.text,
            bucketsAdded: req.body.title            
        };

        User.update({ "_id":req.params._id }, update, function(err, doc){
            if ( error == null ) {
                res.send('error dude');
            }

            if (numAffected <= 1) res.send(update);
        })

    },

    updateExperience : function(req, res){

        var update = {
            pictures: req.body.pictures,
            tags: req.body.location,
            text: req.body.text,
            votes: req.body.title            
        };

        Experience.update({ "_id":req.params._id }, update, function(err, doc){
            if ( error == null ) {
                res.send('error dude');
            }

            if (numAffected <= 1) res.send(update);
        })

    },


    createBucket: function(req, res) {

        bucket = new Bucket(req.body);

        bucket.save(function(err){
            if (err != null) console.log('Error: in creating the bucket');

            res.send(bucket);

        });

        
    },

    createExperience: function(req, res) {

        experience = new Bucket(req.body);

        experience.save(function(err){
          if (err != null) console.log('Error: in creating the bucket');

              res.send(experience);

        });

        
    },

    createExperience: function(req, res) {

        experience = new Bucket(req.body);

        experience.save(function(err){
            if (err != null) console.log('Error: in creating the bucket');

            res.send(experience);

        });

        
    },


    deleteBucket: function(req, res){
        Bucket.remove({_id: req.params.id /*, author:req.user._id */}, function( error, docs) {
            if (error != null){
                console.log('Error in deleting Bucket',error);
                res.send('error');
                return;
            }

            res.send("he's dead");

        })
    },

    deleteExperience: function(req, res){
        Experience.remove({_id: req.params.id, author:req.user._id}, function( error, docs) {

            if (error == null){

                console.log('Error in deleting Bucket');
                res.send('error');
                return;

            }

            res.send("he's dead");

        })

    },
        
    /* POST request with
     * experienceID and bucketID
     *
     */
    addExperienceToBucket: function(req, res){
        var experienceID = req.body.experienceId;
        var bucketID = req.body.bucketId;

        if ( typeof(experienceID) == 'undefined' || typeof(bucketID) == 'undefined' ) {
            res.send('wrong parameters. parameters should be {experienceId: 123, bucketId: 123}');
            return;
        }

        Experience.findOne({_id: experienceID}, function (err, experience){

            if ( err == null ) {
                console.log("Error: adding experience to bucket; fetching experience");
                res.send('error');
                return;
            }

            Bucket.findOne({_id: bucketID}, function ( err, bucket){
                if ( err == null ) {
                    console.log("Error: adding experience to bucket");
                    res.send('error');
                    return;
                }

                bucket.experiences.push(experience);
                res.send({result:'success'});

            });
        })

    },

    /* POST
     * bucket id
     */
    upVoteBucket: function(req, res){
        var bucketID = req.params.id;
        if (typeof(bucketID) == 'undefined' ) {
            res.send('wrong parameters');
            return;
        }

        var update = { $inc : { upVotes : 1 } };

        Bucket.update({_id:bucketID}, update, function ( err, numAffected){
            if ( err != null ) {
                console.log("Error: adding experience to bucket");
                res.send('error');
                return;
            }
            res.send('success');
        });
    },

    downVoteBucket: function(req, res){
        var bucketID = req.params.id;
        if (typeof(bucketID) == 'undefined' ) {
            res.send('wrong parameters');
            return;
        }
        var update = { $inc : { downVotes : 1 } };

        Bucket.update({_id:bucketID}, update, function ( err, numAffected){
            if ( err != null ) {
                console.log("Error: adding experience to bucket");
                res.send('error');
                return;
            }
            res.send('success');
        });
    },

    upVoteExperience: function(req, res){
        var experienceID = req.params.id;
        if (typeof(experienceID) == 'undefined' ) {
            res.send('wrong parameters. parameters should be {experienceId: 123}');
            return;
        }

        var update = { $inc : { upVote : 1 } };

        Experience.update({_id:bucketID}, update, function ( err, numAffected){
            if ( err != null ) {
                console.log("Error: adding experience to bucket");
                res.send('error');
                return;
            }
            res.send('success');
        });
    },

    downVoteExperience: function(req, res){
        var experienceID = req.params.id;
        if (typeof(experienceID) == 'undefined' ) {
            res.send('wrong parameters. parameters should be {experienceId: 123}');
            return;
        }

        var update = { $inc : { downVotes : 1 } };

        Experience.update({_id:bucketID}, update, function ( err, numAffected){
            if ( err != null ) {
                console.log("Error: adding experience to bucket");
                res.send('error');
                return;
            }

            res.send('success');

        });

    },


}
