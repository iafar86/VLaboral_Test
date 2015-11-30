//vLaboralApp.factory('ofertaDataFactory', function ($resource) {
//    var urlApi = "http://localhost:32069";
//    return $resource(urlApi + 'api/Ofertas/:id',
//           { id: '@id' },
//           { 'update': { method: 'PUT' } }
//        );
//});

vLaboralApp.factory('ofertaDataFactory', function ($http,$q) {

    var urlApi = "http://localhost:32069"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var ofertaDataFactory = {};

    var _getOfertas = function () { // trae todos las ofertas
        return $http.get(urlApi + '/api/Ofertas').then(function (response) {
            return response.data;
        });
    };

    var _getOfertas_Empleador = function (prmIdEmpleador) { //un empleado en particular
        return $http.get(urlApi + '/api/Ofertas/' + prmIdEmpleador).then(function (response) {
            return response.data;
        });
    };

    var _getOfertas_Busqueda = function (prmIdEmpleador, prmSearchObj) { //busqueda por empleador y parametros de busqueda
        return $http.get(urlApi + '/api/Ofertas/' + prmIdEmpleador, prmSearchObj).then(function (response) {
            return response.data;
        });
    };

    var _postOferta = function (data) { //alta de una oferta en particular
        var deferred = $q.defer();

        //return $http.post(urlApi + '/api/Ofertas/', data).then(function (response) {
        //    return response;
        //});
        $http.post(urlApi + '/api/Ofertas/', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    ofertaDataFactory.getOfertas = _getOfertas;
    ofertaDataFactory.getOfertas_Empleador = _getOfertas_Empleador;
    ofertaDataFactory.getOfertas_Busqueda = _getOfertas_Busqueda;
    ofertaDataFactory.postOfertas = _postOferta;

    return ofertaDataFactory;

});