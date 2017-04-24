
Template.comments.helpers({
  comments: function(){
    return Comments.find({}, {sort: {submitted: -1}});
  }
});
