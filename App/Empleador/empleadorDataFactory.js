vLaboralApp.factory('empleadorDataFactory', function ($http, $q) {
    //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    //var urlApi = "http://localhost:32069"; //desarrollo
    var urlApi = "http://vlaboralapi.azurewebsites.net"; //azure
    var empleadorDataFactory = {};

    var _getEmpleadores = function () { // trae todos los empleados
        return $http.get(urlApi + '/api/Empleadores').then(function (response) {
            return response.data;
        });
    };

    var _getEmpleador = function (prmIdEmpleador) { //devuelve un empleado en particular
        var deferred = $q.defer();
        $http.get(urlApi + '/api/Empleadores/' + prmIdEmpleador).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putEmpleador = function (prmId,data) { //modificacion de un empleador en particular
        var deferred = $q.defer();
        
        $http.put(urlApi + '/api/Empleadores/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    empleadorDataFactory.getEmpleadores = _getEmpleadores;
    empleadorDataFactory.getEmpleador = _getEmpleador;
    empleadorDataFactory.putEmpleador = _putEmpleador;

    return empleadorDataFactory;

});

