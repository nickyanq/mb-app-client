'use strict';
app.factory('sliderMenuService',
        ['$location', '$timeout',
            function($location, $timeout) {
                var obj = {};

                obj.display = function() {
                    this.status = true;

                };

                obj.hide = function() {
                    this.status = false;


                };

                obj.switch = function(panel) {
                    var that = this;
                    switch (panel) {
                        case 1 :
                            {
                                if (that.panels.panel1 === true) {
                                    $('.toggle-menu-container').css({'width': '0%'});
                                    that.panels.panel1 = false;
                                } else {
                                    $('.toggle-menu-container').css({'width': '80%'});
                                    that.panels.panel1 = true;
                                }
                            }
                            break;
                        case 2 :
                            {
                                var $screen = $('.main-screen');
                                if (that.panels.panel2 === true) {
                                    //hide it
                                    $screen.css({'margin-left': '0%'});
                                    that.panels.panel2 = false;
                                } else {
                                    //show it
                                    $screen.css({'margin-left': '-80%'});
                                    that.panels.panel2 = true;
                                }
                            }
                            break;
                        default :
                            {
                            }
                            break;
                    }

                };

                obj.resetPanels = function() {
					
					$('#right-panel').panel('close');
					$('#left-panel').panel('close');
					
                    this.panels.panel1 = true;
                    this.panels.panel2 = true;
                    this.switch(1);
                    this.switch(2);
                }

                obj.panels = {
                    panel1: false,
                    panel2: false
                };
                obj.status = false;
                return obj;
            }]
        );

app.service('locationService', ['$location', 'sliderMenuService', function($location, sliderMenuService) {
        var obj = {};

        obj.redirect = function(link) {
            sliderMenuService.resetPanels();
            $location.path(link);

        };

        return obj;

    }]);

/**
 *
 *		AppCache service handles the browser local storage.
 *
 *	- put : assigns a key to an object and adds it in the storage in JSON format.
 *	- get : gets an object from the local storage by key.
 *
 */
app.factory('appCache',
        [
            function() {
                var obj = {};

                obj.put = function(key, obj) {
                    if (!window.localStorage.getItem('appCache')) {
                        window.localStorage.setItem('appCache', '');
                    }
                    var o = {};
                    o[key] = obj;
                    window.localStorage.setItem('appCache', JSON.stringify(o));
                };
                obj.get = function(key) {
                    if (window.localStorage.getItem('appCache')) {
                        if (JSON.parse(window.localStorage.getItem('appCache')).hasOwnProperty(key)) {
                            return JSON.parse(window.localStorage.getItem('appCache'))[key];
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                };
                
                obj.destroyCache = function(){
                    window.localStorage.clear();
                };

                return obj;
            }]
        );