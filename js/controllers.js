angular.module('mcControllers', [])

.controller('MetaSearchCtrl',[

	'$scope',
	'$http',

	function($scope, $http){
		$scope.data 	= undefined
		$scope.search 	= ''


		$scope.getData = function(search){
			$scope.data = undefined

			search = search.replace(/[^a-zA-Z0-9 ]/g, " ")

			if(search.length <=3) return null

			var long_search = (" "+search).replace(/\s+/g,"&title*icontains=")

			$http.get('http://django.dsini20.schedar.uberspace.de/api/search/project?format=json'+long_search)
			.then(
				function(result){
					$scope.data = result.data
				},
				function(error){
					$scope.data = undefined
				}
			)
		}

		$scope.$watch('search', $scope.getData)
	}
])