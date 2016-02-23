metaCollect 	= 	angular.module(
						'metaCollect',
						[
							'ngRoute',
							'angularSmoothscroll',
							'monospaced.elastic',
							'pascalprecht.translate'
						]
					)



metaCollect.config([

	'$routeProvider',
	'$locationProvider',
	'$translateProvider',

	function($routeProvider, $locationProvider, $translateProvider) {

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


		$translateProvider.useStaticFilesLoader({
			prefix: 'i18n/locale-',
			suffix: '.json'
		})

		$translateProvider.preferredLanguage('de')
		$translateProvider.useSanitizeValueStrategy(null)
	}
])



metaCollect.run([

	'$rootScope',
	'$document',
	'$window',
	'$timeout',
	'$translate',

	function($rootScope, $document, $window, $timeout, $translate){



		$rootScope.getLanguage = function(){
			return $translate.use()
		}

		$rootScope.toggleLanguage = function(){
			return	$translate.use() == 'en'
					?	$translate.use('de')
					:	$translate.use('en')	
		}


		//checking if page has scroll far enough to slim down the header:

		var body 	= $document.find('body'),
			header 	= $document.find('header'),
			html	= $document.find('html')

		$document.on('scroll', function(){
			window.requestAnimationFrame(function(){
				var padding_top	= parseInt(getComputedStyle(body[0]).getPropertyValue('padding-top'))

				header.toggleClass('slim', padding_top + document.body.getBoundingClientRect().top < 0)
			})
		})


		//check window width and switch layout:

		var threshold_px	= undefined 

		function adjustContentWidth(){		
			var width 			= document.body.getBoundingClientRect().width,
				rem				= parseInt(getComputedStyle(html[0]).getPropertyValue('font-size')),
				threshold_rem	= 60, // switch if content width < 60 rem,
				narrow_rem		= 30	

			threshold_px = threshold_px || threshold_rem * rem

			//if 60rem of default font-size won't fit on the screen
			// add class .narrow and set font-size on html,
			// so that the content's width is allways 30rem

			if(threshold_px > width){
				body.addClass('narrow')
				html.css('font-size', (width/narrow_rem) + 'px')
			} else {
				body.removeClass('narrow')
				html.css('font-size', 'inherit')
			}
		}
		
		adjustContentWidth()
		angular.element($window).on('resize', adjustContentWidth)

		$timeout(function(){
			adjustContentWidth()
		}, 500)
	}
])		



