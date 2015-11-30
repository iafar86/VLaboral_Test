vLaboralApp.filter('ofertaFilter', function () {
    return function (items, letter, estado) {
        var filtered = [];
        var letterMatch = new RegExp(letter, 'i');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (letterMatch.test(item.Nombre) && item.Estado == estado) {
                filtered.push(item);
            }
        }
        return filtered;
    };
  
});