
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
	facebook: {
		everyauth: {
			myHostname = 'http://www.tampabucketlist.com',
			appId: '298711390225395',
			appSecret: 'a2c48875a24d5abbb9d81b1eac806100',
			redirectPath: '/'
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
app.get('/api/bucket/:id', routes.readBucket);

app.post('/api/bucket', routes.createBucket);

app.put('/api/bucket/:id', routes.updateBucket);

app.delete('/api/bucket/:id', routes.deleteBucket);

/* upvote and downvote bucket
 */

app.post('/api/bucket/upvote/:id', routes.bucketUpvote)
app.post('/api/bucket/downvote/:id', routes.bucketDownvote)


//experiences
app.get('/api/experience/:id', routes.readExperience);

app.post('/api/experience', routes.createExperience);

app.put('/api/experience/:id', routes.updateExperience);

app.delete('/api/experience/:id', routes.deleteExperience);

/* upvote and downvote experiences
 */

app.post('/api/xp/upvote/:id', routes.xpUpvote);
app.post('/api/xp/downvote/:id', routes.xpDownvote);

//user api functions
app.get('/api/user/:id', routes.readUser);

app.post('/api/user', routes.createUser);

app.put('/api/user/:id', routes.updateUser);

//app.delete('/api/user/:id', routes.deleteUser);

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
