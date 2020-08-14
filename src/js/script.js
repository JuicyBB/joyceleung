$(function () {
	AOS.init({
		// Global settings:
		disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
		startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
		initClassName: 'aos-init', // class applied after initialization
		animatedClassName: 'aos-animate', // class applied on animation
		useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
		disableMutationObserver: false, // disables automatic mutations' detections (advanced)
		debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
		throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
		
		// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
		offset: 120, // offset (in px) from the original trigger point
		delay: 0, // values from 0 to 3000, with step 50ms
		duration: 400, // values from 0 to 3000, with step 50ms
		easing: 'ease-in', // default easing for AOS animations
		once: true, // whether animation should happen only once - while scrolling down
		mirror: false, // whether elements should animate out while scrolling past them
		anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
	});
});

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
		$('html, body').animate(
			{
				scrollTop: $($.attr(this, 'href')).offset().top - offset_value,
			},
			520,
		);
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
