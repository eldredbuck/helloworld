Meteor.publish('calevents',function(project){
  return Calevents.find({project:project});
});