var vLaboralApp = angular.module('vLaboralApp', ['ngResource', 'ui.router', 'ngCookies', 'ngTable',
  'ngSanitize', 'ngAnimate', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ngMaterial'
, 'oc.lazyLoad'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;


        $urlRouterProvider.otherwise("/app/dashboard");

        $stateProvider //fpaz: defino los states que van a guiar el ruteo de las vistas parciales de la app       


        $stateProvider
          .state('app', {
              abstract: true,
              url: '/app',
              views: {
                  '': {
                      templateUrl: 'views/layout.html'
                  },
                  'aside': {
                      templateUrl: 'views/aside.html'
                  },
                  'content': {
                      templateUrl: 'views/content.html'
                  }
              }
          })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/pages/dashboard.html',
                data: { title: 'Dashboard', folded: true },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load(['scripts/controllers/chart.js', 'scripts/controllers/vectormap.js']);
                    }]
                }                
            })
         .state('app.analysis', {
             url: '/analysis',
             templateUrl: 'views/pages/dashboard.analysis.html',
             data: { title: 'Analysis' },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                 loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     // you can lazy load files for an existing module
                     return $ocLazyLoad.load(['scripts/controllers/chart.js', 'scripts/controllers/vectormap.js']);
                 }]
             }
         })

        .state('app.agregarOferta', {
            url: '/agregarOferta',
            templateUrl: 'App/Oferta/Partials/ofertaAddMD.html',
            controller: 'ofertaCtrl',
            data: { title: 'ofertaAddMD' },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {                   
                    return $ocLazyLoad.load(['App/Oferta/ofertaCtrl.js']);
                }]
            }
        })
       })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorSvc');//agrego al array de interceptor el sevicio authInterceptorSvc que se encarga de mandar ,en cada peticion al web api, el token de acceso obtenido en el login y de redirigir a la pagina de logueo , en caso de que un usuario anonimo quiera agseder a un recurso privado
    })
    .config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

        // lazy controller, directive and service
        vLaboralApp.controller = $controllerProvider.register;
        vLaboralApp.directive = $compileProvider.directive;
        vLaboralApp.filter = $filterProvider.register;
        vLaboralApp.factory = $provide.factory;
        vLaboralApp.service = $provide.service;
        vLaboralApp.constant = $provide.constant;
        vLaboralApp.value = $provide.value;
    }
    ])
    .run(['authSvc', function (authSvc) { //cada ves que el usuario entra a la aplicacion ejecuto la funcion para obtener el token guardado en el storage que este vigente, en caso de que exita uno almacenado
        authSvc.fillAuthData();
    }]);
