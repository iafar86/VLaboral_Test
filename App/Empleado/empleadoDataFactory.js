//vLaboralApp.factory('empleadoDataFactory', function ($resource) {
//    var urlApi = "http://localhost:32069"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
//    return $resource(urlApi + '/api/Empleados/:id',
//           { id: '@id' },
//           { 'update': { method: 'PUT' } }
//        );
//});

vLaboralApp.factory('empleadoDataFactory',function ($http) {

    var urlApi = "http://localhost:32069"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var empleadoDataFactory = {};

    var _getEmpleados = function () { // trae todos los empleados
        return $http.get(urlApi + '/api/Empleados').then(function (response) {
            return response.data;
        });
    };

    var _getEmpleado = function (prmIdEmpleado) { //un empleado en particular
        return $http.get(urlApi + '/api/Empleados/'+prmIdEmpleado).then(function (response) {
            return response.data;
        });
    };

    var _postEmpleado = function (data) { //un empleado en particular
        return $http.post(urlApi + '/api/Empleados' , data).then(function (response) {
            return response;
        });
    };

    empleadoDataFactory.getEmpleados = _getEmpleados;
    empleadoDataFactory.getEmpleado = _getEmpleado;
    empleadoDataFactory.postEmpleado = _postEmpleado;

    return empleadoDataFactory;

});