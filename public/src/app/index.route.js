export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('graphs', {
      url: '/graphs/:id',
      controller: 'GraphController',
      templateUrl: 'app/components/graph/graph.html',
      controllerAs: 'graph'
    });

  $urlRouterProvider.otherwise('/');
}
