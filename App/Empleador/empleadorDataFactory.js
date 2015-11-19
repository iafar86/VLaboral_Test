vLaboralApp.factory('empleadorDataFactory', function ($resource) {
    var urlApi = "http://localhost:32069"; //iafar: apuntando a la direccion de la URL de la WebApi, esto se debe reemplazar cuando este implementado en azure
    return $resource(urlApi + 'api/Empleadores/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});