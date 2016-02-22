metaCollect 	= 	angular.module(
						'metaCollect',
						[
							'ngRoute',
							'angularSmoothscroll',
							'monospaced.elastic'
						]
					)



metaCollect.config([

	'$routeProvider',
	'$locationProvider',

	function($routeProvider, $locationProvider) {

		$routeProvider
		.when(
			'/home',
			{
				templateUrl :   'pages/home.html',
				reloadOnSearch: false
			}
		)
		.otherwise({
			redirectTo:     'home'
		})




		// use the HTML5 History API
		$locationProvider.html5Mode({
			enabaled: 		true,
			requireBase:	false 
		})

	}
])



metaCollect.run([

	'$document',

	function($document){

		var body = $document.find('body')

		$document.on('scroll', function(){
			var padding_top	= parseInt(getComputedStyle(body[0]).getPropertyValue('padding-top'))

			body.toggleClass('slim', padding_top + document.body.getBoundingClientRect().top < 0)
		})
	}
])		



