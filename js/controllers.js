angular.module('mcControllers', [])

.controller('MetaSearchCtrl',[

	'$scope',
	'$http',

	function($scope, $http){
		$http.get('http://django.dsini20.schedar.uberspace.de/api/search/project?title*icontains=refugee&format=json')
		.then(
			function(result){
				console.dir(result.data)
			},
			function(error){
				console.log(error)
			}
		)
	}
])