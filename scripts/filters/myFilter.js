/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.filter('datefilter', function() {
	return function(input) {
		var d = new Date(input);
		return (d.format('dd/mm/yyyy H:M'));
		return input;
	};
});