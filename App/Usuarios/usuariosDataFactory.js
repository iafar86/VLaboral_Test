vLaboralApp.factory('usuariosDataFactory', function ($http,$q) { // data factory para manejar las cuentas de usuario
    //var urlApi = "http://localhost:32069"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = "http://vlaboralapi.azurewebsites.net"; //azure
    var usuarioDataFactory = {};

    var _getUsuario = function (prmIdUsuario) { //devuelve un empleado en particular
        var deferred = $q.defer();
        $http.get(urlApi + '/api/Usuarios/' + prmIdUsuario).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putUsuario = function (prmId, data) { //modificacion de un empleador en particular
        var deferred = $q.defer();

        $http.put(urlApi + '/api/Usuario/' + prmIdUsuario, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    usuarioDataFactory.getUsuario = _getUsuario;
    usuarioDataFactory.putUsuario = _putUsuario;
});