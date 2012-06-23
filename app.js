
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , _u = require('./public/lib/underscore.js')
  , MongoStore = require('connect-mongo')(express)
  , util = require('util');
 
 var mongoose = require('mongoose'),
     mongooseAuth = require('mongoose-auth'),
     conf = require('./conf'),
     Schema = mongoose.Schema;
 

var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/tampa');

var UserSchema = new Schema({
	post: [ExperienceSchema],
	points: Number,
	pic: String,
	todo: [BucketSchema],
	bucketsAdded: [BucketSchema]
}),

UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }   
      }   
    },  
    twitter :{
        everyauth: {
            myHostname: 'http://tampa.lest.us'
          , consumerKey: conf.twit.consumerKey
          , consumerSecret: conf.twit.consumerSecret
          , redirectPath: '/' 
        }   
    }   
});

User = mongoose.model('User',UserSchema);


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
    app.use(express.session({
      "secret":"thisissupersecretlol",
      "store": new MongoStore({
          db:'tampa'
      })  
  }));

  app.use(express.bodyParser());

  app.use( mongooseAuth.middleware() );
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);


/* API SHiT yo
 *
 *
 */


//buckets
app.get('/api/bucket/:id', routes.read(bucket));

app.post('/api/bucket', routes.create(bucket));

app.put('/api/bucket/:id', routes.update(bucket));

app.delete('/api/bucket/:id', routes.delete(bucket));

/* upvote and downvote bucket
 */

app.post('/api/bucket/upvote/:id', routes.bucketUpvote)
app.post('/api/bucket/downvote/:id', routes.bucketDownvote)


//experiences
app.get('/api/xp/:id', routes.read(xp));

app.post('/api/xp', routes.create(xp));

app.put('/api/xp/:id', routes.update(xp));

app.delete('/api/xp/:id', routes.delete(xp));

/* upvote and downvote experiences
 */

app.post('/api/xp/upvote/:id', routes.xpUpvote);
app.post('/api/xp/downvote/:id', routes.xpDownvote);



//user api functions
app.get('/api/user/:id', routes.read(user));

app.post('/api/user', routes.create(user));

app.put('/api/user/:id', routes.update(user));

app.delete('/api/user/:id', routes.delete(user));


/************ Models ************/
// Buckets
var BucketSchema = new Schema({
	author: ObjectId,
	category: String
	location: String,
	pictures: [String],
	experiences: [ExperienceSchema],
	text: String,
	title: String,
	upVotes: Number,
	downVotes: Number
});

Bucket = mongoose.model('Bucket', BucketSchema);

// Experience
var ExperienceSchema = new Schema ({
	author: ObjectId,
	date: Date,
	pictures: [String],
	tags: [UserSchema],
	text: String,
	upVote: Number,
	downVote: Number
});

Experience = mongoose.model('Experience', ExperienceSchema);

mongooseAuth.helpExpress(app);


app.listen(4000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
