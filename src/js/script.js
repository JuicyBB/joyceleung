$(function () {
	var menu = $('#menu'),
		toggle = $('#menu-toggle, #menu-link-list a'),
		toggleBtn = $('#menu-toggle'),
		body = $('body');

	toggle.click(function () {
		if (body.hasClass('menu-open')) {
			menu.removeClass('active');
			toggleBtn.removeClass('active');
			body.removeClass('menu-open');
		} else {
			menu.addClass('active');
			toggleBtn.addClass('active');
			body.addClass('menu-open');
		}
	});
});

$(function () {
	const $desktop = '(min-width: 1080px)';
	const mq = window.matchMedia($desktop);

	if (mq.matches) {
		console.log('match')
		// Cache selectors
		var lastId,
			outlineImage = $('#service-image img'),
			topMenu = $('#service-list'),
			menuItems = topMenu.find('a'),
			// Anchors corresponding to menu items
			scrollItems = menuItems.map(function () {
				var item = $($(this).attr('href'));
				if (item.length) {
					return item;
				}
			});

		// Bind to scroll
		$(window).scroll(function () {
			// Get container scroll position
			var fromTop = $(this).scrollTop();
			// Get id of current scroll item
			var cur = scrollItems.map(function () {
				if ($(this).offset().top < fromTop + 200) return this;
			});
			// Get the id of the current element
			cur = cur[cur.length - 1];
			var id = cur && cur.length ? cur[0].id : 'service-web';
			if (lastId !== id) {
				lastId = id;
				// Set/remove active class
				menuItems
					.removeClass('active')
					.end()
					.find("[href='\\#" + id + "']")
					.addClass('active');
				outlineImage.attr('src', 'img/svg/' + id + '.svg');
			}
		});
	}
});

$(function () {
	var titleEl = $('.modal-title'),
		imgEl = $('.modal-image'),
		descEl = $('.modal-description'),
		modalEl = $('.modal');

	MicroModal.init({
		// onShow: (modal) => console.info(`${modal.id} is shown`),
		// onClose: (modal) => console.info(`${modal.id} is hidden`),
		// debugMode: true,
		awaitCloseAnimation: true,
	});

	$('a[data-micromodal-trigger="modal"]').click(function (e) {
		e.preventDefault();

		var target = e.currentTarget,
			title = $(target).find('.graphic-title').text(),
			imgSrc = $(target).attr('href'),
			desc = $(target).find('.graphic-desc').text(),
			id = title.toLowerCase().replace(/ /g, '-');

		titleEl.text(title);
		imgEl.html('<img src="' + imgSrc + '" alt="' + title + '"/>');
		modalEl.attr('id', id);
		descEl.text(desc);
	});
});

// Smooth scrolling for anchored links
$(function () {
	var smoothLinks = $('a[href*=\\#]:not([href=\\#])');
	smoothLinks.click(function (event) {
		event.preventDefault();
		var offset_value = 0;
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top - offset_value
		}, 520);
	});
});

// $( document ).ready(function(){

//   //Init wow JS
//   var wow = new WOW({
//     offset: 100,
//     mobile: false
//   });

//   var progress = 0;
//   var timer = setInterval(function() {
//     if(progress > 90) {
//       wow.init();
//       clearInterval(timer);
//     }
//   },500);

//   // Preloader
//   $("body").queryLoader2({
//     backgroundColor: "#cc1235",
//     barColor: "#fff",
//     barHeight: 5,
//     percentage: true,
//     completeAnimation: "fade",
//     fadeOutTime: 2000,
//     onProgress: function(e) {
//       progress = e;
//     }
//   });

//   //wow.init();



// });
