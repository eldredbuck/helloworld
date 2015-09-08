Meteor.publish('conversations',function(project){
  return Conversations.find({project:project});
});
