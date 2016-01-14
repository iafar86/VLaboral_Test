vLaboralApp.controller('empleadoCtrl', function ($scope, $stateParams, $state, $filter, $mdDialog, ngTableParams, empleadoDataFactory, rubroDataFactory
    , listadoEmpleados, infoEmpleado, listadoRubros) {
    
    //#region Rubro/SubRubro

    $scope.rubros = listadoRubros; //Carga todos los rubros y subrubros existentes
    $scope.rubrosList = [];
    $scope.rubroSelect = [];
    $scope.subRubroSelect = [];

    $scope.AddRubro = function () {
        rubroTemp = {
            rId: $scope.rubroSelect.Id,
            rNombre: $scope.rubroSelect.Nombre,
            srId: $scope.subRubroSelect.Id,
            srNombre: $scope.subRubroSelect.Nombre
        };
        $scope.rubrosList.push(rubroTemp);
    } //Agrega un nuevo rubro a la lista de Rubro/SubRubro del empleado

    $scope.RubroDel = function (item) {
        var index = $scope.rubrosList.indexOf(item);
        $scope.rubrosList.splice(index, 1);
    }//Elimino un Rubro/SubRubro de la lista
    //#endregion


    $scope.infoEmpleado = infoEmpleado.data;
    var infoActualEmpleado = infoEmpleado;
    $scope.empleados = listadoEmpleados;
    var data = $scope.empleados;

    $scope.infoCollapse = false; //var para hacer el collapse de la seccion info detallada de empleados detail
    $scope.addEmpleadoCollapse = true; //var para hacer el collapse de la seccion carga nueva Empleado de empleados_main
    $scope.listEmpleadosCollapse = false; //var para hacer el collapse de la seccion Listados de empleados de empleados_main

    //#region validaciones
    //fpaz: funcion para validar si ya existe un empleado cargado con el numero de dni ingresado
    $scope.validacionDni = function (prmDni) {
        $scope.edit();
        //$scope.prmDni = prmDni;
        //alert(prmDni);
        //empleadoDataFactory.query({ id: 0, prmDni: prmDni }).$promise.then(
        //    function () {
        //        //alert("No existe el tipo - sigue");
        //        $scope.edit();
        //    },
        //    function (response) {
        //        $scope.editValue = false;
        //        $scope.errors = response.data;
        //        alert($scope.errors.Message);
        //    });
    };
    //#region

    //#region Alta de empleados
    //funcion para agregar una nueva Empleado y mostrarla en la tabla
    $scope.addEmpleado = function () {
        $scope.empleados = empleadoDataFactory.query();
        data = $scope.empleados;
    };
    
    $scope.empleadoAdd = function (infoEmpleado) {
        alert('entra por empleado add');
        //empleadoDataFactory.postEmpleado(empleado).$promise.then(
        //    function () {
        //        $scope.addEmpleado();
        //        $scope.empleado = {};
        //        alert('Nuevo Empleado Guardado');
        //        $state.go('empleadoList');
        //    },
        //    function (response) {
        //        $scope.errors = response.data;
        //        alert($scope.errors.Message);
        //    });
        empleadoDataFactory.postEmpleado(infoEmpleado);
        alert('paso el post');
        $scope.infoEmpleado = {};
    };

    $scope.cancelEmpleadoAdd = function () {
        $scope.empleado = null;
    };
    //#endregion

    //#region Modificacion de empleados

    $scope.editValue = false; // variable que voy a usar para activar y desactivar los modos de edicion para hacer el update de la info de la Empleado

    $scope.edit = function () {// activa el modo de edicion de los campos        
        $scope.editValue = true;
    };

    //#endregion

    $scope.save = function (infoEmpleado) {//fpaz: guarda los cambios y llama a la funcion put de la api        
        empleadoDataFactory.putEmpleado(infoEmpleado.Id, infoEmpleado).then(function (response) {
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

    $scope.cancel = function (prmIdEmpleado) { //fpaz: funcion para cancelar una modificacion u otra operacion y traer los datos originales del empleador        
        //$scope.infoEmpleador = empleadorDataFactory.getEmpleadors(authSvc.authentication.empleadorId)
        empleadoDataFactory.getEmpleado(prmIdEmpleado).then(function (response) {
            $scope.infoEmpleado = response.data;
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

    //#region Eliminacion de empleados
    $scope.delete = function (infoEmpleado) {
        empleadoDataFactory.delete(infoEmpleado).$promise.then(
            function () {
                alert("Eliminacion Exitosa");
                $state.go('empleados');
            },
            function (response) {
                alert("Eliminacion Fallida", response.data);
                //$scope.resultado = 'Error Eliminacion';
            });
    };
    //#endregion

    $scope.calificacion = [];


    //$scope.calificacionFina =l = function () {
    //    var calificacion = $scope.calificacion.conocimiento1 + $scope.calificacion.conocimiento2 + $scope.calificacion.cumplimiento + $scope.calificacion.cumplimiento2 + $scope.calificacion.conocimiento3 + $scope.calificacion.adaptacion + $scope.calificacion.capacidad + $scope.calificacion.ajuste + $scope.calificacion.ajuste2 + $scope.calificacion.ajuste3;
    //    var promedioCalificacion = Math.floor(calificacion);
    //    $scope.
    //};

    //#region Paginacion y llenado y filtrado de la tabla dinamica de empleados
    //$scope.tableParams = new ngTableParams({
    //    page: 1,            // show first page
    //    count: 10,          // count per page
    //    filter: {
    //        // filtros de la tabla, 
    //        CUE: '', //por numero de CUE       
    //        Nombre: ''// por nombre de Empleado
    //    }
    //}, {
    //    total: data.length, // saco el Total de registros del listado de empleados
    //    getData: function ($defer, params) {
    //        // use build-in angular filter
    //        var orderedData = params.filter() ?
    //               $filter('filter')(data, params.filter()) :
    //               data;

    //        //$defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    //        $scope.empleados = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

    //        params.total(orderedData.length); // set total for recalc pagination
    //        $defer.resolve($scope.empleados);
    //    }
    //});
    //#endregion

    //#region Trae un empleado en particular

    $scope.mostrarDetalle = function (empleadoId, ev) {
        var empleado = empleadoDataFactory.getEmpleado(empleadoId);
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'App/Empleado/Partials/empleadoDetalle.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    };
    //endregion
    


    



});