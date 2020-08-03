var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");
var data = [
    {
        name: "Fire Camp",
        image: "https://images.unsplash.com/photo-1524856781660-e5c92f4ac62a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=952e5225634b3558eadb9d1395113d12&auto=format&fit=crop&w=900&q=60",
        description: "blah blah blah"
    },
    {
        name: "Camp With Cosmos",
        image: "https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2133a2e6648c39b6d1845bcc603b09ce&auto=format&fit=crop&w=900&q=60",
        description: "blah blah blah"
    },
    {
        name: "Camp With Caravan",
        image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c0b66b816b4653b3b0e02af008c82403&auto=format&fit=crop&w=900&q=60",
        description: "blah blah blah"
    }
    ];

function seedDB(){
    Campground.remove({}, function(err){
      if(err) {
          console.log(err);
      }  
          console.log("Removed campgrounds");
    //   add a few CampGrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err){
              console.log(err);
          } else {
              console.log("added a campground");
            //   create a comment
            Comment.create(
                {
                    text: "This place is great,",
                    author: "homer"
                
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created New comments");
                    }
                } 
            );
          }
      });
    });
    });
}

module.exports = seedDB;