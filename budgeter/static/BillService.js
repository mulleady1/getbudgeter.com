
angular.module('bills').service('BillService', ['$http', function($http) {

    this.get = function(year, month) {
        return $http.get('/bills/{year}/{month}'.replace('{year}', year).replace('{month}', month));
    }
    
    this.save = function(bill) {
        if (bill._id) {
            return $http.put('/bills/{id}'.replace('{id}', bill._id), bill);
        }

        return $http.post('/bills', bill);
    }

    this.delete = function(bill) {
        return $http['delete']('/bills/{id}'.replace('{id}', bill._id));
    }

    this.copyLastMonth = function(data) {
        return $http.post('/copy', data);
    }

    this.getCalcCache = function(year, month) {
        return $http.get('/calc-cache/{year}/{month}'.replace('{year}', year).replace('{month}', month));
    }

    this.postCalcCache = function(year, month, data) {
        return $http.post('/calc-cache/{year}/{month}'.replace('{year}', year).replace('{month}', month), data);
    }

}]);
