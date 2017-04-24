Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
   return Meteor.subscribe('notifications')
  }
});



Router.route('/newPost', {
	name: 'postSubmit',
	 onBeforeAction: function () {
       Session.set('pageTitle', "Nuevo Post");
       this.next();
    }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  onBeforeAction: function () {
       Session.set('pageTitle', "Editando el Post '" + Posts.findOne(this.params._id).title + "");
       this.next();
    },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id', {
  name: 'postPage',
  onBeforeAction: function () {
       Session.set('pageTitle', Posts.findOne(this.params._id).title);
       this.next();
  },
  data: function() { return Posts.findOne(this.params._id); },
  waitOn: function() {
   return[
        Meteor.subscribe('singlePost', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
  },

});


PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.postsLimit()};
  },
  subscriptions: function() {
   this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      nextPath: hasMore ? nextPath : null,
      ready: this.postsSub.ready,
    };
  }
});

//...

Router.route('/:postsLimit?', {
  name: 'postsList'
});


var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});  // hook especial dataNotFound, Esto le dice a Iron Router que muestre la página de no encontrado, no solo cuando la ruta sea inválida, si no también para la ruta postPagecuando la función data devuelva un objeto falso
