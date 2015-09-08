Meteor.publish('projects',function(userId){
      return Projects.find({$or:[{invited:this.userId},{userId:this.userId}]});
});
