Meteor.methods({ 
  removeFile:function(id){ 
    return Uploads.remove({_id:id});
  }   
});