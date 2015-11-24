vLaboralApp.controller('ofertaCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, $mdDialog) {

    //// Disable weekend selection
    //$scope.disabled = function (date, mode) {
    //    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    //};

    //$scope.toggleMin = function () {
    //    $scope.minDate = $scope.minDate ? null : new Date();
    //};
    //$scope.toggleMin();

    //$scope.open = function ($event) {
    //    $event.preventDefault();
    //    $event.stopPropagation();

    //    $scope.opened = true;
    //};

    //$scope.dateOptions = {
    //    formatYear: 'yy',
    //    startingDay: 1
    //};

    //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    //$scope.format = $scope.formats[0];

    //var tomorrow = new Date();
    //tomorrow.setDate(tomorrow.getDate() + 1);
    //var afterTomorrow = new Date();
    //afterTomorrow.setDate(tomorrow.getDate() + 2);
    //$scope.events =
    //  [
    //    {
    //        date: tomorrow,
    //        status: 'full'
    //    },
    //    {
    //        date: afterTomorrow,
    //        status: 'partially'
    //    }
    //  ];

    //$scope.getDayClass = function (date, mode) {
    //    if (mode === 'day') {
    //        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

    //        for (var i = 0; i < $scope.events.length; i++) {
    //            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

    //            if (dayToCheck === currentDay) {
    //                return $scope.events[i].status;
    //            }
    //        }
    //    }

    //    return '';
    //};

    //Alta Oferta
    //$scope.ofertaAdd= function (oferta)
    //{
    //    ofertaDataFactory.postOferta(oferta);
    //}

    //$scope.cancelOferta = function () {
    //    $scope.oferta = null;
    //};


    //iafar: Puestos

    $scope.Puestos = ["1"];
    $scope.CantPuestos = 1;
   

    $scope.AddPuesto = function () {
        $scope.Puestos.push("1");
        ($scope.CantPuestos)++;
    };



    //$scope.SubRubro=[]
    //$scope.Puestos = [{ Nombre: "Puesto Nuevo" },
    //    {cantVacantes:0},
    //    { Remuneracion: 0.00 },
    //    { Requisitos: "" },
    //    {SubRubro:[]},
    //    { Disponibilidad: "" },



    //];

    //Dialog Region
    $scope.AbrirParaAgregar = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'App/Oferta/Partials/AgregarPuesto.html',
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
    //end Region#

});