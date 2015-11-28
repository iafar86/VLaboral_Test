vLaboralApp.controller('ofertaCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, $mdDialog) {

    //#region Inicializacion de variables de scope
    $scope.listPuestos = [];    

    $scope.result1 = '';
    //$scope.options1 = null;
    $scope.options1 = {
        country: '',
        types: '(cities)'
    };
    $scope.details1 = '';
    //#region Puestos    
    
    //#region Dialog Puestos
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
                $scope.listPuestos.push(puesto);                
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

});