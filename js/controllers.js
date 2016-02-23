angular.module('mcControllers', [])

.controller('MetaSearchCtrl',[

	'$scope',
	'$http',

	function($scope, $http){
		$http.get('http://metacollect.de/api/search/project?title*icontains=refugeelll')
		.then(function(result){
			console.dir(result.data)
		})
	}
])