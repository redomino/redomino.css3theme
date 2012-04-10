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
        $('#portal-column-one, #portal-column-two').wrapAll('<div id="portal-columns-columns"/>')
        var $portal_columns = $('#portal-columns');
        var $columns = $portal_columns.children();
        var $mobile_tabs = $('<ul />', {id : 'mobile_tabs'}).insertBefore($portal_columns);
        $mobile_tabs.addClass('row');

        
        $columns.each(function (){
            var id = this.id;
            $('<li class="tab-' + id + '"><a href="#"></a></li>').appendTo($mobile_tabs);
        });

        $mobile_tabs.tabs('#portal-columns > div');


        var restore_tabs = function (){
            var n = $mobile_tabs.find('a').filter('.current').parent().index();
            $columns.hide();
            $columns.eq(n).show();
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
        var $portal_globalnav = $('#portal-globalnav')
        var $globalnavlinks = $portal_globalnav.children('li');
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
    });

}(jQuery));
