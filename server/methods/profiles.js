Meteor.methods({ 
  updateProfile:function(data){ 
    Meteor.users.update(Meteor.userId(), {$set: {profile: data}}); 
  } 
});