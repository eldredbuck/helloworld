Meteor.methods({ 
  addToRole:function(user,role){
    var loggedInUser = Meteor.user();
    if (!loggedInUser && !Roles.userIsInRole(loggedInUser, ['admin'])) {
          throw new Meteor.Error(403, "Access denied")
        }
      Roles.addUsersToRoles(user,role);
  },
  removeFromRole:function(user,role){
      Roles.removeUsersFromRoles(user,role);
  } 
});