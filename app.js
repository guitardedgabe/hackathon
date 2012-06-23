
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
});

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
app.get('/tests', function(req, res){
  res.render('tests')
});



app.post('/api/photos', function(req, res) {

  var serverPath = '/images/' + req.files.userPhoto.name;

console.log(req.files.userPhoto.name);
  require('fs').rename(
    req.files.userPhoto.path,
    '/tmp' + serverPath,
    function(error) {
      if(error) {
        res.send({
          error: 'Ah crap! Something bad happened'
        });
        return;
      }

      res.send({
        path: serverPath
      });
    }
  );
});
/* API SHiT yo
 *
 *
 */


//buckets
app.get('/api/bucket/:id', routes.readBucket);

app.post('/api/bucket', routes.createBucket);

app.put('/api/bucket/:id', routes.updateBucket);

app.delete('/api/bucket/:id', routes.deleteBucket);

/* upvote and downvote bucket
 */

app.post('/api/bucket/upvote/:id', routes.bucketUpvote)
app.post('/api/bucket/downvote/:id', routes.bucketDownvote)


//experiences
app.get('/api/xp/:id', routes.readExperience);

app.post('/api/xp', routes.createExperience);

app.put('/api/xp/:id', routes.updateExperience);

app.delete('/api/xp/:id', routes.deleteExperience);

/* upvote and downvote experiences
 */

app.post('/api/xp/upvote/:id', routes.xpUpvote);
app.post('/api/xp/downvote/:id', routes.xpDownvote);



//user api functions
app.get('/api/user/:id', routes.readUser);

app.post('/api/user', routes.createUser);

app.put('/api/user/:id', routes.updateUser);

//app.delete('/api/user/:id', routes.deleteUser);



/************ Models ************/
// Buckets
var BucketSchema = new Schema({
	author: Schema.ObjectId,
	category: String,
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
	author: Schema.ObjectId,
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
