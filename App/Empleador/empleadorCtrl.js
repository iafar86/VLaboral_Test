vLaboralApp.controller('empleadorCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, empleadorDataFactory, listadoEmpleadores, infoEmpleador) {

    $scope.infoEmpleador = infoEmpleador;
    var infoActualEmpleador = infoEmpleador;
    $scope.empleadores = listadoEmpleadores;
    var data = $scope.empleadores;

    $scope.infoCollapse = false; //var para hacer el collapse de la seccion info detallada de Empleadores detail
    $scope.addEmpleadorCollapse = true; //var para hacer el collapse de la seccion carga nueva Empleador de Empleadores_main
    $scope.listEmpleadoresCollapse = false; //var para hacer el collapse de la seccion Listados de Empleadores de Empleadores_main

    //#region Alta de Empleadores
    //funcion para agregar una nueva Empleador y mostrarla en la tabla
    $scope.addEmpleador = function () {
        $scope.empleadores = empleadorDataFactory.query();
        data = $scope.empleadores;
    };

    $scope.empleadorAdd = function (empleador) {
        empleadorDataFactory.save(empleador).$promise.then(
            function () {
                $scope.addEmpleador();
                $scope.Empleador = {};
                alert('Nuevo Empleador Guardado');
            },
            function (response) {
                $scope.errors = response.data;
                alert('Error al guardar la Empleador');
            });
    };

    $scope.cancelEmpleadorAdd = function () {
        $scope.Empleador = null;
    };
    //#endregion

    //#region Modificacion de Empleadores

    $scope.editValue = false; // variable que voya usarpara activar y desactivar los modos de edicion para hacer el update de la info de la Empleador

    $scope.edit = function () {// activa el modo de edicion de los campos        
        $scope.editValue = true;
    };

    $scope.save = function (infoEmpleador) {// guarda los cambios y llama a la funcion put de la api        
        empleadorDataFactory.update({ id: infoEmpleador.Id }, infoEmpleador).$promise.then(
                function () {
                    $scope.editValue = false;
                    alert("Modificacion de Datos Exitosa");
                },
                function (response) {
                    $scope.infoEmpleador = $scope.infoEmpleadorOriginal;
                    alert("Error en la Modificacion de Datos", response.data);
                });
    };

    $scope.cancel = function () {
        $scope.infoEmpleador = empleadorDataFactory.get({ id: infoEmpleador.Id })
        $scope.editValue = false;
    };

    //#endregion

    //#region Eliminacion de Empleadores
    $scope.delete = function (infoEmpleador) {
        empleadorDataFactory.delete(infoEmpleador).$promise.then(
            function () {
                alert("Eliminacion Exitosa");
                $state.go('Empleadores');
            },
            function (response) {
                alert("Eliminacion Fallida", response.data);
                //$scope.resultado = 'Error Eliminacion';
            });
    };
    //#endregion

    //#region Paginacion y llenado y filtrado de la tabla dinamica de Empleadores
    //$scope.tableParams = new ngTableParams({
    //    page: 1,            // show first page
    //    count: 10,          // count per page
    //    filter: {
    //        // filtros de la tabla, 
    //        CUE: '', //por numero de CUE       
    //        Nombre: ''// por nombre de Empleador
    //    }
    //}, {
    //    total: data.length, // saco el Total de registros del listado de Empleadores
    //    getData: function ($defer, params) {
    //        // use build-in angular filter
    //        var orderedData = params.filter() ?
    //               $filter('filter')(data, params.filter()) :
    //               data;

    //        //$defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    //        $scope.Empleadores = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

    //        params.total(orderedData.length); // set total for recalc pagination
    //        $defer.resolve($scope.Empleadores);
    //    }
    //});
    //#endregion
});