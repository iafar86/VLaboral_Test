//vLaboralApp.factory('empleadoDataFactory', function ($resource) {
//    var urlApi = "http://localhost:32069"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
//    return $resource(urlApi + '/api/Empleados/:id',
//           { id: '@id' },
//           { 'update': { method: 'PUT' } }
//        );
//});

vLaboralApp.factory('empleadoDataFactory',function ($http, $q) {
    //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    //var urlApi = "http://localhost:32069"; //desarrollo
    var urlApi = "http://vlaboralapi.azurewebsites.net"; //azure
    var empleadoDataFactory = {};

    var _getEmpleados = function () { // trae todos los empleados
        return $http.get(urlApi + '/api/Empleados').then(function (response) {
            return response.data;
        });
    };

    var _getEmpleado = function (prmIdEmpleado) { //devuelve un empleado en particular
        var deferred = $q.defer();
        $http.get(urlApi + '/api/Empleados/' + prmIdEmpleado).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _postEmpleado = function (data) { //un empleado en particular
        return $http.post(urlApi + '/api/Empleados' , data).then(function (response) {
            return response;
        });
    };

    var _putEmpleado = function (prmId, data) { //modificacion de un empleado en particular
        var deferred = $q.defer();

        $http.put(urlApi + '/api/Empleados/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };


    empleadoDataFactory.putEmpleado = _putEmpleado;
    empleadoDataFactory.getEmpleados = _getEmpleados;
    empleadoDataFactory.getEmpleado = _getEmpleado;
    empleadoDataFactory.postEmpleado = _postEmpleado;

    return empleadoDataFactory;

});