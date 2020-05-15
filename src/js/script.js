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


//   // Init offcanvas menu
//   $(".button-collapse").sideNav({
//     closeOnClick: true
//   });

//   //Init scrollspy
//   $('body').scrollspy({
//     target: '#nav',
//     offset: 61
//   });

//   $("[data-featherlight='image']").featherlight({
//     closeOnClick: 'anywhere',
//     closeIcon: ''
//   });

//   // Navigation scroll style change
//   $(function() {
//     var header = $('#nav');
//     var lastScrollTop = 0;
//     function scrollHandler() {
//       var scroll = $(window).scrollTop();
//       if (scroll >= 100) {
//         header.removeClass('nav-transparent');
//       }
//       else {
//         header.addClass('nav-transparent');
//       }
//     }
//     $(window).scroll(scrollHandler);
//     scrollHandler();
//   });

//   // Smooth scrolling for anchored links
//   $(function () {
//     $('a[href*=#]:not([href=#])').click(function (event) {
//       event.preventDefault();
//       var $root = $('html, body');
//       var offset_value = 59; //already set in scroll spy
//       if ($(document).width() < 768) {
//         offset_value = 50;
//       }
//       $root.animate({
//         scrollTop: $( $.attr(this, 'href') ).offset().top - offset_value
//       }, 500);
//     });
//   });

//   // Tumblr blog feed
//   window.onload=function(){
//     for (var i=0;i<4;i++) {
//       var thisPost = tumblr_api_read.posts[i];
//       // var _date = thisPost.date;
//       // var dateArray = _date.split(' ');
//       // var month = dateArray[2];
//       // var day = dateArray[1];
//       if(thisPost.type=="photo"){
//         $('#tumblr_feed').append("<div class=\"col m3 s6\"><div class=\"card hoverable\"><div class=\"card-image\"><img src=\"" + thisPost["photo-url-500"] + "\"/></div><div class=\"card-action\"><a href=\"" + thisPost.url + "\" target=\"_blank\" class=\"tumblr-feed-link\">View Post</a></div></div></div>");
//       }
//     }
//   }

// });
