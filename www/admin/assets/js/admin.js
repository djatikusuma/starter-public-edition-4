
$(function () {

    // A workaround about dropdown initialization.
    // See https://github.com/Semantic-Org/Semantic-UI/issues/2072
    // "[Dropdown] Add Nullable Option for Single Selection"

    $('.ui.dropdown:not(.native):not(.special)[multiple]').dropdown();
    $('.ui.dropdown:not(.native):not(.special):not([multiple]):not(.nullable)').dropdown();
    $('.ui.dropdown:not(.native):not(.special):not([multiple]).nullable').dropdown({
        onChange: function(value) {

            var target = $(this);
            var wrapper = target.prop('tagName') == 'SELECT' ? target.parent() : target;

            if (value) {

                var icon = wrapper.find('.dropdown.icon');

                icon.removeClass('dropdown').addClass('delete').on('click', function(e) {

                    target.dropdown('clear');
                    $(this).removeClass('delete').addClass('dropdown');

                    e.preventDefault();
                    return false;
                });
            }
        },
        fireOnInit: true
    });

    $('body').on('click', '.message .close', function() {

        $(this)
          .closest('.message')
          .transition('fade')
        ;
    });

    $('.ui.accordion')
      .accordion()
    ;

    $('.popover').popup({ 'on': Modernizr.touch ? 'click' : 'hover' });

    $('#sidebar_toggle').on('click', function() {

        $('#sidebar').transition({
            animation: 'slide right',
            onComplete : function() {

                $.ajax({
                    type: 'post',
                    mode: 'queue',
                    url: SITE_URL + 'side-menu-widget/toggle-ajax',
                    data: {
                        state: $('#sidebar').hasClass('hidden') ? 'hidden' : 'visible'
                    },
                    success: function(data) {

                    }
                });
            }
        });

    });
});


$.keepalive.configure( {
    interval : 1000 * 60 * 10,  // Ping every 10 minutes for keeping the PHP session alive.
    url: SITE_URL + 'keep-alive/ping',
    successCallback : function() {},
    errorCallback : function() {}
});


/*
 * See http://appglobe.com/scroll-to-top-animation/
 */

(function($) {

    addScrollTopAnimation();

    function addScrollTopAnimation() {

        var $scrolltop_link = $('.ui.button.scroll.top');

        $scrolltop_link.on( 'click' ,  function ( ev ) {

            ev.preventDefault();

            $( 'html, body' ).animate( {

                scrollTop: 0

            }, 700 );

        })

        // Hides the link initially
        .data('hidden', 1).hide(); 

        var scroll_event_fired = false;

        $(window).on('scroll', function() {

            scroll_event_fired = true;

        });

        /* 
        Checks every 300 ms if a scroll event has been fired.
        */
        setInterval( function() {

            if( scroll_event_fired ) {

                /* 
                Stop code below from being executed until the next scroll event. 
                */
                scroll_event_fired = false; 

                var is_hidden =  $scrolltop_link.data('hidden'); 

                /* 
                Display the scroll top link when the page is scrolled 
                down the height of half a viewport from top,  Hide it otherwise. 
                */
                if ( $( this ).scrollTop()  >  $( this ).height() / 2 ) {

                    if( is_hidden ) {

                        $scrolltop_link.fadeIn(600).data('hidden', 0);

                    }
                }

                else {

                    if( !is_hidden ) {

                        $scrolltop_link.fadeOut(600).data('hidden', 1);

                    }
                }

            }

        }, 300); 

    }

})(jQuery);


// https://github.com/danbeam/ellipsis/

function ellipsize() {
    $('.ellipsis').ellipsis();
    $('.ellipsis-1').ellipsis({'lines': 1});
    $('.ellipsis-2').ellipsis({'lines': 2});
    $('.ellipsis-3').ellipsis({'lines': 3});
    $('.ellipsis-4').ellipsis({'lines': 4});
    $('.ellipsis-5').ellipsis({'lines': 5});
    $('.ellipsis-6').ellipsis({'lines': 6});
    $('.ellipsis-7').ellipsis({'lines': 7});
    $('.ellipsis-8').ellipsis({'lines': 8});
    $('.ellipsis-9').ellipsis({'lines': 9});
    $('.ellipsis-10').ellipsis({'lines': 10});
}

$(ellipsize);  // when document is ready
$(window).on('resize', ellipsize);  // on resize
