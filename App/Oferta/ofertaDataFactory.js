vLaboralApp.factory('ofertaDataFactory', function ($resource) {
    var urlApi = "http://localhost:32069";
    return $resource(urlApi + 'api/Ofertas/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});