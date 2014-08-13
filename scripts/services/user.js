app.service('userService', ['$q', 'fetch', 'appCache', 'locationService', function($q, fetch, appCache, locationService) {

		var obj = {};

		obj.currentUser = {
			logged: false,
			id: '',
			firstname: '',
			lastname: '',
			email: '',
			username: '',
			lastlogin: '',
			createdate: ''
		};

		obj.setUser = function(userData) {
			this.currentUser.logged = true;
			this.currentUser.id = userData.id;
			this.currentUser.firstname = userData.firstname;
			this.currentUser.lastname = userData.lastname;
			this.currentUser.email = userData.email;
			this.currentUser.username = userData.username;
			this.currentUser.lastlogin = userData.last_login;
			this.currentUser.createdate = userData.create_date;
		};

		obj.loginUser = function(user) {
			var self = this;

			var deferred = $q.defer();
			var process = function(d) {
				if (d.data.code === 3) {
					/* init the current user */
					self.setUser(d.data.data);
					locationService.redirect("/");
				} else {
					deferred.resolve(d.data);
				}

			};

			fetch.login(user).then(function(res) {
				process(res);

			});

			return deferred.promise;


			var promise = fetch.login(user);
			promise.then(function(d) {
				if (d.data.code === 3) {
					/* init the current user */
					self.setUser(d.data.data);
					locationService.redirect("/");
				} else {
					console.log(d.data);
					return promise;
				}
			});
		};

		obj.logout = function() {
			/**
			 * send request to server to destroy session...
			 * and then redirect to login page...
			 */
			var promise = fetch.logout();
			promise.then(function(response) {
				locationService.redirect("/");
			});

			this.currentUser.logged = false;
			this.currentUser.firstname = '';
			this.currentUser.lastname = '';
			this.currentUser.email = '';
			this.currentUser.username = '';
			this.currentUser.lastlogin = '';
			this.currentUser.createdate = '';
		};

		obj.authUser = function() {
			var self = this;

			var deferred = $q.defer();
			var successCb = function(d) {

				if (!jQuery.isEmptyObject(d.data.data)) {
//					console.log(d.data.data)
					self.setUser(d.data.data)
				} else {
					console.log('nothing to fetch...')
				}
				deferred.resolve(d);
			};

			fetch.auth().then(function(res) {
				successCb(res);

			});
			return deferred.promise;

		};

		obj.updateUser = function(user) {
			var self = this;

			var d = $q.defer();
			var result = fetch.updateUsr(user).then(function(rez) {
				d.resolve(rez);
			});
			return d.promise;

		}

		return obj;
	}]);