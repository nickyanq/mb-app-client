app.directive('menu', ['sliderMenuService', function(sliderMenuService) {
        return {
            restrict: 'E',
            templateUrl: 'templates/submenu.html',
            scope: {categories: "="},
            link: function(scope, element, attrs) {

                scope.name = 'something';
                scope.slider = sliderMenuService;
            }

        };
    }]);

app.directive('flipper', [function() {
        return {
//            restrict: 'E',
//            templateUrl: 'templates/submenu.html',
//            scope: {categories: "="},
            link: function(scope, element) {
                console.log(element);
                element.bind('click', function() {
                    element[0].classList.toggle('flipped');
                });

//				$(this).removeClass('flipped');
//			});

//				element[0].bind('click',function(){
//					console.log('clicked');
//				});

            }

        };
    }]);


app.directive('accountPanel', ['sliderMenuService', 'locationService', 'userService', 'configFactory', function(sliderMenuService, locationService, userService, configFactory) {
        return {
            restrict: 'E',
            scope: {categories: '=categories'},
            templateUrl: 'templates/account-panel.html',
            link: function(scope, element, attrs) {

                scope.loggedCategories = configFactory.getLoggedCategories();

                scope.locationService = locationService;

                scope.userService = userService;

                scope.slider = sliderMenuService;
            }
        };
    }]);


app.directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            var INTEGER_REGEXP = /^\-?\d+$/;
            ctrl.$parsers.unshift(function(viewValue) {
                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});
app.directive('strings', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            ctrl.$parsers.unshift(function(viewValue) {
                var clean = viewValue.replace(/[^a-z,^A-Z]+/g, '');
                if (viewValue !== clean) {
                    ctrl.$setValidity('strings', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('strings', true);
                    return viewValue;
                }

            });
        }
    };
});


app.directive('condition', ['sliderMenuService', '$timeout', function(sliderMenuService, $timeout) {
        return {
            restrict: "A",
            templateUrl: 'templates/noteTemplate.html',
            scope: {item: '=info'},
            link: function(scope, element, attrs) {

                if (scope.item.transition == true) {
                    element[0].parentElement.style.display = 'none';
                    $timeout(function() {
                        $('#' + scope.item.id).slideDown('slow');
                    }, 100);


                }
            }

        };
    }]);
