'use strict';

angular.module('bills', [])
.config([ '$provide', '$locationProvider', function($provide, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $provide.decorator('$locale', ['$delegate', function($delegate) {
        if ($delegate.id == 'en-us') {
            $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
            $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
        }
        return $delegate;
    }]);
}]);

$(document).ready(function() {
    $('#loading').remove();
});
