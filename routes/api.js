
/*
 * API server
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports = {

    bucketRead


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

