'use strict';

app.controller('homeController', ['$scope', 'userService', 'locationService', 'fetch', function($scope, userService, locationService, fetch) {
        $scope.locationService = locationService;

//		

        var pull = function() {
            fetch.pullFdls().then(function(d) {
                if(d.data.code !== 0){
                    processFdls(d.data.fdls);
                } else {
                    console.log('am prins cazul false');
                }
                pull();
            });
        };
        pull();

        var processFdls = function(d) {
			if(d != undefined) ;
            for (var i = 0; i < d.length; i++) {
                d[i].upVotes = 0;
                d[i].downVotes = 0;
                for (var j = 0; j < d[i].votes.length; j++) {
                    if (d[i].votes[j].type === 1 && d[i].votes[j].status == true) {
                        d[i].upVotes++;
                        if (d[i].votes[j].user_id == userService.currentUser.id) {
                            d[i].upVoted = true;
                        }
                    }
                    if (d[i].votes[j].type === 2 && d[i].votes[j].status == true) {
                        d[i].downVotes++;
                        if (d[i].votes[j].user_id == userService.currentUser.id) {
                            d[i].downVoted = true;
                        }
                    }
                }
            }
            $scope.dataFeed = d;
        };

        fetch.getAll().then(function(d) {
//            if (userService.currentUser.logged === true) {
                processFdls(d.data);
//            }

        });

        $scope.vote = function(type, fdl_id, index) {
            /**
             * Must check if the user is logged.
             */
            if (userService.currentUser.logged === false) {
                console.log('You must be logged to vote.');
                return;
            }
            var found = false;
            for (var i = 0; i < $scope.dataFeed[index].votes.length; i++) {
                if ($scope.dataFeed[index].votes[i].user_id === userService.currentUser.id && $scope.dataFeed[index].votes[i].type === type) {
                    found = true;
                    console.log('l-am gasit');
                    console.log($scope.dataFeed[index]);
                    if ($scope.dataFeed[index].votes[i].status === true) {
                        console.log('are statusul true');
                        if (type == 1) {
                            $scope.dataFeed[index].upVoted = false;
                            $scope.dataFeed[index].upVotes--;
                        } else {
                            $scope.dataFeed[index].downVoted = false;
                            $scope.dataFeed[index].downVotes--;
                        }
                        $scope.dataFeed[index].votes[i].status = false;
                    } else {
                        console.log('dar nu are statusul true');

                        if (type == 1) {
                            $scope.dataFeed[index].upVoted = true;
                            $scope.dataFeed[index].upVotes++;
                        } else {
                            $scope.dataFeed[index].downVoted = true;
                            $scope.dataFeed[index].downVotes++;
                        }
                        $scope.dataFeed[index].votes[i].status = true;
                    }
                }
            }
            ;

            if (!found) {
                if (type == 1) {
                    $scope.dataFeed[index].upVoted = true;
                    $scope.dataFeed[index].upVotes++;
                } else {
                    $scope.dataFeed[index].downVoted = true;
                    $scope.dataFeed[index].downVotes++;
                }
                var vote = {
                    created_date: '',
                    fdl_id: fdl_id,
                    id: null,
                    status: true,
                    type: type,
                    user: userService.currentUser,
                    user_id: userService.currentUser.id
                };
                console.log('am bagat un vote');
                $scope.dataFeed[index].votes.push(vote);
                console.log($scope.dataFeed[index].votes);

            }

            var data = {
                type: type,
                user_id: userService.currentUser.id,
                fdl_id: fdl_id
            };

            fetch.voteFdl(data).then(function(d) {
                console.log(d);
            });

        };

        $scope.downVote = function() {
        };


    }]);
app.controller('toggleMenuController', ['$scope', function($scope) {
        $scope.categories = [
            {id: 1, name: 'Popular', iconClass: 'fa-star'},
            {id: 2, name: 'Featured', iconClass: 'fa-cube'},
            {id: 2, name: 'Electronics', iconClass: 'fa-tablet'},
            {id: 2, name: 'Fashion', iconClass: 'fa-glass'},
            {id: 2, name: 'Colectables', iconClass: 'fa-steam'},
            {id: 2, name: 'Home & Garden', iconClass: 'fa-globe'},
            {id: 2, name: 'Sporting Goods', iconClass: 'fa-globe'},
            {id: 2, name: 'Motors', iconClass: 'fa-globe'},
            {id: 2, name: 'Daily Deals', iconClass: 'fa-globe'}
        ];
        $scope.accountCategories = [
            {id: 1, name: 'Login', iconClass: 'fa-star', link: '/login'},
            {id: 2, name: 'Register', iconClass: 'fa-cube', link: '/register'}
        ];

        $scope.loggedCategories =
                $scope.obj = {prop: "world"};

    }]);

app.controller('loginController', ['$scope', 'fetch', 'userService', function($scope, fetch, userService) {
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.login = function() {
            $scope.logMessage = userService.loginUser($scope.user);
        };

    }]);
app.controller('logoutController', ['$scope', 'fetch', 'userService', function($scope, fetch, userService) {

        console.log('must do the logout here...');

    }]);
app.controller('registerController', ['$scope', 'fetch', 'locationService', '$timeout',
    function($scope, fetch, locationService, $timeout) {

        $scope.user = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
        };
        $scope.register = function() {
            fetch.register($scope.user).then(function(d) {
                /* If receives a en error message display it */
                /* But if there is a success, redirect him to login, */
                /* after you promt him with a message */
                switch (d.data.code) {
                    case 1 :
                        {
                            console.log('You will be redirected soon...');
                            $timeout(function() {
                                locationService.redirect('/login');
                            }, 2000);
                        }
                        break;

                    default :
                        {
                            console.log('Registration failed with no reason');
                        }
                        break;
                }

                if (d.data.code === 1) {
                    /* turn message to true */

                } else {

                }

            });
        };
    }]);


app.controller('profileController', ['$scope', 'userService', '$timeout', function($scope, userService, $timeout) {
//        console.log(userService.currentUser);
        $scope.userService = userService;
        $scope.successUpdate = false;
        $scope.saveProfile = function() {
            var response = userService.updateUser($scope.userService);
            response.then(function(d) {
                console.log(d.data);
                if (d.data.code === 1) {
                    $scope.successUpdate = true;
                    $timeout(function() {
                        $scope.successUpdate = false;
                    }, 3000);
                }

            });
//                console.log($scope.userService);
        };
    }]);

app.controller('fdlController', ['$scope', 'fetch', 'userService', '$timeout', function($scope, fetch, userService, $timeout) {

        fetch.getAllCategories().then(function(d) {
            $scope.categories = d.data;
        });

        $scope.fdl = {
            title: '',
            content: '',
            category: '',
            user_id: userService.currentUser.id
        };
        $scope.successfullyAdded = false;
        $scope.submit = function() {
            console.log($scope.fdl);

            fetch.addFdl($scope.fdl).then(function(d) {
                console.log(d);
                if (d.data.code === 1) {
                    $scope.successfullyAdded = true;
                    $timeout(function() {
                        $scope.successfullyAdded = false;
                        $scope.fdl.title = '';
                        $scope.fdl.content = '';
                        $scope.fdl.category = '';
                    }, 5000);
                }
            });
        };

    }]);


app.controller('topMenuController', ['$scope', 'sliderMenuService', 'locationService', function($scope, sliderMenuService, locationService) {
        $scope.locationService = locationService;
        $scope.slider = sliderMenuService;
    }]);


app.controller('notFoundController', ['$scope', function($scope) {

    }]);

