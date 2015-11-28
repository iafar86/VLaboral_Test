vLaboralApp.factory('rubroDataFactory', function ($resource) {
    var urlApi = "http://localhost:32069";
    return $resource(urlApi + 'api/Rubros/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});

vLaboralApp.factory('rubroDataFactory', function ($http) {

    var urlApi = "http://localhost:32069"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var rubroDataFactory = {};

    var _getRubros = function () { // trae todos los Rubros
        return $http.get(urlApi + '/api/Rubros').then(function (response) {
            return response.data;
        });
    };

    rubroDataFactory.getRubros = _getRubros;
    return rubroDataFactory;

});