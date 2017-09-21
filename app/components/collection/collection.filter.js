

angular.module("collection.filter", [])
/**
 * @ngdoc filter
 * @name Collections.filter:range
 * @description
 * emailAvailable 
 *
 */
.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++)
            input.push(i);
        return input;
    };
})
