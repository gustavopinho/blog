'use strict';

/* Filters */

angular.module('blogFilters', []).filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
})
