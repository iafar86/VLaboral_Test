vLaboralApp.factory('usuariosDataFactory', function ($resource) { // data factory para manejar las cuentas de usuario
    var urlApi = "http://localhost:32069"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    return $resource(urlApi + '/api/Usuarios/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});