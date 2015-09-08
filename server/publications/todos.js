Meteor.publish('todos',function(project){
  return Todos.find({project:project});
});
