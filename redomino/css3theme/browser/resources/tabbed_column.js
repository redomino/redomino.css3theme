(function ($){

    var manage_breadcrumbs = function (){
        // manage breadcrumbs
        var $breadcrumb_current = $('#breadcrumbs-current');
        var $portal_breadcrumbs = $('#portal-breadcrumbs');
        var $mobile_breadcrumbs = $('<div />', {id: 'mobile-breadcrumbs'}).insertAfter($portal_breadcrumbs);
        $mobile_breadcrumbs.append($portal_breadcrumbs.find('#breadcrumbs-you-are-here').text());
        if ($breadcrumb_current.length){

            var $mobile_breadcrumbs_select = $('<select />').appendTo($mobile_breadcrumbs);
            var $breadcrumbs = $('#portal-breadcrumbs').find('a').each(function (index){
                var $this = $(this);
                $mobile_breadcrumbs_select.append('<option>' + $this.text() + '</option>');
            });
            $mobile_breadcrumbs_select.change(function (evt){
                var n = $(this).find(':selected').index();
                var url = $breadcrumbs.eq(n).attr('href');
                if (url){
                    window.location = url;
                }
            });

            $mobile_breadcrumbs_select.append('<option selected="selected">' + $breadcrumb_current.text() + '</option>');
        }
        else{
            $mobile_breadcrumbs.append(' '+ $('#portal-breadcrumbs').find('a').text());
        }
    

    };

    var manage_columns = function (){
        var $portal_columns = $('#portal-columns');
        var $columns = $portal_columns.children();

        if ($columns.length < 2){
            return;
        }

        var $mobile_tabs = $('<ul />', {id : 'mobile_tabs'}).insertBefore($portal_columns);
        $mobile_tabs.addClass('row');

        $('<li class="tab-portal-column-content current"><a href="#"></a></li>')
        .appendTo($mobile_tabs)
        .click(function (){
            $(this).addClass('current').siblings().removeClass('current');

            $('#portal-column-content').show();
            $('#portal-column-one').hide();
            $('#portal-column-two').hide();
            return false;
        });

        $('<li class="tab-portal-columns-columns"><a href="#"></a></li>')
        .appendTo($mobile_tabs)
        .click(function (){
            $(this).addClass('current').siblings().removeClass('current');

            $('#portal-column-content').hide();
            $('#portal-column-one').show();
            $('#portal-column-two').show();
            return false;
        });

        var restore_tabs = function (){
            $mobile_tabs.find('li.current').click();
        };

        var remove_tabs = function (){
            $columns.show();
        };

        var manage_resize = function (){
            
            if (! $mobile_tabs.is(':visible')){
                remove_tabs();
            }
            else{
                restore_tabs();
            }
        };

        $(window).resize(manage_resize);
        manage_resize();

    };

    var max_global_nav = 6;
    var manage_globalnav = function (){
        var $portal_globalnav = $('#portal-globalnav'),
            $globalnavlinks = $portal_globalnav.children('li');
        if ($globalnavlinks.length < max_global_nav){
            $portal_globalnav.addClass('showMobile');
            return;
        }
//        $portal_globalnav.addClass('hide_in_mobile');
        var $mobile_globalnav = $('<div />', {id: 'mobile-globalnav'}).insertAfter($portal_globalnav);
        var $select = $('<select />').appendTo($mobile_globalnav);
        $globalnavlinks.each(function (){
            var $this = $(this);
            var selected = $this.is('.selected') && 'selected=selected' || ' ';
            $select.append('<option ' + selected + '>' + $this.text() + '</option>');
        });
        $select.change(function (){
            var n = $(this).find(':selected').index();
            var url = $globalnavlinks.eq(n).find('a').attr('href');
            if (url){
                window.location = url;
            }
            return false;
        });
    };


    $(document).ready(function (){
        manage_columns();
//        manage_breadcrumbs();
        manage_globalnav();

//        $('table').mobiletable();

    });

}(jQuery));


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_\d like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );

