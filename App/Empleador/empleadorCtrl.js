vLaboralApp.controller('empleadorCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, empleadorDataFactory, listadoEmpleadores, infoEmpleador, authSvc) {

    //#region Inicializacion de Variables de Scope
    $scope.infoEmpleador = infoEmpleador.data;
    
    var infoActualEmpleador = infoEmpleador;
    $scope.empleadores = listadoEmpleadores;
    var data = $scope.empleadores;

    $scope.infoCollapse = false; //var para hacer el collapse de la seccion info detallada de Empleadores detail
    $scope.addEmpleadorCollapse = true; //var para hacer el collapse de la seccion carga nueva Empleador de Empleadores_main
    $scope.listEmpleadoresCollapse = false; //var para hacer el collapse de la seccion Listados de Empleadores de Empleadores_main

    $scope.editValue = false; // variable que voy a usarpara activar y desactivar los modos de edicion para hacer el update de la info de la Empleador

    //#region fpaz: variables de configuracion del location
    $scope.result1 = '';
    $scope.options1 = {
        country: '',
        types: ''
    };
    $scope.details1 = '';
    //#endregion
    //#endregion

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

    $scope.edit = function () {//fpaz: activa el modo de edicion de los campos        
        $scope.editValue = true;
    };

    $scope.save = function (infoEmpleador) {//fpaz: guarda los cambios y llama a la funcion put de la api        
        empleadorDataFactory.putEmpleador(infoEmpleador.Id, infoEmpleador).then(function (response) {
            $scope.editValue = false;
            alert("Cambios Guardados Correctamente");
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 $scope.cancel();
                 alert("Error al Modificar la Información: " + $scope.error.Message);
                 //$scope.message = err.error_description;
             }
         });
    };
    //#endregion

    //#region Limpieza de Formularios
    $scope.cancel = function (prmIdEmpleador) { //fpaz: funcion para cancelar una modificacion u otra operacion y traer los datos originales del empleador        
        //$scope.infoEmpleador = empleadorDataFactory.getEmpleadors(authSvc.authentication.empleadorId)
        empleadorDataFactory.getEmpleador(prmIdEmpleador).then(function (response) {
            $scope.infoEmpleador = response.data;            
            $scope.editValue = false;
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 //$scope.cancel();
                 alert("Error" + $scope.error.Message);
             }
         });
    };
    //#endregion
});