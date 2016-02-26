$( function() {
	var $panzoom = $('.viewer_image');
	var $panzoomButtons = $('.viewer_controls');
	$panzoom.panzoom({
		$zoomIn: $panzoomButtons.find(".js-zoom-in"),
		$zoomOut: $panzoomButtons.find(".js-zoom-out"),
		$zoomRange: $panzoomButtons.find(".js-zoom-range"),
		$reset: $panzoomButtons.find(".js-zoom-reset")
	});
	$panzoom.parent().on('mousewheel.focal', function(e) {
		e.preventDefault();
		var delta = e.delta || e.originalEvent.wheelDelta;
		var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
		$panzoom.panzoom('zoom', zoomOut, {
			increment: 0.1,
			focal: e
		});
	});

	function requestFullscreen(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	}
	function exitFullscreen() {
		if(document.exitFullscreen) {
			document.exitFullscreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
	$('.js-fullscreen').click( function() {
		$(this).toggleClass('-active');
		var viewer = document.getElementById('main');
		if ( document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ) {
			exitFullscreen();
		} else {
			requestFullscreen(viewer);
		}
	});

	$('.js-page-view').change( function() {
		$('.viewer_image').toggleClass('-double', $(this).val() === 'double');
		$('.single-page').toggle($(this).val() === 'single');
		$('.double-page').toggle($(this).val() === 'double');
	});

	$('.js-search-toggle').click( function() {
		$('.search').fadeIn();
		setTimeout( function() {
			$('.search_input:visible').focus();
		}, 10);
		return false;
	});

	$('.site.-fixed, .search_close').click( function() {
		$('.search').fadeOut();
	});

	$('.js-toggle-panel').click( function() {
		$(this).toggleClass('-active');
		var $panel = $('.viewer_panel.-' + $(this).data('target'));
		$panel.toggleClass('-hidden');
	});

	$('.js-horizontal-scroll').mousewheel( function(evebt, delta) {
		this.scrollLeft -= (delta * 30);
		event.preventDefault();
	});
});
