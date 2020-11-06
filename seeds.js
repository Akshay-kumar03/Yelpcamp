var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data = [
    {
        name: "Cloud's rest", 
        image: "https://images.unsplash.com/photo-1527931548997-178c464df936?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Desert messa", 
        image: "https://images.unsplash.com/photo-1542067519-6cd1e217df2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Canyon floor", 
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }

    
]
function seedDB(){
    //remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
            console.log('removed campgrounds!');  
            //add a few campgrounds
            data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            }else{
                console.log("added a campground");
                //create a comment
                Comment.create(
                    {
                        text: "This place is great, but i wish there was internet!",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Creatd new comment");
                        }
                    })
                
            }
        });
    });  
 });
    
    
    //add a few comments
}

module.exports = seedDB;