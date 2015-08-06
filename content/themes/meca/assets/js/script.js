var calcImages, sticky, reSticky, resizeImages;
(function( $ ) {
$( window ).load(function() {

			/*
			Search Plugin
			----------------------------------*/
			$("#search-field").ghostHunter({
			  results   : "#results",
			  before          : function(){
			  },
			  onComplete      : function( results ){
			  	$(".ql_featured_posts").remove();
			  	var search_value = $("#search-field").val();
			  	var search_result = '';

			  	switch (results.length) {
				    case 0:
				        search_result = 'No posts found';
				    case 1:
				        search_result = results.length + ' post';
				    default:				    
				        search_result = results.length + ' posts';
			  	};
			  	var search_header = '<h5><span>Search</span> "'+ search_value + '" - ' + search_result + '</h5>';
			  		$(".nav_sidebar .ql_search_results").html(search_header);

			  		var search_posts = '';
			  		$(results).each(function(index, el) {
			  			var search_post = '<div class="ql_search_post"><h6><a href="'+ el.link +'">'+ el.title +'</a></h6><time>'+ el.pubDate.substring(0, el.pubDate.length - 12) +'</time></div>';
			  			search_posts = search_posts + search_post;
			  		});

			  		$(search_posts).appendTo('.nav_sidebar .ql_search_results');
			        //console.log( results );			        
			    }
			});


			/*
			Disqus
			----------------------------------*/
			if ($("body").hasClass('post-template')) {
				//console.log(disqus_identifier);
				
				setTimeout(function(){ 
					var url_location = self.location.href;
					if(url_location.indexOf("#disqus_thread") > -1){
						scrollToElement("#disqus_thread");	
					}
					
					(function() {
				        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
				        calcImages(reSticky);
				    })(); 
				}, 3000);

			};
			
			

			/*
			Sticky Functions
			----------------------------------*/
			resizeImages = function(){
				$(".post_image").height($(window).height());
				$(".post_image_wrap").each(function(index, el) {
					var current_id = $(this).attr('id');
					var current_post_id = current_id.replace("_image", "");
						
					//remove post inline style
					$("#" + current_post_id).removeAttr("style");

					if ($("#" + current_post_id).height() < $(window).height()) {
						$("#" + current_post_id).outerHeight($(window).height());
					};

					$(this).height($("#" + current_post_id).outerHeight());
				});
			}
			sticky = function(){
			    $(".post_image").stick_in_parent({
			    	parent: ".post_image_wrap"
			    });
			}

			reSticky = function(){
			    $(".post_image").stick_in_parent({
			    	recalc_every: 1, 
			    	parent: ".post_image_wrap"
			    });
			}

			calcImages = function(callback){
				resizeImages()
			    callback();
			}//ql_animateMainPost

			calcImages(sticky);

			$( window ).resize(function() {
			  calcImages(reSticky);
			});


			/*
			Time to read
			----------------------------------*/
			$(".content_sidebar .post").each(function(index, el) {
				var current_id = $(this).attr('id');
				var current_post_id = current_id.replace("-", "_image-");

				$(this).readingTime({
		            readingTimeTarget: $("#" + current_post_id).find('.time_read span')
		        });
			});

		

			/*
			Nav Sidebar Scroll
			----------------------------------*/
			$(".nav_sidebar_wrap").niceScroll({
				touchbehavior: true,
				cursoropacitymax: 0.2,
				bouncescroll: true,
				cursorcolor:"#fff",
				railpadding: {top:0,right:4,left:0,bottom:0},
				bouncescroll: true,
				grabcursorenabled: false,
				nativeparentscrolling: false,
				horizrailenabled: false
			});



			$(".ql_nav_btn, .ql_nav_close").on('click', function(event){
				$(".nav_sidebar, .ql_nav_btn").toggleClass('open');
				$("html").toggleClass('menu_open');
				return false;
			});


			$('#nav .dropdown').hover(function() {
				$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideDown();
				}, function() {
				$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
			});



									

});//on ready
})( jQuery );
//Debounce Function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
function scrollToElement(selector, time, verticalOffset) {
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = jQuery(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    jQuery('html, body').animate({
        scrollTop: offsetTop
    }, time);
}