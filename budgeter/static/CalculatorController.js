
angular.module('bills')
.controller('CalculatorController', ['$scope', '$filter', 'BillService', function($scope, $filter, BillService) {
    $scope.calculate = function() {
        var result = parseFloat($scope.income, 10) - parseFloat($scope.expenses, 10) - $scope.total();
        return isNaN(result) ? '' : $filter('currency')(result) + ' remaining at the end of ' + $scope.activeMonth.label + '.'; 
    }
    
    $scope.$on('getCalcCache', function() {
        $scope.title = 'Loading...';
        BillService.getCalcCache($scope.activeYear.year, $scope.activeMonth.month).then(function(res) {
            $scope.title = 'Calculator';
            $scope.income = res.data.income;
            $scope.expenses = res.data.expenses;
        });
    });
    
    $('#calc-dialog').on('hide.bs.modal', function() {
        BillService.postCalcCache($scope.activeYear.year, $scope.activeMonth.month, { income: $scope.income, expenses: $scope.expenses });
    });
}]);
