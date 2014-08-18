app.factory('configFactory',
        [function() {
                var obj = {};
                obj.getLoggedCategories = function() {
                    return [
                        {id: 1, name: 'Profile', iconClass: 'fa-star', link: '/profile'},
                        {id: 2, name: 'Submit FDL', iconClass: 'fa-star', link: '/add-fdl'},
                        {id: 3, name: 'My Fdls', iconClass: 'fa-star', link: '/profile'},
                        {id: 4, name: 'Archive', iconClass: 'fa-star', link: '/profile'},
                        {id: 5, name: 'Messages', iconClass: 'fa-star', link: '/profile'},
                        {id: 6, name: 'Logout', iconClass: 'fa-cube', link: '/logout'}
                    ];
                };

                return obj;
            }]
        );