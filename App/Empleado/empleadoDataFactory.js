vLaboralApp.factory('empleadoDataFactory', function ($resource) {
    var urlApi = "http://localhost:32069"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    return $resource(urlApi + '/api/Empleados/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});