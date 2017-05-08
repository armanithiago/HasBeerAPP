angular.module('services', [])
.factory('pubService', pubServices)
;

function pubServices($http){
	var _pub = {};

	_pub.list = param => {
		return new Promise((resolve, reject) => {
			
		});
	};

	return _pub;
};