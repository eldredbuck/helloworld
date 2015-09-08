Router.map(function() {

  this.route('home', {
    path: '/',
    layoutTemplate:'nosidebar'
  });
  
  this.route('archives', {
    layoutTemplate: 'mainLayout',
    path: '/archives',
    loginRequired: 'entrySignIn',
    waitOn: function () {
      Meteor.subscribe('archives', Session.get('active_project'));

    },
    onAfterAction: function() {
       SEO.set({
         title: 'Archives | ' + SEO.settings.title
       });
    }
    
  });
  
  this.route('customers', {
    path: '/customers',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      return Meteor.subscribe('customers');
    },
    data:{
      'customers':function(){
        return Customers.find({});
      }
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Customers | ' + SEO.settings.title
      });
    }
  });
  
  this.route('dashboard', {
    path: '/dashboard',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('customers');
      Meteor.subscribe('chats');
      return Meteor.subscribe('projects',Meteor.userId());
    },
    data:{
      'projects':function(){
        return Projects.find();
      }
    },
    onAfterAction: function() {
       SEO.set({
         title: 'Dashboard | ' + SEO.settings.title
       });
    }
  });
  
  
  
  this.route('profile', {
    path: '/profile',
    layoutTemplate:'nosidebar',
    data: function() {
      return Meteor.user();
    },
    onAfterAction: function() {
       SEO.set({
         title: 'Profile | ' + SEO.settings.title
       });
    }
  });
  
  this.route('profileadmin', {
    path: '/profileadmin',
    layoutTemplate:'nosidebar',
    loginRequired: 'entrySignIn',
    data: function() {
      return Meteor.user();
    },
    onAfterAction: function() {
       SEO.set({
         title: 'Super Admin | ' + SEO.settings.title
       });
    }
  });
  
  this.route('projectView',{
    path:'/projects/:id',
    layoutTemplate:'mainLayout',
    loginRequired:'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('customers');
      Meteor.subscribe('conversations',this.params.id);
      Meteor.subscribe('todos',this.params.id);
      Meteor.subscribe('calevents',this.params.id);
      Meteor.subscribe('uploads',this.params.id);
      Meteor.subscribe('directory');
      Meteor.subscribe('chats');

      return Meteor.subscribe('projects');
    },
    data:function(){
      Session.set('active_project',this.params.id);
      return Projects.findOne({_id:this.params.id});
    },
    onAfterAction:function(){
      SEO.set({
        title:'Property View | ' + SEO.settings.title
      })
    }
  });
  
  this.route('roles', {
    path: '/roles',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      return Meteor.subscribe('directory');
    },
    onAfterAction: function() {
       SEO.set({
         title: 'Roles | ' + SEO.settings.title
       });
    }
  });

  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });

});
