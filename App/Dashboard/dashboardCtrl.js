vLaboralApp.controller('dashboardCtrl', function ($scope, $location, authSvc) {

    $scope.logOut = function () {
        authSvc.logOut();
        alert("Deslogueado")
        $scope.authentication.userName = "usuario deslogueado";
        $location.path('/home');
    }

    $scope.authentication = authSvc.authentication;
});