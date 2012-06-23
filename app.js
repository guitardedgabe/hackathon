
/**
 * Module dependencies.
 */

var express = require('express')
  , _u = require('./public/lib/underscore.js')
  , MongoStore = require('connect-mongo')(express)
  , fs = require('fs')
  , util = require('util');

console.log(JSON.stringify(routes));
 
 var mongoose = require('mongoose'),
     mongooseAuth = require('mongoose-auth'),
     conf = require('./conf'),
     Schema = mongoose.Schema;
 
var routes = {
    index: require('./routes').index,
    uploadPhoto: require('./routes/photo.js').uploadPhoto,
    addPhotoToExperience: require('./routes/photo.js').addPhotoToExperience,
    api: require('./routes/api.js').api,
}

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
  app.register('.html',require('jade'));
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



app.post('/api/photos', routes.uploadPhoto, routes.addPhotoToExperience );

/* API SHiT yo
 *
 *
 */


//buckets
app.get('/api/bucket/:id', routes.api.readBucket);

app.post('/api/bucket', routes.api.createBucket);

app.put('/api/bucket/:id', routes.api.updateBucket);

app.delete('/api/bucket/:id', routes.api.deleteBucket);

/* upvote and downvote bucket
 */

app.post('/api/bucket/upvote/:id', routes.api.bucketUpvote)
app.post('/api/bucket/downvote/:id', routes.api.bucketDownvote)


//experiences
app.get('/api/experience/:id', routes.api.readExperience);

app.post('/api/experience', routes.api.createExperience);

app.put('/api/experience/:id', routes.api.updateExperience);

app.delete('/api/experience/:id', routes.api.deleteExperience);

/* upvote and downvote experiences
 */

app.post('/api/xp/upvote/:id', routes.api.exexperiencevote);
app.post('/api/xp/downvote/:id', routes.api.experienceDownvote);

//user api functions
app.get('/api/user/:id', routes.api.readUser);

app.post('/api/user', routes.api.createUser);

app.put('/api/user/:id', routes.api.updateUser);

//app.delete('/api/user/:id', routes.api.deleteUser);

app.get('/upload/photo', function(req, res){
    res.render('photo.html', {layout: false});

});



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
