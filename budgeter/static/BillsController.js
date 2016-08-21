(function() {

angular.module('bills')
.controller('BillsController', ['BillService', '$scope', '$location', function(BillService, $scope, $location) {
    function Bill() {
        this.name = '';
        this.amount = '';
        this.link = '';
        this.paid = false;
        this.month = $scope.activeMonth.month;
        this.year = $scope.activeYear.year;
        this.showEdit = true;
    }
    $scope.total = function() {
        var sum = 0;
        angular.forEach($scope.bills, function(bill) {
            sum += parseInt(bill.amount, 10) || 0;
        });
        return sum;
    };
    $scope.amountPaid = function() {
        var sum = 0;
        angular.forEach($scope.bills, function(bill) {
            if (bill.paid) {
                sum += parseInt(bill.amount, 10);
            }
        });
        return sum;
    };
    $scope.dateSelected = function(label) {
        if (typeof label == 'number') {
            angular.forEach($scope.years, function(year) {
                year.active = false;
                if (year.label == label) {
                    $scope.activeYear = year;
                }
            });
        } else {
            angular.forEach($scope.months, function(month) {
                month.active = false;
                if (month.label == label) {
                    $scope.activeMonth = month;
                }
            });
        }
        loadBills();

        setTimeout(function() {
            if ($('.sidebar').hasClass('visible')) {
                toggleMobileSidebar();
            }
        }, 100);
    };
    $scope.onAddClick = function() {
        $scope.bills.push(new Bill());
        setTimeout(function() {
            var inputs = document.querySelectorAll('input[ng-model="bill.name"]');
            inputs[inputs.length - 1].focus();
        }, 100);
    };
    $scope.onEditClick = function(bill) {
        bill.showEdit = true;
    };
    $scope.onSaveClick = function(bill) {
        delete bill.showEdit;
        
        toast('Saving...');
        BillService.save(bill).then(function(res) {
			if (!bill._id) {
				$scope.bills.pop();
				$scope.bills.push(res.data);
			}
            toast('Saved.');
        }, function(res) {
            toast(res.data.msg ? res.data.msg : 'Oops! An error occurred.');
        });

    };
    $scope.onPaidCheckboxChange = function(bill) {
        $scope.onSaveClick(bill);
    };
    $scope.onDeleteClick = function(bill) {
        if (bill._id) {
            BillService.delete(bill).then(function() {
                toast('Saved.');
                $scope.bills.splice($scope.bills.indexOf(bill), 1);
            }, function(res) {
                toast(res.data.msg ? res.data.msg : 'Oops! An error occurred.');
            });
        } else {
            $scope.bills.splice($scope.bills.indexOf(bill), 1);
        }
    };
    $scope.copyLastMonth = function() {
        if (!confirm('Are you sure? This will delete any existing bills for the selected month.')) return;
        var data = {
            year: $scope.activeYear.year,
            month: $scope.activeMonth.month
        };
        BillService.copyLastMonth(data).then(function(res) {
            if (!(res.data instanceof Array)) {
                return alert('An error occurred.');
            }
            $scope.bills = res.data;
        });
    }
    $scope.predicate = function(bill) {
        return bill._id ? bill.name : 'ZZZZZZ';
    }
    $scope.onShowCalcClick = function() {
        $scope.$broadcast('getCalcCache');
        setTimeout(function() {
            $('.navbar-collapse').collapse('hide');
            $('#calc-dialog').modal();
        }, 1);
    }

    function loadBills() {
        BillService.get($scope.activeYear.year, $scope.activeMonth.month).then(function(res) {
            $scope.bills = res.data;
        });
    }

    function deriveDates() {
        var d = new Date();
        $scope.months = [
            { month: 1,  label: 'January' }, { month: 2,  label: 'February' }, { month: 3,  label: 'March'     },
            { month: 4,  label: 'April'   }, { month: 5,  label: 'May'      }, { month: 6,  label: 'June'      },
            { month: 7,  label: 'July'    }, { month: 8,  label: 'August'   }, { month: 9,  label: 'September' },
            { month: 10, label: 'October' }, { month: 11, label: 'November' }, { month: 12, label: 'December'  }
        ];
        $scope.years = [
            { year: d.getFullYear() - 1, label: d.getFullYear() - 1 },
            { year: d.getFullYear(),     label: d.getFullYear()     },
            { year: d.getFullYear() + 1, label: d.getFullYear() + 1 }
        ];
        $scope.activeYear = {
            year: d.getFullYear(),
            label: d.getFullYear()
        };
        $scope.activeMonth = {
            month: d.getMonth() + 1
        };
        angular.forEach($scope.months, function(month) {
            if (month.month == (d.getMonth() + 1)) {
                $scope.activeMonth.label = month.label;
            }
        });
    }

    $scope.in = $location.search().in;
    $scope.out = $location.search().out;
    deriveDates();
    loadBills();
}]);


$('.sidebar-btn').on('click', toggleMobileSidebar);

function toggleMobileSidebar() {
    $('body').toggleClass('modal-open');
    $('.sidebar').toggleClass('visible');
    $('.sidebar-btn').find('span').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    $('.sidebar').height(window.innerHeight - 50);
    $('.sidebar')[0].scrollTop = 0;
    if ($('.sidebar').hasClass('visible')) {
        setTimeout(function() {
            document.addEventListener('click', clickOff);
        }, 1);
    }
}

function clickOff(e) {
    document.removeEventListener('click', clickOff);
    if ($(e.target).closest('.sidebar').length === 0 && $(e.target).closest('.sidebar-btn').length === 0) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileSidebar();
    }
}

var timer;
function toast(msg) {
    msg = msg || 'Saved.';
    clearTimeout(timer);
    var $el = $('#message');
    $el.hide().html(msg).show();
    timer = setTimeout(function() {
        $el.hide();
    }, 2000);
}

})();