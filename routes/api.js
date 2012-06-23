
/*
 * API server
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports = {


    read : function(type){

        var mongoItem;

        switch(type) {
            case 'bucket':
                mongoItem = Bucket;
                break;
            case 'xp':
                mongoItem = Xp;
                break;
            case 'user':
                mongoItem = User;
                break;
                
            default:
                console.log('Error: there was an error with the api call')

        }

        return function(req, res){
            mongoItem.findOne({ "_id":req.params._id }, function(err, doc){
            })

        }


    },

    readBucket : function(req, res){
        Bucket.findOne({ "_id":req.params._id }, function(err, doc){
            if ( error != null ) {
                res.send(doc);
            }
        })
    },

    readXp : function(req, res){
        Xp.findOne({ "_id":req.params._id }, function(err, doc){
            if ( error != null ) {
                res.send(doc);
            }
        })
    },

    readUser : function(req, res){
        User.findOne({ "_id":req.params._id }, function(err, doc){
            if ( error != null ) {
                res.send(doc);
            }
        })
    },

    updateBucket : function(req, res){

        var update = {
            pictures: req.body.pictures,
            location: req.body.location,
            text: req.body.text,
            
        }

        Bucket.findOne({ "_id":req.params._id, "author":req.user._id }, function(err, doc){
            if ( error != null ) {
                res.send(doc);
            }
        })
    },





}

//buckets
app.get('/api/bucket/:id', routes.bucketRead);

app.post('/api/bucket', routes.bucketCreate);

app.put('/api/bucket/:id', routes.bucketCreate);

app.delete('/api/bucket/:id', routes.bucketCreate);

/* upvote and downvote bucket
 */

app.post('/api/bucket/upvote/:id', routes.bucketUpvote)
app.post('/api/bucket/downvote/:id', routes.bucketDownvote)


//experiences
app.get('/api/xp/:id', routes.xpRead);

app.post('/api/xp', routes.xpCreate);

app.put('/api/xp/:id', routes.xpCreate);

app.delete('/api/xp/:id', routes.xpCreate);

/* upvote and downvote experiences
 */

app.post('/api/xp/upvote/:id', routes.xpUpvote);
app.post('/api/xp/downvote/:id', routes.xpDownvote);



//user api functions
app.get('/api/user/:id', routes.userRead);

app.post('/api/user', routes.userCreate);

app.put('/api/user/:id', routes.userCreate);

app.delete('/api/user/:id', routes.userCreate);

