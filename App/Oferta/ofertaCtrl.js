vLaboralApp.controller('ofertaCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, $mdDialog, ofertaDataFactory, listadoOfertas, authSvc) {

    //#region Inicializacion de variables de scope
    $scope.oferta = {};
    $scope.oferta.Puestos = [];
    $scope.ofertas= listadoOfertas;
    $scope.estado = "PENDIENTE"

    //#region fpaz: variables de configuracion del location
    $scope.result1 = '';    
     $scope.options1 = {
                country: '',
                types: '(cities)'
            };
     $scope.details1 = '';
    //#endregion

    //#endregion

    //#region Puestos    
    $scope.AbrirParaAgregar = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'App/Oferta/Partials/AgregarPuesto.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            resolve: {
                rubroDataFactory: 'rubroDataFactory',
                listRubros: function (rubroDataFactory) {
                    return rubroDataFactory.getRubros();
                }
            }
        })
            .then(function (puesto) {                
                $scope.oferta.Puestos.push(puesto);                


            }, function () {
                //alert('Entra por Cancel');

            });
    };

    function DialogController($scope, $mdDialog, listRubros) { // controlador del dialog que devuelve los datos
        //#region fpaz: inicializacion de variables de scope en el modal
        $scope.rubros = listRubros;
        $scope.subrubrosSelect = [];
        
        //#endregion

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.resul = {};
        //fpaz: carga de puestos en la oferta
        $scope.addPuesto = function (prmPuesto) {
            var puesto = {};           

            puesto = prmPuesto;
            puesto.Rubro = $scope.rubroSelect;
            //delete puesto.Rubro.SubRubros;

            puesto.SubRubros = [];//$scope.subrubrosSelect;
            for (var i in $scope.subrubrosSelect) {
                for (var j in puesto.Rubro.SubRubros) {
                    if ($scope.subrubrosSelect[i] == puesto.Rubro.SubRubros[j].Nombre) {
                        puesto.SubRubros.push(puesto.Rubro.SubRubros[j]);
                        break;
                    }                    
                }
            }                     

            $scope.resul = puesto;
            
            $mdDialog.hide(puesto);
        };
    };
    //#endregion

    //#region fpaz: Alta de oferta
    $scope.addOferta = function (oferta) {
        //alert('Entra por Alta de Oferta');
        var authentication = authSvc.authentication;
        oferta.Publico = true;
        oferta.Estado = 'PUBLICADA';
        oferta.EmpleadorId = authentication.empleadorId;        
        for (var i in oferta.Puestos) {            
            delete oferta.Puestos[i].Rubro;
            for (var j in oferta.Puestos[i].SubRubros) {
                delete oferta.Puestos[i].SubRubros[j].Nombre;
                delete oferta.Puestos[i].SubRubros[j].Descripcion;                
                delete oferta.Puestos[i].SubRubros[j].Empleados;
                delete oferta.Puestos[i].SubRubros[j].Empleadores;
                delete oferta.Puestos[i].SubRubros[j].Puestos;
            } 
        }
        ofertaDataFactory.postOfertas(oferta).then(function (response) {
            alert("Carga de Oferta Exitosa");
            $scope.limpiar();
            },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error al Cargar la Oferta: "+  $scope.error.Message);
                 //$scope.message = err.error_description;
             }
         });
    };
    //#endregion


    //#region prueba 
    $scope.prueba = function (cadena) {
        alert(cadena);
    }
    //#endregion

    //#region limpeza de formulario
    $scope.limpiar = function () {
        $scope.oferta = {};
        $scope.oferta.Puestos = [];        
    }
    //#endregion

});




vLaboralApp.directive('clickcatcher', function(){ //iafar:directiva para capturar el evento de click en los tabs
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
          
            element.bind('click', function(event) {
                $scope.estado = attrs.estado;

                //IAFAR:estados de oferta pendiente, publicada, en curso de contratacion, y finalizada
                //if (attrs.estado=="PENDIENTE") {
                //$scope.colorEstado="indigo"
                //}
                //if (attrs.estado == "PUBLICADO") {
                //    $scope.colorEstado="orange"
                //}
                //if (attrs.estado == "CURSO") {
                //    $scope.colorEstado = "grey"
                //}
                //if (attrs.estado == "FINALIZADO") {
                //    $scope.colorEstado = "grey"
                //}
            });
        }
    };

}); 


//#endregion



