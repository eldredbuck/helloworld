Meteor.startup(function() {
  if (Meteor.users.find().fetch().length === 0) {
    var users = [
  {name:"Customer Service",email:"cs@cogito-solutions.com",roles:['view-projects','view-customers']},
{name:"Admin User",email:"eldred.buck@cogito-solutions.com",roles:['admin']}
];

_.each(users, function (userData) {
  var id = Accounts.createUser({
    email: userData.email,
    password: "banana1",
    username:userData.email,
    profile: { name: userData.name }
  });
  Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
  Roles.addUsersToRoles(id, userData.roles);
});
}
  Meteor.Mailgun.config({
    username: 'postmaster@domain.com',
    password: 'password-goes-here'
  });
  if(Customers.find().count() === 0){
    return Customers.insert({name:'House Account'});
  }
  Meteor.methods({
    'sendContactEmail': function(name, email, message) {
      this.unblock();

      Meteor.Mailgun.send({
        to: 'recipient@example.com',
        from: name + ' <' + email + '>',
        subject: 'New Contact Form Message',
        text: message,
        html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
      });
    },
    'saveProject':function(project){

      check(project.name,String);
      
      project.userId = Meteor.userId();
      project.dateentered = new Date();
      project.lastupdate = new Date();
      if(!project.datedue){
        project.datedue = new Date();
      }
      if(!project.customer){
        project.customer = Customers.findOne({})._id;
      }
      project.invited = [];
      //console.log(project.dateentered + " " + project.lastupdate);
      return Projects.insert(project);
    },
    'removeProject':function(id){

      return Projects.remove({_id:id});
    },
    'updateProjectName': function (id, name) {

      return Projects.update({_id: id}, {$set: {name: name}});
    },
    'updateProjectCustomer': function (project, id) {
      return Projects.update({_id: project}, {
        $set: {
          customer: id
        }
      });
    },
    'updateProjectDate': function (project, date) {
      return Projects.update({_id: project}, {
        $set: {
          datedue: date
        }
      });
    },
    'addCustomer': function (name) {
      return Customers.insert({name: name});
    },
    'updateCustomerName': function (id, name) {
      return Customers.update({_id: id}, {$set: {name: name}});
    },
    'updateCustomerPhone': function (id, phone) {
      return Customers.update({_id: id}, {$set: {phone: phone}});
    },
    'updateCustomerContact': function (id, contact) {
      return Customers.update({_id: id}, {$set: {contact: contact}});
    },
    'removeCustomer': function (id) {
      return Customers.remove({_id: id});
    },    
    'addConversation':function(conversation){
      return Conversations.insert(conversation);
    },
    'archiveConversation':function(id,archived){
      Conversations.update({_id:id},{$set:{archived:archived}});
    },
    'archiveTodo':function(id,archived){
      Todos.update({_id:id},{$set:{archived:archived}});
    },
    'completeTodo':function(id,complete){
      Todos.update({_id:id},{$set:{completed:complete}});
    },
    addChat: function (chat) {
      return Chats.insert(chat);
    },
    removeChats: function () {
      return Chats.remove({});
    },
    'addTodo':function(todo){
      todo.userId = Meteor.userId();
      todo.dateadded = new Date();
      todo.archived = false;
      todo.completed = false;
      return Todos.insert(todo);
    },
    'inviteUser':function(projectid,userId){
      var project = Projects.findOne({_id:projectid});
      if(!project || project.userId !== this.userId){
        throw new Meteor.Error(404,"No Such Project !");
      }
      if(userId !== project.userId && !_.contains(project.invited,userId)){
        Projects.update(projectid,{$addToSet:{invited:userId}});
      }
    },
    'removeInvite':function(projectid,userId){
      var project = Projects.findOne({_id:projectid});
      if(!project || project.userId !== this.userId){
        throw new Meteor.Error(404,"No Such Project !");
      }
      Projects.update(projectid,{$pull:{invited:userId}});
    }
  });
});
