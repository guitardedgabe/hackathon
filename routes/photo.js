
exports.uploadPhoto = function(req, res, next){
  console.log(req.files);
  var serverPath = 'photos/images/' + req.files.userPhoto.name;

    console.log(req.files.userPhoto.name);
      require('fs').rename(
        req.files.userPhoto.path,
        './public/' + serverPath,
        function(error) {
          if(error) {
            res.send({
              error: 'Ah crap! Something bad happened'
            });
            return;
          }

          req.path = serverPath;

          //next();

          res.send({
            path: serverPath,
          });

        }
      );
}

exports.addPhotoToExperience = function(req, res){
    var path = req.path;
    var id = req.body.experienceId

    Experience.findOne({ "_id":id}, function(err, doc){
        if ( err == null ) {
            res.send({'error':'error man'});
            return;
        }

        doc.pictures.push(path);
        res.send({success:'nice!'});
        return;
    })
}
