angular.module('mcControllers', [])

.controller('MetaSearchCtrl',[

	'$scope',
	'$http',

	function($scope, $http){
		$scope.data 	= undefined
		$scope.search 	= ''


		$scope.getData = function(){

			var search = $scope.search.replace(/[^a-zA-Z0-9 ]/g, " ")

			$scope.data = true

			var long_search = (" "+search).replace(/\s+/g,"&title*icontains=")

			$http.get('http://django.dsini20.schedar.uberspace.de/api/search/project?format=json'+long_search)
			.then(
				function(result){
					$scope.data = result.data
				},
				function(error){
					$scope.data = []
				}
			)
		}
	}
])