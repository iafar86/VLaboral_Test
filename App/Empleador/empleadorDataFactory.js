vLaboralApp.factory('empleadorDataFactory', function ($resource) {
    //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    //var urlApi = "http://localhost:32069"; //desarrollo
    var urlApi = "http://vlaboralapi.azurewebsites.net"; //azure
    return $resource(urlApi + 'api/Empleadores/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});