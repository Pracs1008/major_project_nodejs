const Post = require('../models/post');

module.exports.home = function(req,res){
   // return res.end('<h1>Express is up for codeial</h1>');

//    console.log(req.cookies);
//    res.cookie('user_id', 25)

// to send the all the posts to the home page from this controller
      // Post.find({}, function(err, posts){
      //    return res.render('home', {
      //       title: "Codeial | Home",
      //       posts: posts
      //   });
      // });
// populate the user for each post
      Post.find({}).populate('user').exec(function(err, posts){
         return res.render('home', {
            title: "Codeial | Home",
            posts: posts
         });
      });
   
}; //this has to be accessed in routes