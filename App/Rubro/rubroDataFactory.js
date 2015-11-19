vLaboralApp.factory('rubroDataFactory', function ($resource) {
    var urlApi = "http://localhost:32069";
    return $resource(urlApi + 'api/Rubros/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});