vLaboralApp.controller('usuariosCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, empleadorDataFactory, authSvc) {
    //#region Inicializacion de Variables de Scope
    $scope.infoUsuario = infoUsuario.data;
    //#endRegion

    //#region Modificacion de Datos de usuario
    $scope.edit = function () {//fpaz: activa el modo de edicion de los campos        
        $scope.editValue = true;
    };

    $scope.save = function (infoUsuario) {//fpaz: guarda los cambios y llama a la funcion put de la api        
        usuariosDataFactory.putUsuario(infoUsuario.Id, infoUsuario).then(function (response) {
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
    //#end Region

    //#region Limpieza de Formularios
    $scope.cancel = function (prmIdUsuario) { //fpaz: funcion para cancelar una modificacion u otra operacion y traer los datos originales del empleador        
        //$scope.infoEmpleador = empleadorDataFactory.getEmpleadors(authSvc.authentication.empleadorId)
        usuariosDataFactory.getEmpleador(prmIdUsuario).then(function (response) {
            $scope.infoUsuario = response.data;
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