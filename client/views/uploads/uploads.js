Template.uploads.events({
  'change .myFileInput':function(evt,tmpl){
    FS.Utility.eachFile(evt,function(file){
      var theFile = new FS.File(file);
      theFile.creatorId = Meteor.userId();
      theFile.project = Session.get('active_project');
      Uploads.insert(theFile,function(err,fileObj){
        if(!err){
          //do something if there is no error.
        }
      })
    })
  }
});
Template.uploads.helpers({
  uploads:function(){
    return Uploads.find({project:Session.get('active_project')});
  }
});
Template.upload.events({ 
  'click .removeFile': function(evt, tmpl){ 
     var id = this._id;
     alert(id);
     //Meteor.call('removeFile',id);
  } 
});
Template.upload.helpers({
  isowner: function(parent){
    
    
    //var personId = Uploads.find({id:this._id},{creatorId:Meteor.userId()});
    console.log('User: ' + Meteor.userId());
    console.log('Parent: ' + parent._id);
    console.log('File Id: ' + this._id);
    //console.log('Pic creator' + personId);
    
    
  }
});